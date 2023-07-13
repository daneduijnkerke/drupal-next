import { DrupalEntity } from "./DrupalEntity";
import { DrupalClient } from "../client";
export class DrupalFile extends DrupalEntity {
    constructor(resource) {
        super();
        this.fid = null;
        this.filename = null;
        this.filemime = null;
        this.filesize = null;
        this.uri = {
            value: null,
            url: null,
            absolutePath: null,
        };
        this.key_conversions = {
            'drupal_internal__fid': 'fid',
        };
        this.uri = {
            value: null,
            url: null,
            absolutePath: null,
        };
        // Fill all resource properties.
        Object.keys(resource).forEach(key => {
            var _a;
            if (this.hasOwnProperty(key)) {
                if (key === 'type') {
                    this.bundle = (_a = resource[key].split('--')[1]) !== null && _a !== void 0 ? _a : null;
                }
                this[key] = resource[key];
            }
        });
        // Fill all attributes.
        Object.keys(resource.attributes).forEach(key => {
            let internalKey = key;
            if (key in this.key_conversions) {
                internalKey = this.key_conversions[key];
            }
            if (this.hasOwnProperty(internalKey)) {
                this[internalKey] = resource.attributes[key];
            }
        });
        // Add absolute url to file.
        const drupalConfig = DrupalClient.getConfig();
        this.uri.absolutePath = drupalConfig.protocol + drupalConfig.host + resource.attributes.uri.url;
    }
    getAbsolutePath() {
        return this.uri.absolutePath;
    }
}
