import { JsonApiResource, JsonApiResponse } from "./JsonApi";
import { DrupalEntity, DrupalEntityInterface } from "./DrupalEntity";
import { DrupalLink } from "./DrupalLink";
export interface DrupalMenuItemInterface extends DrupalEntityInterface {
    mid: string | null;
    enabled: boolean | null;
    title: string | null;
    description: string | null;
    menu_name: string | null;
    external: boolean | null;
    rediscover: boolean | null;
    weight: number | null;
    expanded: boolean | null;
    parent: string | null;
    link: DrupalLink;
}
export declare class DrupalMenuItem extends DrupalEntity implements DrupalMenuItemInterface {
    mid: string | null;
    enabled: boolean | null;
    title: string | null;
    description: string | null;
    menu_name: string | null;
    external: boolean | null;
    rediscover: boolean | null;
    weight: number | null;
    expanded: boolean | null;
    parent: string | null;
    link: DrupalLink;
    key_conversions: {
        drupal_internal__id: string;
    };
    constructor(resource: JsonApiResponse | JsonApiResource);
}
