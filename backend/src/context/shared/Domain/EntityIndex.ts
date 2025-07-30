export interface EntityIndex {
    schema: string;
    entity: string;

    name: string;
    fields: Array<{
        name: string;
        direction: number;
    }>;
    options: any;
}
