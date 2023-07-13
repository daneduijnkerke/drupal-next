import { JsonApiResource, JsonApiResponse } from "./JsonApi";
import { DrupalEntity, DrupalEntityInterface } from "./DrupalEntity";
export interface DrupalFileInterface extends DrupalEntityInterface {
    fid: string | null;
    filename: string | null;
    filemime: string | null;
    filesize: number | null;
    uri: {
        value: string | null;
        url: string | null;
        absolutePath: string | null;
    };
    getAbsolutePath(): string | null;
}
export declare class DrupalFile extends DrupalEntity implements DrupalFileInterface {
    fid: string | null;
    filename: string | null;
    filemime: string | null;
    filesize: number | null;
    uri: {
        absolutePath: string | null;
        value: string | null;
        url: string | null;
    };
    key_conversions: {
        drupal_internal__fid: string;
    };
    constructor(resource: JsonApiResponse | JsonApiResource);
    getAbsolutePath(): string | null;
}
