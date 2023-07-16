import { DrupalViewFilter } from "./DrupalViewFilter";
export class DrupalViewStringFilter extends DrupalViewFilter {
    constructor(filter) {
        super(filter);
        this.value = filter.value;
        this.allowed_operators = {
            '=': '=',
            '!=': '<>',
            'contains': 'CONTAINS',
            'starts': 'STARTS_WITH',
            'ends': 'ENDS_WITH',
            'empty': 'IS NULL',
            'not empty': 'IS NOT NULL',
        };
    }
    buildQuery() {
        let filterOption = [];
        filterOption[`filter[${this.id}][condition][path]`] = this.field;
        filterOption[`filter[${this.id}][condition][operator]`] = this.allowed_operators[this.operator];
        if (this.operator === 'empty' ||
            this.operator === 'not empty') {
            return filterOption;
        }
        filterOption[`filter[${this.id}][condition][value]`] = this.value;
        return filterOption;
    }
}
