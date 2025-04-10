export const getSafeSqlArgument = function (arg: string): string {
    return arg.replace(/'/g, "''").replace(/;/g, '').replace(/--/g, '').replace(/\\/g, '\\');
};
