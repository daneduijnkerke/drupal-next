import {DrupalClient} from "../client";
import {JsonApiResource, JsonApiResponse} from "./JsonApi";

export interface DrupalEntityInterface {
    id: string | null;
    type: string | null;
    entity: string | null;
    bundle: string | null;
    langcode: string | null;
    default_langcode: boolean | null;
    status: boolean | null;
    created: string | null;
    changed: string | null;
    fields: Record<string, any>;

    key_conversions: {};

    fill(resource): void;
}

export class DrupalEntity implements DrupalEntityInterface {
    id: string | null = null;
    type: string | null = null;
    entity: string | null = null;
    bundle: string | null = null;
    langcode: string | null = null;
    default_langcode: boolean | null = null;
    status: boolean | null = null;
    changed: string | null = null;
    created: string | null = null;
    fields:Record<string, any> = {};

    key_conversions: {} = {};

    constructor(resource: JsonApiResponse | JsonApiResource) {
        this.fill(resource);
    }

    public has(field: string) {
        return this.fields.hasOwnProperty(field);
    }

    public async get(field: string) {
        if (!this.has(field)) {
            throw Error(field + ' does not exist on entity ' + this.type + '.');
        }

        // Field is a reference field, return the reference(s).
        if (this.fields[field].hasOwnProperty('data') && this.fields[field].data) {
            const data = this.fields[field].data;

            // Check for multiple references.
            if (Array.isArray(data)) {
                let references: DrupalEntity[] = [];
                for (const reference of data) {
                    let ref: DrupalEntity = await this.handleReference(reference);
                    references.push(ref);
                }

                return references;
            } else {
                return await this.handleReference(data);
            }
        }

        return this.fields[field];
    }

    public async handleReference(reference): Promise<DrupalEntity> {
        const client = new DrupalClient();

        const resource = reference.type.split('--')[0];
        const bundle = reference.type.split('--')[1];
        const id = reference.id;

        let entity;
        // #TODO: Dynamically get correct entity somehow?
        switch(resource) {
            case 'media': {
                entity = await client.getMedia(bundle, id);
                break;
            }
            case 'paragraph': {
                entity = await client.getParagraph(bundle, id);
                break;
            }
            case 'view': {
                entity = await client.getView(id);
                break;
            }
            default: {
                entity = await client.getResource(resource + '/' + bundle, id);
                break;
            }
        }

        return entity;
    }

    public fill(res: JsonApiResponse | JsonApiResource) {
        // Convert Respones to a Resource.
        let resource = res;
        if ("data" in res && !Array.isArray(res.data)) {
            resource = <JsonApiResource>res.data
        }

        Object.keys(resource).forEach(key => {
            if (this.hasOwnProperty(key)) {
                if (key === 'type') {
                    this.entity = resource[key].split('--')[0] ?? null;
                    this.bundle = resource[key].split('--')[1] ?? null;
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
