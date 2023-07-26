import {JsonApiResource, JsonApiResponse} from "./JsonApi";
import {DrupalEntity, DrupalEntityInterface} from "./DrupalEntity";
import DrupalUtils from "../Utils/DrupalUtils";

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
    image_style_uri?: {
        [key: string]: string
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
    image_style_uri = {};

    override key_conversions = {
        'drupal_internal__fid': 'fid',
    };

    constructor(resource: JsonApiResponse | JsonApiResource) {
        super(resource);
        this.uri = {
            value: null,
            url: null,
            absolutePath: null,
        }
        this.fill(resource);


        // Add absolute url to file.
        const drupalConfig = DrupalUtils.getConfig();
        let fileUrl = '';
        if ("data" in resource) {
            const res = <JsonApiResource>resource.data;
            fileUrl = res.attributes.uri.url
        } else {
            fileUrl = resource.attributes.uri.url
        }
        this.uri.absolutePath = drupalConfig.protocol + drupalConfig.host + fileUrl;
    }

    getAbsolutePath(): string | null {
        return this.uri.absolutePath;
    }
}
