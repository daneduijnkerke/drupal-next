export interface JsonApiResponse {
    jsonapi?: {
        version: string;
        meta: Record<string, any>[];
    };
    data: JsonApiResource | JsonApiResource[];
    errors: JsonApiError[];
    meta: {
        count: number;
        [key: string]: any;
    };
    links?: JsonApiLinks;
    included: Record<string, any>[];
}
export interface JsonApiResource {
    id: string;
    type: string;
    attributes: any;
    links: any;
    relationships: Record<string, any>;
}
export interface JsonApiError {
    id?: string;
    status?: string;
    code?: string;
    title?: string;
    detail?: string;
    links?: JsonApiLinks;
}
export interface JsonApiLinks {
    [key: string]: string | Record<string, string>;
}
