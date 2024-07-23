import Realm from "realm";
import { ConfigSchema } from "./schemas/ConfigSchema";

export const getRealm = async () => await Realm.open({
    path: "speed-app",
    schema: [ConfigSchema]
});