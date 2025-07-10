import { defineFunction } from "@aws-amplify/backend";

export const MyFunction = defineFunction({
    name: "MyFunction", //optional, default would be directory name, test
});