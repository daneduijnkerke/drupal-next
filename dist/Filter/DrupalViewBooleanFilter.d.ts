import { DrupalViewFilter, DrupalViewFilterInterface } from "./DrupalViewFilter";
export declare class DrupalViewBooleanFilter extends DrupalViewFilter implements DrupalViewFilterInterface {
    value: boolean;
    readonly allowed_operators: any;
    constructor(filter: any);
    buildQuery(): {};
}
