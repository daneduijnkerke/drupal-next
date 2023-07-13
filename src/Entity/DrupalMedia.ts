import {JsonApiResource, JsonApiResponse} from "./JsonApi";
import {DrupalEntity, DrupalEntityInterface} from "./DrupalEntity";
import {DrupalFile} from "./DrupalFile";

export interface DrupalMediaInterface extends DrupalEntityInterface {
    mid: string | null;
    name: string | null;
    path: Record<string, string> | null;
    files: DrupalFile[];

    getFile(): void;
    getFiles(): void;
}

export class DrupalMedia extends DrupalEntity implements DrupalMediaInterface {
    mid: string | null = null;
    name: string | null = null;
    path: Record<string, string> | null = null;
    files: DrupalFile[] = [];

    override key_conversions = {
        'drupal_internal__mid': 'mid',
    };

    constructor(resource: JsonApiResponse | JsonApiResource) {
        super(resource);
        this.fill(resource);
        // Fill all includes.
        if ("included" in resource) {
            resource.included.forEach(include => {
                const resource = include as JsonApiResource;
                this.files.push(new DrupalFile(resource));
            });
        }
    }

    getFile(): DrupalFile | null {
        return this.files[0] ?? null;
    }

    getFiles(): DrupalFile[] {
        return this.files;
    }
}
