import { JsonApiResource, JsonApiResponse } from "./JsonApi";
import { DrupalEntity, DrupalEntityInterface } from "./DrupalEntity";
import { DrupalFile } from "./DrupalFile";
export interface DrupalMediaInterface extends DrupalEntityInterface {
    mid: string | null;
    name: string | null;
    path: Record<string, string> | null;
    files: DrupalFile[];
    getFile(): void;
    getFiles(): void;
}
export declare class DrupalMedia extends DrupalEntity implements DrupalMediaInterface {
    mid: string | null;
    name: string | null;
    path: Record<string, string> | null;
    files: DrupalFile[];
    key_conversions: {
        drupal_internal__mid: string;
    };
    constructor(resource: JsonApiResponse | JsonApiResource);
    getFile(): DrupalFile | null;
    getFiles(): DrupalFile[];
}
