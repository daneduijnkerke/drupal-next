import { JsonApiResource, JsonApiResponse } from "./JsonApi";
import { DrupalEntity, DrupalEntityInterface } from "./DrupalEntity";
export interface DrupalMenuInterface extends DrupalEntityInterface {
    mid: string | null;
    enabled: boolean | null;
    title: string | null;
    description: string | null;
    menu_name: string | null;
    links: {
        DrupalMenuItemInterface: any;
    } | {};
}
export declare class DrupalMenu extends DrupalEntity implements DrupalMenuInterface {
    mid: string | null;
    enabled: boolean | null;
    title: string | null;
    description: string | null;
    menu_name: string | null;
    links: {
        DrupalMenuItemInterface: any;
    } | {};
    key_conversions: {
        drupal_internal__mid: string;
    };
    constructor(resource: JsonApiResponse | JsonApiResource);
}
