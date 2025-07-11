import type {Schema} from "../../data/resource";

//must be named handler
export const handler: Schema["MyFunction"]["functionHandler"] = async (event) => {
    const {name} = event.arguments;
    return `Hello ${name}!`;
}