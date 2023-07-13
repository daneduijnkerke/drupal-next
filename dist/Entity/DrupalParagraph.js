import { DrupalEntity } from "./DrupalEntity";
export class DrupalParagraph extends DrupalEntity {
    constructor(resource) {
        super();
        this.pid = null;
        this.key_conversions = {
            'drupal_internal__id': 'pid',
        };
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
    }
}
