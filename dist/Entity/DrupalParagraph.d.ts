import { JsonApiResponse } from "./JsonApi";
import { DrupalEntity, DrupalEntityInterface } from "./DrupalEntity";
export interface DrupalParagraphInterface extends DrupalEntityInterface {
    pid: string | null;
}
export declare class DrupalParagraph extends DrupalEntity implements DrupalParagraphInterface {
    pid: string | null;
    key_conversions: {
        drupal_internal__id: string;
    };
    constructor(resource: JsonApiResponse);
}
