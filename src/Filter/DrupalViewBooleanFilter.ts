import {DrupalViewFilter, DrupalViewFilterInterface} from "./DrupalViewFilter";

export class DrupalViewBooleanFilter extends DrupalViewFilter implements DrupalViewFilterInterface {
    override value: boolean;
    override readonly allowed_operators;
    constructor(filter) {
        super(filter);
        this.value = filter.value;

        this.allowed_operators = {
            '=': '=',
            '!=': '<>',
            '<>': '<>',
        }
    }

    public override buildQuery() {
        let filterOption = {};

        filterOption[`filter[${this.id}][condition][value]`] = this.value;
        filterOption[`filter[${this.id}][condition][path]`] = this.field;
        filterOption[`filter[${this.id}][condition][operator]`] = 'IN';

        return filterOption;
    }
}