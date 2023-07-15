import { DrupalEntity } from "./DrupalEntity";
import { DrupalUtils } from "../Utils";
export class DrupalFile extends DrupalEntity {
    constructor(resource) {
        super(resource);
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
        this.fill(resource);
        // Add absolute url to file.
        const drupalConfig = DrupalUtils.getConfig();
        let fileUrl = '';
        if ("data" in resource) {
            const res = resource.data;
            fileUrl = res.attributes.uri.url;
        }
        else {
            fileUrl = resource.attributes.uri.url;
        }
        this.uri.absolutePath = drupalConfig.protocol + drupalConfig.host + fileUrl;
    }
    getAbsolutePath() {
        return this.uri.absolutePath;
    }
}
