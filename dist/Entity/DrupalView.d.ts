import { JsonApiResource, JsonApiResponse } from "./JsonApi";
import { DrupalEntity, DrupalEntityInterface } from "./DrupalEntity";
import { DrupalViewFilter } from "../Filter/DrupalViewFilter";
import { DrupalViewStringFilter } from "../Filter/DrupalViewStringFilter";
import { DrupalViewListFilter } from "../Filter/DrupalViewListFilter";
import { DrupalViewBooleanFilter } from "../Filter/DrupalViewBooleanFilter";
import { DrupalViewNumericFilter } from "../Filter/DrupalViewNumericFilter";
export interface DrupalViewInterface extends DrupalEntityInterface {
    vid: string | null;
    label: string | null;
    sub_entity: string | null;
    filters: Record<string, DrupalViewFilter>;
    sorts: any;
    pager: any;
    view_mode: string | null;
}
export declare class DrupalViewSorting {
    id: string;
    field: string;
    entity_type: string;
    exposed: boolean;
    expose: {};
    order: boolean;
    constructor(sort: any);
}
export declare class DrupalViewPager {
    type: string;
    options: {
        offset: number;
        items_per_page?: number;
        total_pages?: number;
        id?: number;
        quantity?: number;
        expose?: {
            items_per_page: boolean;
            items_per_page_label: string;
            items_per_page_options: string;
            items_per_page_options_all: boolean;
            items_per_page_options_all_label: string;
            offset: boolean;
            offset_label: string;
        };
    };
    constructor(pager: any);
}
export declare class DrupalView extends DrupalEntity implements DrupalViewInterface {
    vid: string | null;
    label: string | null;
    sub_entity: string | null;
    filters: Record<string, DrupalViewFilter>;
    sorts: any;
    pager: any;
    view_mode: string | null;
    filter_class_map: {
        default: typeof DrupalViewFilter;
        string: typeof DrupalViewStringFilter;
        numeric: typeof DrupalViewNumericFilter;
        boolean: typeof DrupalViewBooleanFilter;
        list_field: typeof DrupalViewListFilter;
        bundle: typeof DrupalViewListFilter;
    };
    key_conversions: {
        drupal_internal__id: string;
    };
    constructor(resource: JsonApiResponse | JsonApiResource);
    private getFilters;
    private getSortings;
    private getPager;
    private fillViewData;
    buildQuery(): void;
}
