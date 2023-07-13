import {JsonApiResource, JsonApiResponse} from "./JsonApi";
import {DrupalEntity, DrupalEntityInterface} from "./DrupalEntity";

export interface DrupalNodeInterface extends DrupalEntityInterface {
    nid: string | null;
    title: string | null;
    path: Record<string, string> | null;
    promote: boolean | null;
    sticky: boolean | null;
}

export class DrupalNode extends DrupalEntity implements DrupalNodeInterface {
    nid: string | null = null;
    title: string | null = null;
    path: Record<string, string> | null = null;
    promote: boolean | null = null;
    sticky: boolean | null = null;

    override key_conversions = {
        'drupal_internal__nid': 'nid',
    };

    constructor(resource: JsonApiResponse | JsonApiResource) {
        super(resource);
        this.fill(resource);
    }
}
