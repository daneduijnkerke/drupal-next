import { DrupalEntity } from "./DrupalEntity";
import { DrupalLink } from "./DrupalLink";
export class DrupalMenuItem extends DrupalEntity {
    constructor(resource) {
        super(resource);
        this.mid = null;
        this.enabled = null;
        this.title = null;
        this.description = null;
        this.menu_name = null;
        this.external = null;
        this.rediscover = null;
        this.weight = null;
        this.expanded = null;
        this.parent = null;
        this.link = new DrupalLink();
        this.key_conversions = {
            'drupal_internal__id': 'mid',
        };
        this.fill(resource);
    }
}
