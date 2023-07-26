import {DrupalViewFilter, DrupalViewFilterInterface} from "./DrupalViewFilter";

export class DrupalViewBundleFilter extends DrupalViewFilter implements DrupalViewFilterInterface {
    override value: {};
    override readonly allowed_operators;
    constructor(filter) {
        super(filter);
        this.value = filter.value;

        this.allowed_operators = {
            '=': 'IN',
            'contains': 'IN',
            'in': 'IN',
        }
    }

    public override buildQuery() {
        let filterOption = {};
        // #TODO: Might want to change this to combine multiple bundle queries or use jsonapi_cross_bundles.
        // NOT SUPPORTED FOR NOW. jsonapi_cross_bundles should be more stable and compatible with jsonapi_extras.
        filterOption[`filter[${this.id}][condition][path]`] = 'type.0';
        filterOption[`filter[${this.id}][condition][operator]`] = 'IN';
        Object.values(this.value).forEach((value, vindex) => {
            filterOption[`filter[${this.id}][condition][value][${vindex}]`] = value;
        });

        return filterOption;
    }
}