import { JsonApiResponse } from "./Entity/JsonApi";
import { DrupalNode } from "./Entity/DrupalNode";
import { DrupalMedia } from "./Entity/DrupalMedia";
import { DrupalParagraph } from "./Entity/DrupalParagraph";
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
    resolveNode(path: string): Promise<DrupalNode>;
    static readJsonFile(path: any): any;
    static getConfigFile(dir?: string): any;
    static getConfig(): any;
    static getTemplatesDir(): string;
}
