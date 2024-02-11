#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";

import * as accounts from "#utils/accounts.js";

import { CDKPipelineStack } from "#stacks/cdk-pipeline.js";

const app = new cdk.App();

new CDKPipelineStack(app, "cdk-pipeline", { env: accounts.root.env });
