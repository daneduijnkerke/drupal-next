import {JsonApiResource, JsonApiResponse} from "./JsonApi";
import {DrupalEntity, DrupalEntityInterface} from "./DrupalEntity";
import {DrupalUtils} from "../Utils";
import {DrupalViewFilter} from "../Filter/DrupalViewFilter";
import {DrupalViewStringFilter} from "../Filter/DrupalViewStringFilter";
import {DrupalViewListFilter} from "../Filter/DrupalViewListFilter";
import {DrupalViewBooleanFilter} from "../Filter/DrupalViewBooleanFilter";
import {DrupalViewNumericFilter} from "../Filter/DrupalViewNumericFilter";

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
    sorts: any = null;
    pager: any = null;
    view_mode: string | null = null;

    filter_class_map = {
        'default': DrupalViewFilter,
        'string': DrupalViewStringFilter,
        'numeric': DrupalViewNumericFilter,
        'boolean': DrupalViewBooleanFilter,
        'list_field': DrupalViewListFilter,
        'bundle': DrupalViewListFilter,
    };

    override key_conversions = {
        'drupal_internal__id': 'vid',
    };

    constructor(resource: JsonApiResponse | JsonApiResource) {
        super(resource);
        this.fill(resource);
        this.fillViewData(resource);
    }

    private getFilters(filters): Record<string, any> {
        let filterArray: Record<string, DrupalViewFilter> = {};
        Object.values<DrupalViewFilter>(filters).forEach((filter) => {
            const FilterClass = this.filter_class_map[filter['plugin_id']];
            if (!FilterClass) throw Error(`Unknown filter class ${filter['plugin_id']}.`);
            filterArray[filter.id] = new FilterClass(filter);
        });

        return filterArray;
    }
    private getSortings(sortings): DrupalViewSorting[] {
        let sortingArray: DrupalViewSorting[] = [];
        Object.keys(sortings).forEach(key => {
            sortingArray.push(new DrupalViewSorting(sortings[key]));
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

    public buildQuery() {
        // const entity = this.sub_entity;
        const filters = this.filters;
        // const sorts = this.sorts;
        let filterOptions = {};

        Object.values(filters).forEach((filter, findex) => {
            const test = filter.buildQuery();
            console.log(findex);
            console.log(test);
            // filterOptions[filter.field] = test;
            // filterOptions = {...test}
            Object.assign(filterOptions, test);
        });

        console.log(filterOptions);
        console.log(DrupalUtils.buildQueryOptions(filterOptions));
        console.log("AAAAAAAAAAAAA");

        // When there is a bundle filter, we need multiple queries to fetch all nodes of these bundles since JSON:API only has 1 link per bundle.
        if (filters.hasOwnProperty('type')) {

        }
        // let queries = [];

        // filters.forEach(filter => {
        //     if (filter.field === 'type') {
        //         filter.value.forEach(bundle => {
        //             queries.push(entity + '/' + bundle);
        //         })
        //     }
        // });
        //
        // console.log(queries);
    }
}
