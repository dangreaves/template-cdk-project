#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";

import { HelloWorldStack } from "../lib/hello-world-stack.js";

const app = new cdk.App();

new HelloWorldStack(app, "HelloWorldStack");
