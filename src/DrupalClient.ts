import {
    DrupalEntityCollection,
    DrupalMedia,
    DrupalMenuItem,
    DrupalNode,
    DrupalParagraph,
    DrupalView,
    JsonApiResponse
} from "./Entity";
import {notFound} from "next/navigation";
import {DrupalViewDisplay} from "./Entity/DrupalViewDisplay";
import DrupalUtils from "./Utils/DrupalUtils";

class DrupalClientService {
    public protocol: string
    public host: string
    public api: string
    public router: string
    public basePath: string
    public templatesDir: string
    public templatesAlias: string
    public theme;

    constructor() {
        console.log("IK INIT NU!");
        const drupalConfig = DrupalUtils.getConfig();
        const drupalTheme = DrupalUtils.getTheme();

        this.protocol = drupalConfig.protocol
        this.host = drupalConfig.host
        this.api = drupalConfig.api
        this.router = drupalConfig.router
        this.basePath = this.protocol + this.host + this.api
        this.templatesDir = drupalConfig.templatesDir
        this.templatesAlias = drupalConfig.templatesAlias
        this.theme = drupalTheme || {}
    }

    public getTheme(){
        return this.theme;
    }

    /*
     * Get a Drupal resource with JSON:API.
     */
    async getResource(resource: string, id: string = '', options: {[option: string]: string} = {}): Promise<JsonApiResponse> {
        if (id.length > 0) {
            id = '/' + id;
        }

        const response = await fetch(this.basePath + resource + id + DrupalUtils.buildQueryOptions(options));

        if (response.status === 404) throw new Error('Resource ' + resource + id + ' not found.');
        if (response.status === 403) throw new Error('Access denied for ' + resource + '.');
        if (!response.ok) throw new Error('Failed to fetch data.');

        return await response.json();
    }

    async getNode(type: string, id: string): Promise<DrupalNode> {
        const response = await this.getResource('node/' + type, id);
        return new DrupalNode(response);
    }

    async getNodes(bundle: string, sort: string = 'created', direction: string = 'ASC'): Promise<DrupalEntityCollection<DrupalNode>> {
        const options = {
            'sort[sort-field][path]': sort,
            'sort[sort-field][direction]': direction
        };
        const response = await this.getResource('node/' + bundle, '', options);
        return new DrupalEntityCollection('node', response, DrupalNode);
    }

    async getView(id: string): Promise<DrupalView> {
        const response = await this.getResource('view/view', id);
        return new DrupalView(response);
    }
    async getViewDisplayMode(id: string, meta: {}): Promise<DrupalViewDisplay> {
        const response = await this.getResource('view/view', id);
        return new DrupalViewDisplay(response, meta);
    }

    async getViewDisplayResults(id: string, display_mode: string, page:number=0): Promise<DrupalEntityCollection<DrupalNode>> {
        const options = {
            'page': String(page),
        }
        const response = await this.getResource('views/' + id, display_mode, options);
        return new DrupalEntityCollection('node', response, DrupalNode);
    }
    async getViewDisplayResultsCount(id: string, display_mode: string): Promise<number> {
        const response = await this.getResource('views/' + id, display_mode);
        return response.meta.count;
    }

    async getParagraph(type: string, id: string): Promise<DrupalParagraph> {
        const response = await this.getResource('paragraph/' + type, id);
        return new DrupalParagraph(response);
    }

    async getMedia(type: string, id: string): Promise<DrupalMedia> {
        const options = {
            'include': 'field_media_image',
        };
        const response = await this.getResource('media/' + type, id, options);
        return new DrupalMedia(response);
    }

    async getMenu(id: string): Promise<DrupalEntityCollection<DrupalMenuItem>> {
        const options = {
            'filter[menu_name][value]': id,
            'sort': 'weight'
        };
        const response = await this.getResource('menu_link_content/menu_link_content', '', options);
        return new DrupalEntityCollection('menu_items', response, DrupalMenuItem);
    }
    async getMenuItem(id: string): Promise<DrupalMenuItem> {
        const response = await this.getResource('menu_link_content/menu_link_content', id);
        return new DrupalMenuItem(response);
    }

    async resolveNode(path: string): Promise<DrupalNode> {
        const response = await fetch(this.protocol + this.host + this.router + path);
        if (response.status === 404) notFound();
        if (!response.ok) throw new Error('Failed to fetch data.');

        const jsonResponse = await response.json();
        return this.getNode(jsonResponse.entity.bundle, jsonResponse.entity.uuid);
    }
}

const DrupalClient = new DrupalClientService();
export default DrupalClient;