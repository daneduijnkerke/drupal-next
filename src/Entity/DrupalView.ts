import {JsonApiResource, JsonApiResponse} from "./JsonApi";
import {DrupalEntity, DrupalEntityInterface} from "./DrupalEntity";
import {DrupalViewFilter} from "../Filter/DrupalViewFilter";
import {DrupalViewStringFilter} from "../Filter/DrupalViewStringFilter";
import {DrupalViewListFilter} from "../Filter/DrupalViewListFilter";
import {DrupalViewBooleanFilter} from "../Filter/DrupalViewBooleanFilter";
import {DrupalViewNumericFilter} from "../Filter/DrupalViewNumericFilter";
import {DrupalViewBundleFilter} from "../Filter/DrupalViewBundleFilter";
import {DrupalEntityCollection} from "./DrupalEntityCollection";
import {DrupalNode} from "./DrupalNode";
import {DrupalClient} from "../client";

export interface DrupalViewInterface extends DrupalEntityInterface {
    vid: string | null;
    label: string | null;
    sub_entity: string | null;
    filters: Record<string, DrupalViewFilter>;
    sorts: any;
    pager: any;
    view_mode: string | null;
}
export class DrupalViewSorting {
    id: string;
    field: string;
    entity_type: string;
    exposed: boolean;
    expose: {};
    order: boolean;
    constructor(sort) {
        this.id = sort.id;
        this.field = sort.field;
        this.entity_type = sort.entity_type;
        this.order = sort.order;
        this.exposed = sort.exposed;
        this.expose = sort.expose;
    }

    public buildQuery() {
        let sortOption = {};

        sortOption[`sort[${this.id}][path]`] = this.field;
        sortOption[`sort[${this.id}][direction]`] = this.order;

        return sortOption;
    }
}

export class DrupalViewPager {
    type: string; // none, some, mini, full
    options: {
        offset: number;
        items_per_page?: number;
        total_pages?: number;
        id?: number;
        quantity?: number; // Number of pages to display on 'full' pager.
        expose?: {
            items_per_page: boolean,
            items_per_page_label: string,
            items_per_page_options: string,
            items_per_page_options_all: boolean, // Might wanna delete this option.
            items_per_page_options_all_label: string, // Might wanna delete this option.
            offset: boolean,
            offset_label: string,
        }
    }

    constructor(pager) {
        this.type = pager.type;
        this.options = {
            offset: pager.options.offset,
        }

        Object.keys(pager.options).forEach(key => {
            if (pager.options[key] !== null && key !== 'tags') {
                this.options[key] = pager.options[key];
            }
        });
    }

}

export class DrupalView extends DrupalEntity implements DrupalViewInterface {
    vid: string | null = null;
    label: string | null = null;
    sub_entity: string | null = null;
    filters: Record<string, DrupalViewFilter> = {};
    sorts: Record<string, DrupalViewSorting> = {};
    pager: any = null;
    view_mode: string | null = null;

    filter_class_map = {
        'default': DrupalViewFilter,
        'string': DrupalViewStringFilter,
        'numeric': DrupalViewNumericFilter,
        'boolean': DrupalViewBooleanFilter,
        'list_field': DrupalViewListFilter,
        'bundle': DrupalViewBundleFilter,
    };

    override key_conversions = {
        'drupal_internal__id': 'vid',
    };

    constructor(resource: JsonApiResponse | JsonApiResource) {
        super(resource);
        this.fill(resource);
        this.fillViewData(resource);
    }

    private getFilters(filters): Record<string, DrupalViewFilter> {
        let filterArray: Record<string, DrupalViewFilter> = {};
        Object.values<DrupalViewFilter>(filters).forEach((filter) => {
            const FilterClass = this.filter_class_map[filter['plugin_id']];
            if (!FilterClass) throw Error(`Unknown filter class ${filter['plugin_id']}.`);
            filterArray[filter.id] = new FilterClass(filter);
        });

        return filterArray;
    }
    private getSortings(sortings): Record<string, DrupalViewSorting> {
        let sortingArray: Record<string, DrupalViewSorting> = {};
        Object.values<DrupalViewSorting>(sortings).forEach(sorting => {
            sortingArray[sorting.id] = new DrupalViewSorting(sorting);
        });

        return sortingArray;
    }

    private getPager(pager): DrupalViewPager {
        return new DrupalViewPager(pager);
    }
    private fillViewData(res: JsonApiResponse | JsonApiResource) {
        // Convert Respones to a Resource.
        let resource = res;
        if ("data" in res && !Array.isArray(res.data)) {
            resource = <JsonApiResource>res.data
        }

        const display_options = resource['attributes']['display']['default']['display_options'];
        Object.keys(display_options).forEach(key => {
            if (key === 'row') {
                this.view_mode = display_options[key]['options']['view_mode'];
                this.sub_entity = display_options[key]['type'].split(':')[1];
            }
            if (this.hasOwnProperty(key) && key !== 'fields') {

                if (key === 'filters') {
                    this[key] = this.getFilters(display_options[key]);
                    return;
                }
                if (key === 'sorts') {
                    this[key] = this.getSortings(display_options[key]);
                    return;
                }
                if (key === 'pager') {
                    this[key] = this.getPager(display_options[key]);
                    return;
                }
                this[key] = display_options[key];
            }
        });
    }

    public getFilterOptions() {
        const filters = this.filters;
        let filterOptions = {};

        Object.values(filters).forEach((filter) => {
            Object.assign(filterOptions, filter.buildQuery());
        });

        return filterOptions;
    }

    public getSortOptions() {
        const sorts = this.sorts;
        let sortOptions = {};

        Object.values(sorts).forEach((sort) => {
            Object.assign(sortOptions, sort.buildQuery());
        });

        return sortOptions;
    }

    private getResource() {
        if (this.filters.hasOwnProperty('type')) {
            const bundle = Object.values(this.filters['type']['value'])[0] ?? this.sub_entity;
            return `${this.sub_entity}/${bundle}`
        }
        return `${this.sub_entity}/${this.sub_entity}`;
    }

    public async getResults(page: number = 0) {
        page = page + 1;
        const client = new DrupalClient();
        const response = await client.getResource(this.getResource(), '', {...this.getFilterOptions(), ...this.getSortOptions()});
        return new DrupalEntityCollection('node', response, DrupalNode);
    }
}
