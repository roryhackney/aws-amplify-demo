import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { storage } from "./storage/resource";
import {MyFunction} from "./functions/MyFunction/resource.js";
import { MyConstruct } from './custom/MyConstruct/resource';

const backend = defineBackend({
  auth,
  data,
  storage,
  MyFunction
});

const cloudFormationStack = backend.createStack("my-backend-stack");
new MyConstruct(cloudFormationStack, "my-construct1", {name: "construct1", age: -3});
