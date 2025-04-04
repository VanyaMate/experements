export type ValidatorResponse = false | string;
export type Validator = (value: string) => ValidatorResponse;
