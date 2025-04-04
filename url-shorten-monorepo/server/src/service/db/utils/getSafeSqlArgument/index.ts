export const getSafeSqlArgument = function (argument: string): string {
    return argument.replace(/'/g, "''").replace(/;/g, '').replace(/--/g, '').replace(/\\/g, '\\');
};
