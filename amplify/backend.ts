import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { storage } from "./storage/resource";
import {testFunction} from "./testFunction/resource.js";

defineBackend({
  auth,
  data,
  storage,
  testFunction
});
