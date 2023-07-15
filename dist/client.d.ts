import { JsonApiResponse } from "./Entity/JsonApi";
import { DrupalNode } from "./Entity/DrupalNode";
import { DrupalMedia } from "./Entity/DrupalMedia";
import { DrupalParagraph } from "./Entity/DrupalParagraph";
import { DrupalMenuItem } from "./Entity/DrupalMenuItem";
import { DrupalEntityCollection } from "./Entity/DrupalEntityCollection";
export declare class DrupalClient {
    protocol: string;
    host: string;
    api: string;
    router: string;
    basePath: string;
    templatesDir: string;
    templatesAlias: string;
    constructor();
    getResource(resource: string, id?: string, options?: {
        [option: string]: string;
    }): Promise<JsonApiResponse>;
    getNode(type: string, id: string): Promise<DrupalNode>;
    getParagraph(type: string, id: string): Promise<DrupalParagraph>;
    getMedia(type: string, id: string): Promise<DrupalMedia>;
    getMenu(id: string): Promise<DrupalEntityCollection<DrupalMenuItem>>;
    getMenuItem(id: string): Promise<DrupalMenuItem>;
    resolveNode(path: string): Promise<DrupalNode>;
}
