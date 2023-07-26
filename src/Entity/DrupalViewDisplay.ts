import {JsonApiResource, JsonApiResponse} from "./JsonApi";
import {DrupalEntity} from "./DrupalEntity";
import {DrupalViewPager} from "./DrupalView";
import DrupalClient from "../DrupalClient";

export class DrupalViewDisplay extends DrupalEntity {
    vid: string | null = null;
    label: string | null = null;
    sub_entity: string | null = null;
    pager: any = null;
    view_mode: string | null = null; // The entity view mode to 'render'.
    display_mode: string | null = null; // The view display mode to use to fetch results.

    override key_conversions = {
        'drupal_internal__id': 'vid',
    };

    constructor(resource: JsonApiResponse | JsonApiResource, meta) {
        super(resource);
        this.fill(resource);
        this.display_mode = meta.display_mode ?? meta.display_mode==='' ? meta.display_mode :'default';
        this.fillViewData(resource);
    }

    private async fillViewData(res: JsonApiResponse | JsonApiResource) {
        // Convert Respones to a Resource.
        let resource = res;
        if ("data" in res && !Array.isArray(res.data)) {
            resource = <JsonApiResource>res.data
        }

        const default_display_options = resource['attributes']['display']['default']['display_options'];
        const display_options = resource['attributes']['display'][this.display_mode]['display_options'];

        // Set the pager object.
        this.pager = new DrupalViewPager(display_options['pager']);
        this.pager.options.total_pages = await this.getResultsCount();
        // Check the amount of pages to show based on the total result count divided by items per page.
        if (this.pager.type === 'full') {
            const quantity = this.pager.options.quantity;
            const result_count = this.pager.options.total_pages;
            const items_per_page = this.pager.options.items_per_page;
            this.pager.options.quantity = quantity > Math.ceil(result_count / items_per_page) ? Math.ceil(result_count / items_per_page) : quantity
        }

        // Set the view_mode (for its rendered entity)
        this.view_mode = default_display_options['row']['options']['view_mode'];
        // Set the entity type which the view filters on i.e: Nodes (node), Users (user), Paragraphs (paragraph)
        this.sub_entity = default_display_options['row']['type'].split(':')[1];
    }

    public async getResultsCount() {
        return await DrupalClient.getViewDisplayResultsCount(this.vid ?? '', this.display_mode ?? '');
    }
    public async getResults(page: number = 0) {
        return await DrupalClient.getViewDisplayResults(this.vid ?? '', this.display_mode ?? '', page);
    }
}
