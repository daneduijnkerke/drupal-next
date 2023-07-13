import { DrupalEntity } from "./DrupalEntity";
export class DrupalMenu extends DrupalEntity {
    constructor(resource) {
        super(resource);
        this.mid = null;
        this.enabled = null;
        this.title = null;
        this.description = null;
        this.menu_name = null;
        this.links = {};
        this.key_conversions = {
            'drupal_internal__mid': 'mid',
        };
    }
}
