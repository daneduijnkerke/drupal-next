var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DrupalClient } from "../client";
export class DrupalEntity {
    constructor(resource) {
        this.id = null;
        this.type = null;
        this.entity = null;
        this.bundle = null;
        this.langcode = null;
        this.default_langcode = null;
        this.status = null;
        this.changed = null;
        this.created = null;
        this.fields = {};
        this.key_conversions = {};
        this.fill(resource);
    }
    has(field) {
        return this.fields.hasOwnProperty(field);
    }
    get(field) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.has(field)) {
                throw Error(field + ' does not exist on entity ' + this.type + '.');
            }
            // Field is a reference field, return the reference(s).
            if (this.fields[field].hasOwnProperty('data') && this.fields[field].data) {
                const data = this.fields[field].data;
                // Check for multiple references.
                if (Array.isArray(data)) {
                    let references = [];
                    for (const reference of data) {
                        let ref = yield this.handleReference(reference);
                        references.push(ref);
                    }
                    return references;
                }
                else {
                    return yield this.handleReference(data);
                }
            }
            return this.fields[field];
        });
    }
    handleReference(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new DrupalClient();
            const resource = reference.type.split('--')[0];
            const bundle = reference.type.split('--')[1];
            const id = reference.id;
            let entity;
            switch (resource) {
                case 'media': {
                    entity = yield client.getMedia(bundle, id);
                    break;
                }
                case 'paragraph': {
                    entity = yield client.getParagraph(bundle, id);
                    break;
                }
                default: {
                    entity = yield client.getResource(resource + '/' + bundle, id);
                    break;
                }
            }
            return entity;
        });
    }
    fill(res) {
        let resource = res;
        if ("data" in res && !Array.isArray(res.data)) {
            resource = res.data;
        }
        Object.keys(resource).forEach(key => {
            var _a, _b;
            if (this.hasOwnProperty(key)) {
                if (key === 'type') {
                    this.entity = (_a = resource[key].split('--')[0]) !== null && _a !== void 0 ? _a : null;
                    this.bundle = (_b = resource[key].split('--')[1]) !== null && _b !== void 0 ? _b : null;
                }
                this[key] = resource[key];
            }
        });
        if (resource.hasOwnProperty('attributes')) {
            Object.keys(resource['attributes']).forEach(key => {
                let internalKey = key;
                if (key === 'body') {
                    this.fields[key] = resource['attributes'][key];
                }
                if (key in this.key_conversions) {
                    internalKey = this.key_conversions[key];
                }
                if (this.hasOwnProperty(internalKey)) {
                    this[internalKey] = resource['attributes'][key];
                }
                if (key.startsWith('field_')) {
                    this.fields[key] = resource['attributes'][key];
                }
            });
        }
        if (resource.hasOwnProperty('relationships')) {
            Object.keys(resource['relationships']).forEach(key => {
                if (key.startsWith('field_')) {
                    this.fields[key] = resource['relationships'][key];
                }
            });
        }
    }
}
