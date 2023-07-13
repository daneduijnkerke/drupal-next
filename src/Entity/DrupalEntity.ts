import {DrupalClient} from "../client";

export interface DrupalEntityInterface {
    id: string | null;
    type: string | null;
    bundle: string | null;
    langcode: string | null;
    default_langcode: boolean | null;
    status: boolean | null;
    created: string | null;
    changed: string | null;
    fields: Record<string, any>;
}

export class DrupalEntity implements DrupalEntityInterface {
    id: string | null = null;
    type: string | null = null;
    bundle: string | null = null;
    langcode: string | null = null;
    default_langcode: boolean | null = null;
    status: boolean | null = null;
    changed: string | null = null;
    created: string | null = null;
    fields:Record<string, any> = {};

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
        switch(resource) {
            case 'media': {
                entity = await client.getMedia(bundle, id);
                break;
            }
            case 'paragraph': {
                entity = await client.getParagraph(bundle, id);
                break;
            }
            default: {
                entity = await client.getResource(resource + '/' + bundle, id);
                break;
            }
        }

        return entity;
    }
}
