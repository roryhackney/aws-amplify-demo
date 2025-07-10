import type { Handler } from "aws-lambda";

//must be named handler
export const handler: Handler = async (event, context) => {
    return "Hello nerd!";
}