import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    name: "myStorage",
    isDefault: true,
    access: (allow) => ({
        "files/*": [
            allow.authenticated.to(["read", "write", "delete"]),
            allow.guest.to(["read", "write", "delete"])
        ]
    })
});