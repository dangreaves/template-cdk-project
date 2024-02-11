# Template for TypeScript AWS CDK v2 projects

![GitHub License](https://img.shields.io/github/license/dangreaves/template-cdk)

This template is a starting point for building [AWS CDK v2](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html) projects with [CDK Pipelines](https://docs.aws.amazon.com/cdk/v2/guide/cdk_pipeline.html) and [TypeScript](https://www.typescriptlang.org).

1. [New to CDK?](#new-to-cdk)
2. [Cloning this template](#cloning-this-template)
3. [Authentication](#authentication)
   1. [GitHub token](#github-token)
4. [Structure](#structure)
   1. [Apps](#apps)
   2. [Stages](#stages)
   3. [Stacks](#stacks)
   4. [Constructs](#constructs)
   5. [Functions](#functions)
5. [Accounts](#accounts)
6. [VPC](#vpc)
7. [Commands](#commands)

## New to CDK?

If you are new to the AWS CDK, I highly recommend reading the [CDK TypeScript Workshop](https://cdkworkshop.com/20-typescript.html). This template loosely matches the directory structure defined in that guide.

## Cloning this template

The easiest way to get clone this template is to use [degit](https://github.com/Rich-Harris/degit).

```sh
npm install -g degit
degit dangreaves/template-cdk-project my-cdk-project
```

## Authentication

Before being able to use AWS CDK, you will need to authenticate with your AWS account. You can use of the many methods, but the the easiest way I have found is to use [Leapp](https://www.leapp.cloud), which is a GUI for AWS authentication.

My preferred approach is to configure [AWS IAM Identity Center](https://aws.amazon.com/iam/identity-center) (even if you only have one account). Then configure Leapp with the [AWS Single Sign-On integration](https://docs.leapp.cloud/latest/configuring-integration/configure-aws-single-sign-on-integration/).

Once it's setup, all you need to do is click your profile inside Leapp, complete your SSO login information and you're good to go.

### GitHub token

If your CDK repository is hosted in GitHub, AWS will need a token to be able to access it from the pipeline.

You should create a GitHub personal token, which has read access to the contents of the repository, and write access to webhooks.

Create a secret in AWS Secrets Manager with the name `github-token`, and the plaintext content as the personal access token.

AWS will automatically use this secret when accessing your GitHub repository for the pipeline source.

## Structure

This template is organised into logical groups according to the [Construct best practices](https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html#best-practices-constructs) and the [CDK Pipelines](https://docs.aws.amazon.com/cdk/v2/guide/cdk_pipeline.html) guide.

In the ([bin/cdk.ts](./bin/cdk.ts)) entrypoint, you will find a single CDK app which contains the [CDKPipelineStack](./lib/stacks/cdk-pipeline.ts) stack.

Within the pipeline stack, you will find two stages (`infra` and `app`). These stages are self-deployed by the pipeline each time a commit is pushed to this repository.

### Apps

A CDK app is the top level logical group. You should probably only have one per AWS account, but you could technically have multiple. This template contains a single app which is defined in [bin/cdk.ts](./bin/cdk.ts). In the [cdk.json](./cdk.json) file, you will see that this app is defined via the "app" attribute.

You can only deploy one app at a time.

If you wanted to add an additional app, you should add it to the lib directory. Then, when deploying, you will need to use the `--app` argument like so. This will override the "app" configuration in the cdk.json file.

```
npm run deploy -- --app "npx tsx bin/app2.ts"
```

Apps should be placed into the `bin` directory.

### Stages

A CDK pipeline stage represents a group of stacks which are deployed together.

Stages can be deployed to other AWS accounts, as long as you have configured a trust relationship between them.

Stages should be placed into the `lib/stages` directory.

### Stacks

A stack represents a single CloudFormation stack. You can have multiple stacks within a CDK app or stage.

The contents of each stack should be a single deployable unit of your app, as you cannot deploy only part of a stack. Therefore, you might put your database into one stack, with your frontend app into another, such that they can be deployed independently.

In this template, there is a [HelloWorldStack](./lib/stacks/hello-world.ts) and a [VpcStack](./lib/stacks/vpc.ts).

Stacks should be placed into the `lib/stacks` directory.

### Constructs

A construct represents a single logical resource, which can itself contain other resources. For example, you might have a construct called "Website" which contains all the AWS resources (which are themselves constructs) required to build the website. This might include S3, CloudFront, Lambda etc.

In this template, there is a single [HelloWorldApi](./lib/constructs/hello-world-api.ts) construct which contains the AWS constructs needed to build a simple API.

Constructs should be placed into the `lib/constructs` directory.

### Functions

In this template, the code for the "hello world" API is contained in [src/hello-world-handler.ts](./src/hello-world-handler.ts).

You should place any runtime code in the `src` directory.

## Accounts

In [lib/utils/accounts.ts](./lib/utils/accounts.ts), you will find a variable where you should set your AWS account ID and region.

These accounts are imported and referenced when defining the CDK pipeline stages.

There are lots of CDK features which are only possible when the CDK knows up front which account you're deploying to.

You can read more about this in the CDK [Environments](https://docs.aws.amazon.com/cdk/v2/guide/environments.html) documentation.

## VPC

If you're building anything which requires a VPC, then this should be the first thing you configure. An example [VpcStack](./lib/stacks/vpc.ts) has been added which you should edit to your requirements. The example is configured to be cheap, rather than reliable.

## Commands

Boostrap your AWS account.

```
npm run bootstrap
```

Deploy a single stack.

```
npm run deploy -- cdk-pipeline
```

Deploy all stacks.

```
npm run deploy -- --all
```

Destroy a single CDK stack.

```
npm run destroy -- cdk-pipeline
```

Destroy all stacks.

```
npm run destroy -- --all
```

Synthesize your CDK stack to CloudFormation (useful for debugging).

```
npn run synthesize
```
