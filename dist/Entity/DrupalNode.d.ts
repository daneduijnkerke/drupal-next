import { JsonApiResponse } from "./JsonApi";
import { DrupalEntity, DrupalEntityInterface } from "./DrupalEntity";
export interface DrupalNodeInterface extends DrupalEntityInterface {
    nid: string | null;
    title: string | null;
    path: Record<string, string> | null;
    promote: boolean | null;
    sticky: boolean | null;
}
export declare class DrupalNode extends DrupalEntity implements DrupalNodeInterface {
    nid: string | null;
    title: string | null;
    path: Record<string, string> | null;
    promote: boolean | null;
    sticky: boolean | null;
    key_conversions: {
        drupal_internal__nid: string;
    };
    constructor(resource: JsonApiResponse);
}
