import {DrupalViewFilter, DrupalViewFilterInterface} from "./DrupalViewFilter";

export class DrupalViewListFilter extends DrupalViewFilter implements DrupalViewFilterInterface {
    override readonly allowed_operators;
    constructor(filter) {
        super(filter);

        this.allowed_operators = {
            '=': '=',
            '!=': '<>',
            'contains': 'CONTAINS',
            'starts': 'STARTS_WITH',
            'ends': 'ENDS_WITH',
        }
    }

    public override buildQuery() {
        let filterOption = [];


        if (Array.isArray(this.value)) {
            const conjunction = this.operator.toUpperCase();

            // Workaround for AND conjunction. https://www.drupal.org/project/drupal/issues/3066202.
            if (conjunction === 'AND') {
                this.value.forEach((value, vindex) => {
                    const filterGroup = `${this.field}-${vindex}-${this.operator}`.replaceAll('_', '-');
                    filterOption[`filter[${filterGroup}][group][conjunction]`] = conjunction;
                    filterOption[`filter[${this.id}-${vindex}][condition][value]`] = value;
                    filterOption[`filter[${this.id}-${vindex}][condition][path]`] = this.field;
                    filterOption[`filter[${this.id}-${vindex}][condition][memberOf]`] = filterGroup;
                });
                return filterOption;
            }

            filterOption[`filter[${this.id}][condition][path]`] = this.field;
            filterOption[`filter[${this.id}][condition][operator]`] = 'IN';
            this.value.forEach((value, vindex) => {
                filterOption[`filter[${this.id}][condition][value][${vindex}]`] = value;
            });

            return filterOption;
        }

        return filterOption;
    }
}