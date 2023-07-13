export interface DrupalEntityInterface {
    id: string | null;
    type: string | null;
    bundle: string | null;
    langcode: string | null;
    default_langcode: boolean | null;
    status: boolean | null;
    created: string | null;
    changed: string | null;
    fields: Record<string, any>;
}
export declare class DrupalEntity implements DrupalEntityInterface {
    id: string | null;
    type: string | null;
    bundle: string | null;
    langcode: string | null;
    default_langcode: boolean | null;
    status: boolean | null;
    changed: string | null;
    created: string | null;
    fields: Record<string, any>;
    has(field: string): boolean;
    get(field: string): Promise<any>;
    handleReference(reference: any): Promise<DrupalEntity>;
}
