import {JsonApiResource} from "./JsonApi";
export interface DrupalLinkInterface {
    uri: string | null,
    full_url: string | null,
    title: string | null,
    options: [] | null,
}

export class DrupalLink implements DrupalLinkInterface {
    uri: string | null = null;
    full_url: string | null = null;
    title: string | null = null;
    options: [] | null = null;

    constructor(resource?: JsonApiResource) {
        if (resource) {
            // Fill all resource properties.
            Object.keys(resource).forEach(key => {
                if (this.hasOwnProperty(key)) {
                    this[key] = resource[key];
                }
            });
        }
    }
}
