import {JsonApiResource, JsonApiResponse} from "./JsonApi";

export interface DrupalEntityCollectionInterface {
    type: string | null;
    data: JsonApiResource[];
    key_conversions: {};

    fill(resource, type): void;
}

export class DrupalEntityCollection<T> implements DrupalEntityCollectionInterface {
    type: string | null = null;
    data = [];
    key_conversions: {} = {};

    constructor(type: string, resource: JsonApiResponse, entityClass: (new(res) => T )) {
        this.type = type + '_collection';
        this.fill(resource, entityClass);
    }

    public fill(resources: JsonApiResponse, entityClass: (new(res) => T )) {
        if ("data" in resources && Array.isArray(resources.data)) {
            Object.keys(resources.data).forEach(key => {
                // this.data[key] = new entityClass(resources.data[key]);
                this.data[key] = new entityClass(resources.data[key]);
            });
        }
    }
}
