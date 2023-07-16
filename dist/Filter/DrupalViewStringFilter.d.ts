import { DrupalViewFilter, DrupalViewFilterInterface } from "./DrupalViewFilter";
export declare class DrupalViewStringFilter extends DrupalViewFilter implements DrupalViewFilterInterface {
    value: string;
    readonly allowed_operators: any;
    constructor(filter: any);
    buildQuery(): never[];
}
