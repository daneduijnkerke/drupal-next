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
import fs from "fs";
import { DrupalMenuItem } from "./Entity/DrupalMenuItem";
import { DrupalEntityCollection } from "./Entity/DrupalEntityCollection";
export class DrupalClient {
    constructor() {
        // const conf = DrupalClient.getConfig();
        const drupalConfig = DrupalClient.getConfig();
        // const drupalConfig = DrupalClient.readJsonFile(conf)
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
            let params = '';
            if (id.length > 0) {
                id = '/' + id;
            }
            if (Object.values(options).length > 0) {
                params = '?';
                Object.keys(options).forEach((key) => {
                    params = params + key + '=' + options[key] + '&';
                });
                params = params.slice(0, -1);
            }
            const response = yield fetch(this.basePath + resource + id + params);
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
                // 'fields[file--file]': 'uri,url,filename,filemime,filesize,status,id,drupal_internal__fid'
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
            const response = yield this.getResource('menu_items', '', options);
            return new DrupalEntityCollection('menu_items', response, DrupalMenuItem);
        });
    }
    getMenuItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getResource('menu_items', id);
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
    static readJsonFile(path) {
        const file = require('fs').readFileSync(path, "utf8");
        return JSON.parse(file);
    }
    static getConfigFile(dir = __dirname) {
        const FILE_NAME = 'drupal_next.config.json';
        const fsp = require('fs'), path = require('path');
        let ls = fsp.readdirSync(dir);
        if (ls.includes(FILE_NAME))
            return path.join(dir, FILE_NAME);
        else if (dir == '/')
            throw new Error(`Could not find ${FILE_NAME}`);
        else
            return this.getConfigFile(path.resolve(dir, '..'));
    }
    static getConfig() {
        const file = this.getConfigFile();
        return this.readJsonFile(file);
    }
    static getTemplatesDir() {
        const configFile = this.getConfigFile();
        const projectRoot = configFile.replace('/drupal_next.config.json', '');
        const src = fs.existsSync(projectRoot + '/DrupalTemplates') ? '' : '/src';
        return projectRoot + src + '/DrupalTemplates';
    }
}
