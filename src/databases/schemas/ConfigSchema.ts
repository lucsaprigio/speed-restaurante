export const ConfigSchema = {
    name: "Config",
    properties: {
        _id: "string",
        ipConnection: "string",
        cnpj: "string",
        email: "string"
    },

    primaryKey: "_id",
}