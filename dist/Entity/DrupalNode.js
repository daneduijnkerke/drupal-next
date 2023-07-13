import { DrupalEntity } from "./DrupalEntity";
export class DrupalNode extends DrupalEntity {
    constructor(resource) {
        super();
        this.nid = null;
        this.title = null;
        this.path = null;
        this.promote = null;
        this.sticky = null;
        this.key_conversions = {
            'drupal_internal__nid': 'nid',
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
        // Fill all relationships.
        Object.keys(resource.data['relationships']).forEach(key => {
            if (key.startsWith('field_')) {
                this.fields[key] = resource.data['relationships'][key];
            }
        });
    }
}
