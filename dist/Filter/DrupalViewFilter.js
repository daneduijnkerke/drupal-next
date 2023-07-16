export class DrupalViewFilter {
    constructor(filter) {
        this.id = filter.id;
        this.field = filter.field.replace('_value', '');
        this.entity_type = filter.entity_type;
        this.operator = filter.operator;
        this.value = typeof filter.value === 'object' ? Object.values(filter.value) : filter.value;
        this.filter_type = filter['plugin_id'];
        this.exposed = filter.exposed ? filter.exposed : false;
        this.expose = filter.expose;
        this.allowed_operators = {
            '=': '=',
            '!=': '!=',
            '?': '<>',
            '??': '>',
            '???': '>=',
            '????': '<',
            '?????': '<=',
            'starts': 'STARTS_WITH',
            'contains': 'CONTAINS',
            'ends': 'ENDS_WITH',
            'in': 'IN',
            '?*': 'NOT IN',
            '?**': 'BETWEEN',
            '?***': 'NOT BETWEEN',
            '?****': 'IS NULL',
            '?*****': 'IS NOT NULL',
        };
    }
    buildQuery() {
        if (this.id === 'type') {
            return;
        }
        let filterOption = {};
        // list_field filter
        filterOption[`filter[${this.id}][operator]`] = this.operator.toUpperCase();
        filterOption[`filter[${this.id}][value]`] = this.value;
        return filterOption;
    }
}
