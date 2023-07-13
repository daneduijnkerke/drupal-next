import { DrupalEntity } from "./DrupalEntity";
export class DrupalNode extends DrupalEntity {
    constructor(resource) {
        super(resource);
        this.nid = null;
        this.title = null;
        this.path = null;
        this.promote = null;
        this.sticky = null;
        this.key_conversions = {
            'drupal_internal__nid': 'nid',
        };
        this.fill(resource);
    }
}
