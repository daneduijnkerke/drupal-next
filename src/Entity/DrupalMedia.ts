import {JsonApiResource, JsonApiResponse} from "./JsonApi";
import {DrupalEntity, DrupalEntityInterface} from "./DrupalEntity";
import {DrupalFile} from "./DrupalFile";

export interface DrupalMediaInterface extends DrupalEntityInterface {
    mid: string | null;
    name: string | null;
    path: Record<string, string> | null;
    files: DrupalFile[];

    getFile(): void;
    getFiles(): void;
}

export class DrupalMedia extends DrupalEntity implements DrupalMediaInterface {
    mid: string | null = null;
    name: string | null = null;
    path: Record<string, string> | null = null;
    files: DrupalFile[] = [];

    key_conversions = {
        'drupal_internal__mid': 'mid',
    };

    constructor(resource: JsonApiResponse) {
        super();
        // Fill all resource properties.
        Object.keys(resource).forEach(key => {
            if (this.hasOwnProperty(key)) {
                if (key === 'type') {
                    this.bundle = resource[key].split('--')[1];
                }
                this[key] = resource[key];
            }
        });
        // Fill all attributes.
        Object.keys(resource.data['attributes']).forEach(key => {
            let internalKey = key;
            if (key === 'body') {
                this.fields[key] = resource.data['attributes'][key];
            }
            if (key in this.key_conversions) {
                internalKey = this.key_conversions[key];
            }
            if (this.hasOwnProperty(internalKey)) {
                this[internalKey] = resource.data['attributes'][key];
            }
            if (key.startsWith('field_')) {
                this.fields[key] = resource.data['attributes'][key];
            }
        });
        // Fill all includes.
        resource.included.forEach(include => {
            const resource = include as JsonApiResource;
            this.files.push(new DrupalFile(resource));
        });
    }

    getFile(): DrupalFile | null {
        return this.files[0] ?? null;
    }

    getFiles(): DrupalFile[] {
        return this.files;
    }
}
