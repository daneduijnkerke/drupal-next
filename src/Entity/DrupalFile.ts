import {JsonApiResource} from "./JsonApi";
import {DrupalEntity, DrupalEntityInterface} from "./DrupalEntity";
import {DrupalClient} from "../client";

export interface DrupalFileInterface extends DrupalEntityInterface {
    fid: string | null;
    filename: string | null;
    filemime: string | null;
    filesize: number | null;
    uri: {
        value: string | null;
        url: string | null;
        absolutePath: string | null;
    }

    getAbsolutePath(): string | null;
}

export class DrupalFile extends DrupalEntity implements DrupalFileInterface {
    fid: string | null = null;
    filename: string | null = null;
    filemime: string | null = null;
    filesize: number | null = null;
    uri: { absolutePath: string | null; value: string | null; url: string | null } = {
        value: null,
        url: null,
        absolutePath: null,
    }

    key_conversions = {
        'drupal_internal__fid': 'fid',
    };

    constructor(resource: JsonApiResource) {
        super();
        this.uri = {
            value: null,
            url: null,
            absolutePath: null,
        }
        // Fill all resource properties.
        Object.keys(resource).forEach(key => {
            if (this.hasOwnProperty(key)) {
                if (key === 'type') {
                    this.bundle = resource[key].split('--')[1] ?? null;
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

    getAbsolutePath(): string | null {
        return this.uri.absolutePath;
    }
}
