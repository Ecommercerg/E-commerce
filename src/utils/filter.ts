export interface IFilter {
    name: string;
    value: string | number;
    operator: Operator;
}

export interface ISort{
    name: string;
    direction: SortDirection;
}

export enum Operator {
    EQUALS = 'EQUALS',
    GREATER_THAN = 'GREATER_THAN',
    LESS_THAN = 'LESS_THAN',
    CONTAINS = 'CONTAINS',
}

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}