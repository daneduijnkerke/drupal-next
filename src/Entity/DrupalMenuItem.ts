import {JsonApiResource, JsonApiResponse} from "./JsonApi";
import {DrupalEntity, DrupalEntityInterface} from "./DrupalEntity";
import {DrupalLink} from "./DrupalLink";

export interface DrupalMenuItemInterface extends DrupalEntityInterface {
    mid: string | null;
    enabled: boolean | null;
    title: string | null;
    description: string | null;
    menu_name: string | null;
    external: boolean | null;
    rediscover: boolean | null;
    weight: number | null;
    expanded: boolean | null;
    parent: string | null;
    link: DrupalLink;
}

export class DrupalMenuItem extends DrupalEntity implements DrupalMenuItemInterface {
    mid: string | null = null;
    enabled: boolean | null = null;
    title: string | null = null;
    description: string | null = null;
    menu_name: string | null = null;
    external: boolean | null = null;
    rediscover: boolean | null = null;
    weight: number | null = null;
    expanded: boolean | null = null;
    parent: string | null = null;
    link: DrupalLink = new DrupalLink();

    override key_conversions = {
        'drupal_internal__id': 'mid',
    };

    constructor(resource: JsonApiResponse | JsonApiResource) {
        super(resource);
        this.fill(resource);
    }
}
