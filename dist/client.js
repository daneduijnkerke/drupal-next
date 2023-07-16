var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DrupalNode } from "./Entity/DrupalNode";
import { DrupalMedia } from "./Entity/DrupalMedia";
import { DrupalParagraph } from "./Entity/DrupalParagraph";
import { notFound } from "next/navigation";
import { DrupalMenuItem } from "./Entity/DrupalMenuItem";
import { DrupalEntityCollection } from "./Entity/DrupalEntityCollection";
import { DrupalUtils } from "./Utils";
import { DrupalView } from "./Entity/DrupalView";
export class DrupalClient {
    constructor() {
        const drupalConfig = DrupalUtils.getConfig();
        this.protocol = drupalConfig.protocol;
        this.host = drupalConfig.host;
        this.api = drupalConfig.api;
        this.router = drupalConfig.router;
        this.basePath = this.protocol + this.host + this.api;
        this.templatesDir = drupalConfig.templatesDir;
        this.templatesAlias = drupalConfig.templatesAlias;
    }
    /*
     * Get a Drupal resource with JSON:API.
     */
    getResource(resource, id = '', options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id.length > 0) {
                id = '/' + id;
            }
            const response = yield fetch(this.basePath + resource + id + DrupalUtils.buildQueryOptions(options));
            if (response.status === 404)
                throw new Error('Resource ' + resource + 'not found.');
            if (response.status === 403)
                throw new Error('Access denied for ' + resource + '.');
            if (!response.ok)
                throw new Error('Failed to fetch data.');
            return yield response.json();
        });
    }
    getNode(type, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getResource('node/' + type, id);
            return new DrupalNode(response);
        });
    }
    getNodes(bundle, sort = 'created', direction = 'ASC') {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                'sort': sort,
                'sort[sort-changed][path]': sort,
                'sort[sort-changed][direction]': direction
            };
            const response = yield this.getResource('node/' + bundle, '', options);
            return new DrupalEntityCollection('node', response, DrupalNode);
        });
    }
    getView(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getResource('view/view', id);
            return new DrupalView(response);
        });
    }
    getParagraph(type, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getResource('paragraph/' + type, id);
            return new DrupalParagraph(response);
        });
    }
    getMedia(type, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                'include': 'field_media_image',
            };
            const response = yield this.getResource('media/' + type, id, options);
            return new DrupalMedia(response);
        });
    }
    getMenu(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                'filter[menu_name][value]': id,
                'sort': 'weight'
            };
            const response = yield this.getResource('menu_link_content/menu_link_content', '', options);
            return new DrupalEntityCollection('menu_items', response, DrupalMenuItem);
        });
    }
    getMenuItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getResource('menu_link_content/menu_link_content', id);
            return new DrupalMenuItem(response);
        });
    }
    resolveNode(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.protocol + this.host + this.router + path);
            if (response.status === 404)
                notFound();
            if (!response.ok)
                throw new Error('Failed to fetch data.');
            const jsonResponse = yield response.json();
            const node = this.getNode(jsonResponse.entity.bundle, jsonResponse.entity.uuid);
            return node;
        });
    }
}
