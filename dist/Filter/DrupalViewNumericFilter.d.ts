import { DrupalViewFilter, DrupalViewFilterInterface } from "./DrupalViewFilter";
export declare class DrupalViewNumericFilter extends DrupalViewFilter implements DrupalViewFilterInterface {
    value: {
        min?: string;
        max?: string;
        value: string;
    };
    readonly allowed_operators: any;
    constructor(filter: any);
    buildQuery(): never[];
}
