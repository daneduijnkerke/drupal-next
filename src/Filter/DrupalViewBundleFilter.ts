import {DrupalViewFilter, DrupalViewFilterInterface} from "./DrupalViewFilter";

export class DrupalViewBundleFilter extends DrupalViewFilter implements DrupalViewFilterInterface {
    override value: string;
    override readonly allowed_operators;
    constructor(filter) {
        super(filter);
        this.value = filter.value;

        this.allowed_operators = {
            '=': '=',
            '!=': '!=',
            'contains': 'CONTAINS',
            'starts': 'STARTS_WITH',
            'ends': 'ENDS_WITH',
        }
    }

    public override buildQuery() {
        let filterOption = [];

        filterOption[`filter[${this.id}][condition][value]`] = this.value;
        filterOption[`filter[${this.id}][condition][path]`] = this.field;
        filterOption[`filter[${this.id}][condition][operator]`] = 'IN';

        return filterOption;
    }
}