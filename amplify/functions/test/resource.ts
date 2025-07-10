import { defineFunction } from "@aws-amplify/backend";

export const testFunction = defineFunction({
    name: "testFunction", //optional, default would be directory name, test
});