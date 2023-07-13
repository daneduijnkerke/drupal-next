import { JsonApiResource } from "./JsonApi";
export interface DrupalLinkInterface {
    uri: string | null;
    full_url: string | null;
    title: string | null;
    options: [] | null;
}
export declare class DrupalLink implements DrupalLinkInterface {
    uri: string | null;
    full_url: string | null;
    title: string | null;
    options: [] | null;
    constructor(resource?: JsonApiResource);
}
