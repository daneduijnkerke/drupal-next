import { DrupalEntity } from "./DrupalEntity";
import { DrupalFile } from "./DrupalFile";
export class DrupalMedia extends DrupalEntity {
    constructor(resource) {
        super();
        this.mid = null;
        this.name = null;
        this.path = null;
        this.files = [];
        this.key_conversions = {
            'drupal_internal__mid': 'mid',
        };
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
            const resource = include;
            this.files.push(new DrupalFile(resource));
        });
    }
    getFile() {
        var _a;
        return (_a = this.files[0]) !== null && _a !== void 0 ? _a : null;
    }
    getFiles() {
        return this.files;
    }
}
