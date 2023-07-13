import { JsonApiResource, JsonApiResponse } from "./JsonApi";
export interface DrupalEntityCollectionInterface {
    type: string | null;
    data: JsonApiResource[];
    key_conversions: {};
    fill(resource: any, type: any): void;
}
export declare class DrupalEntityCollection<T> implements DrupalEntityCollectionInterface {
    type: string | null;
    data: never[];
    key_conversions: {};
    constructor(type: string, resource: JsonApiResponse, entityClass: (new (res: any) => T));
    fill(resources: JsonApiResponse, entityClass: (new (res: any) => T)): void;
}
