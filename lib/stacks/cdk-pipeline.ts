import { Construct } from "constructs";

import * as cdk from "aws-cdk-lib";
import * as pipelines from "aws-cdk-lib/pipelines";

import * as accounts from "#utils/accounts.js";

import { AppStage } from "#stages/app.js";
import { InfraStage } from "#stages/infra.js";

export interface CDKPipelineStackProps extends cdk.StackProps {
  //
}

export class CDKPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CDKPipelineStackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, "Pipeline", {
      crossAccountKeys: true,
      synth: new pipelines.ShellStep("Synth", {
        input: pipelines.CodePipelineSource.gitHub(
          "dangreaves/template-cdk-project",
          "main",
        ),
        commands: ["npm ci", "npx cdk synth"],
      }),
    });

    pipeline.addStage(
      new InfraStage(this, "infra", {
        env: accounts.root.env,
      }),
    );

    pipeline.addStage(
      new AppStage(this, "app", {
        env: accounts.root.env,
      }),
    );
  }
}
