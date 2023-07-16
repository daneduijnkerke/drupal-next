import {DrupalViewFilter, DrupalViewFilterInterface} from "./DrupalViewFilter";

export class DrupalViewNumericFilter extends DrupalViewFilter implements DrupalViewFilterInterface {
    override value: {
        min?: string
        max?: string
        value: string
    };
    override readonly allowed_operators;
    constructor(filter) {
        super(filter);
        this.value = filter.value;

        this.allowed_operators = {
            '=': '=',
            '!=': '<>',
            '<>': '<>',
            '>': '>',
            '>=': '>=',
            '<': '<',
            '<=': '<=',
            'between': 'BETWEEN',
            'not between': 'NOT BETWEEN',
            'empty': 'IS NULL',
            'not empty': 'IS NOT NULL',
        }
    }

    public override buildQuery() {
        let filterOption = [];

        filterOption[`filter[${this.id}][condition][path]`] = this.field;
        filterOption[`filter[${this.id}][condition][operator]`] = this.allowed_operators[this.operator];

        if (this.operator === 'empty' ||
            this.operator === 'not empty') {
            return filterOption;
        }

        if (this.operator === 'between' ||
            this.operator === 'not between') {

            filterOption[`filter[${this.id}][condition][value][1]`] = this.value.min;
            filterOption[`filter[${this.id}][condition][value][2]`] = this.value.max;
            return filterOption;
        }

        filterOption[`filter[${this.id}][condition][value]`] = this.value.value;

        return filterOption;
    }
}