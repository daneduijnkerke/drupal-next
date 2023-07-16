import { DrupalViewFilter } from "./DrupalViewFilter";
export class DrupalViewBooleanFilter extends DrupalViewFilter {
    constructor(filter) {
        super(filter);
        this.value = filter.value;
        this.allowed_operators = {
            '=': '=',
            '!=': '<>',
            '<>': '<>',
        };
    }
    buildQuery() {
        let filterOption = [];
        filterOption[`filter[${this.id}][condition][value]`] = this.value;
        filterOption[`filter[${this.id}][condition][path]`] = this.field;
        filterOption[`filter[${this.id}][condition][operator]`] = 'IN';
        return filterOption;
    }
}
