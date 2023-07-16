import { DrupalEntity } from "./DrupalEntity";
import { DrupalUtils } from "../Utils";
import { DrupalViewFilter } from "../Filter/DrupalViewFilter";
import { DrupalViewStringFilter } from "../Filter/DrupalViewStringFilter";
import { DrupalViewListFilter } from "../Filter/DrupalViewListFilter";
import { DrupalViewBooleanFilter } from "../Filter/DrupalViewBooleanFilter";
import { DrupalViewNumericFilter } from "../Filter/DrupalViewNumericFilter";
export class DrupalViewSorting {
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
    constructor(pager) {
        this.type = pager.type;
        this.options = {
            offset: pager.options.offset,
        };
        Object.keys(pager.options).forEach(key => {
            if (pager.options[key] !== null && key !== 'tags') {
                this.options[key] = pager.options[key];
            }
        });
    }
}
export class DrupalView extends DrupalEntity {
    constructor(resource) {
        super(resource);
        this.vid = null;
        this.label = null;
        this.sub_entity = null;
        this.filters = {};
        this.sorts = null;
        this.pager = null;
        this.view_mode = null;
        this.filter_class_map = {
            'default': DrupalViewFilter,
            'string': DrupalViewStringFilter,
            'numeric': DrupalViewNumericFilter,
            'boolean': DrupalViewBooleanFilter,
            'list_field': DrupalViewListFilter,
            'bundle': DrupalViewListFilter,
        };
        this.key_conversions = {
            'drupal_internal__id': 'vid',
        };
        this.fill(resource);
        this.fillViewData(resource);
    }
    getFilters(filters) {
        let filterArray = {};
        Object.values(filters).forEach((filter) => {
            const FilterClass = this.filter_class_map[filter['plugin_id']];
            if (!FilterClass)
                throw Error(`Unknown filter class ${filter['plugin_id']}.`);
            filterArray[filter.id] = new FilterClass(filter);
        });
        return filterArray;
    }
    getSortings(sortings) {
        let sortingArray = [];
        Object.keys(sortings).forEach(key => {
            sortingArray.push(new DrupalViewSorting(sortings[key]));
        });
        return sortingArray;
    }
    getPager(pager) {
        return new DrupalViewPager(pager);
    }
    fillViewData(res) {
        // Convert Respones to a Resource.
        let resource = res;
        if ("data" in res && !Array.isArray(res.data)) {
            resource = res.data;
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
    buildQuery() {
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
