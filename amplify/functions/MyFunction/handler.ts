import type {Schema} from "../../data/resource";
import {secret} from "@aws-amplify/backend";

//must be named handler
export const handler: Schema["MyFunction"]["functionHandler"] = async (event) => {
    const {name} = event.arguments;
    const sec = secret("SECRET_THAT_DOES_NOT_EXIST");
    return `Hello ${name}! Your secret is ${sec}`;
}