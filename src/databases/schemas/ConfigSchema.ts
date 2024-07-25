import { ObjectSchema } from "realm";

export const ConfigSchema: ObjectSchema = {
    name: "Config",
    properties: {
        _id: "string",
        ipConnection: "string",
        cnpj: "string",
        email: "string"
    },

    primaryKey: "_id",
}