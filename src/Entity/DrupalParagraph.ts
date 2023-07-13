import {JsonApiResource, JsonApiResponse} from "./JsonApi";
import {DrupalEntity, DrupalEntityInterface} from "./DrupalEntity";

export interface DrupalParagraphInterface extends DrupalEntityInterface {
    pid: string | null;
}

export class DrupalParagraph extends DrupalEntity implements DrupalParagraphInterface {
    pid: string | null = null;

    override key_conversions = {
        'drupal_internal__id': 'pid',
    };

    constructor(resource: JsonApiResponse | JsonApiResource) {
        super(resource);
        this.fill(resource);
    }
}
