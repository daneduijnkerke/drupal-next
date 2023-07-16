export interface DrupalViewFilterInterface {
    id: string;
    field: string;
    entity_type: string;
    operator: string;
    readonly allowed_operators: {
        '='?: '=';
        '!='?: '<>';
        '<>'?: '<>';
        '>'?: '>';
        '>='?: '>=';
        '<'?: '<';
        '<='?: '<=';
        'starts'?: 'STARTS_WITH';
        'contains'?: 'CONTAINS';
        'ends'?: 'ENDS_WITH';
        'in'?: 'IN';
        'not in'?: 'NOT IN';
        'between'?: 'BETWEEN';
        'not between'?: 'NOT BETWEEN';
        'empty'?: 'IS NULL';
        'not empty'?: 'IS NOT NULL';
    };
    value: any;
    filter_type: string;
    exposed: boolean;
    expose: {};
    buildQuery(): void;
}
export declare class DrupalViewFilter implements DrupalViewFilterInterface {
    id: string;
    field: string;
    entity_type: string;
    operator: string;
    readonly allowed_operators: any;
    value: any;
    filter_type: string;
    exposed: boolean;
    expose: {};
    constructor(filter: any);
    buildQuery(): {} | undefined;
}
