import {JsonApiResponse} from "./JsonApi";
import {DrupalEntity, DrupalEntityInterface} from "./DrupalEntity";

export interface DrupalNodeInterface extends DrupalEntityInterface {
    nid: string | null;
    title: string | null;
    path: Record<string, string> | null;
    promote: boolean | null;
    sticky: boolean | null;
}

export class DrupalNode extends DrupalEntity implements DrupalNodeInterface {
    nid: string | null = null;
    title: string | null = null;
    path: Record<string, string> | null = null;
    promote: boolean | null = null;
    sticky: boolean | null = null;

    key_conversions = {
        'drupal_internal__nid': 'nid',
    };

    constructor(resource: JsonApiResponse) {
        super();
        // Fill all resource properties.
        Object.keys(resource.data).forEach(key => {
            if (this.hasOwnProperty(key)) {
                if (key === 'type') {
                    this.bundle = resource.data[key].split('--')[1];
                }
                this[key] = resource.data[key];
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
        // Fill all relationships.
        Object.keys(resource.data['relationships']).forEach(key => {
            if (key.startsWith('field_')) {
                this.fields[key] = resource.data['relationships'][key];
            }
        });
    }
}
