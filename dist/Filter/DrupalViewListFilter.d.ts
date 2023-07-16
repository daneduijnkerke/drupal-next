import { DrupalViewFilter, DrupalViewFilterInterface } from "./DrupalViewFilter";
export declare class DrupalViewListFilter extends DrupalViewFilter implements DrupalViewFilterInterface {
    readonly allowed_operators: any;
    constructor(filter: any);
    buildQuery(): never[];
}
