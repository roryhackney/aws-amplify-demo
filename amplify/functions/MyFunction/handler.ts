import type {Schema} from "../../data/resource";

//must be named handler
export const handler: Schema["MyFunction"]["functionHandler"] = async function() {
    return "Hello nerd!";
}