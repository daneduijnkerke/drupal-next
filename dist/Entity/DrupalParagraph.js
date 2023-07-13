import { DrupalEntity } from "./DrupalEntity";
export class DrupalParagraph extends DrupalEntity {
    constructor(resource) {
        super(resource);
        this.pid = null;
        this.key_conversions = {
            'drupal_internal__id': 'pid',
        };
        this.fill(resource);
    }
}
