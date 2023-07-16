var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DrupalEntity } from "./DrupalEntity";
import { DrupalViewFilter } from "../Filter/DrupalViewFilter";
import { DrupalViewStringFilter } from "../Filter/DrupalViewStringFilter";
import { DrupalViewListFilter } from "../Filter/DrupalViewListFilter";
import { DrupalViewBooleanFilter } from "../Filter/DrupalViewBooleanFilter";
import { DrupalViewNumericFilter } from "../Filter/DrupalViewNumericFilter";
import { DrupalViewBundleFilter } from "../Filter/DrupalViewBundleFilter";
import { DrupalEntityCollection } from "./DrupalEntityCollection";
import { DrupalNode } from "./DrupalNode";
import { DrupalClient } from "../client";
export class DrupalViewSorting {
    constructor(sort) {
        this.id = sort.id;
        this.field = sort.field;
        this.entity_type = sort.entity_type;
        this.order = sort.order;
        this.exposed = sort.exposed;
        this.expose = sort.expose;
    }
    buildQuery() {
        let sortOption = {};
        sortOption[`sort[${this.id}][path]`] = this.field;
        sortOption[`sort[${this.id}][direction]`] = this.order;
        return sortOption;
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
        this.sorts = {};
        this.pager = null;
        this.view_mode = null;
        this.filter_class_map = {
            'default': DrupalViewFilter,
            'string': DrupalViewStringFilter,
            'numeric': DrupalViewNumericFilter,
            'boolean': DrupalViewBooleanFilter,
            'list_field': DrupalViewListFilter,
            'bundle': DrupalViewBundleFilter,
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
        let sortingArray = {};
        Object.values(sortings).forEach(sorting => {
            sortingArray[sorting.id] = new DrupalViewSorting(sorting);
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
    getFilterOptions() {
        const filters = this.filters;
        let filterOptions = {};
        Object.values(filters).forEach((filter) => {
            Object.assign(filterOptions, filter.buildQuery());
        });
        return filterOptions;
    }
    getSortOptions() {
        const sorts = this.sorts;
        let sortOptions = {};
        Object.values(sorts).forEach((sort) => {
            Object.assign(sortOptions, sort.buildQuery());
        });
        return sortOptions;
    }
    getResource() {
        var _a;
        if (this.filters.hasOwnProperty('type')) {
            const bundle = (_a = Object.values(this.filters['type']['value'])[0]) !== null && _a !== void 0 ? _a : this.sub_entity;
            return `${this.sub_entity}/${bundle}`;
        }
        return `${this.sub_entity}/${this.sub_entity}`;
    }
    getResults(page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            page = page + 1;
            const client = new DrupalClient();
            const response = yield client.getResource(this.getResource(), '', Object.assign(Object.assign({}, this.getFilterOptions()), this.getSortOptions()));
            return new DrupalEntityCollection('node', response, DrupalNode);
        });
    }
}
