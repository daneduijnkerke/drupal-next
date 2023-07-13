import { DrupalEntity } from "./DrupalEntity";
import { DrupalFile } from "./DrupalFile";
export class DrupalMedia extends DrupalEntity {
    constructor(resource) {
        super(resource);
        this.mid = null;
        this.name = null;
        this.path = null;
        this.files = [];
        this.key_conversions = {
            'drupal_internal__mid': 'mid',
        };
        this.fill(resource);
        // Fill all includes.
        if ("included" in resource) {
            resource.included.forEach(include => {
                const resource = include;
                this.files.push(new DrupalFile(resource));
            });
        }
    }
    getFile() {
        var _a;
        return (_a = this.files[0]) !== null && _a !== void 0 ? _a : null;
    }
    getFiles() {
        return this.files;
    }
}
