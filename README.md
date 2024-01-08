# Template for TypeScript AWS CDK v2 projects

![GitHub License](https://img.shields.io/github/license/dangreaves/template-cdk)

This template is a starting point for building [AWS CDK v2](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html) projects with [TypeScript](https://www.typescriptlang.org).

1. [New to CDK?](#new-to-cdk)
2. [Getting started](#getting-started)
3. [Structure](#structure)
   1. [Apps](#apps)
   2. [Stacks](#stacks)
   3. [Constructs](#constructs)
   4. [Functions](#functions)
4. [Environment](#environment)
5. [VPC](#vpc)
6. [Commands](#commands)

## New to CDK?

If you are new to the AWS CDK, I highly recommend reading the [CDK TypeScript Workshop](https://cdkworkshop.com/20-typescript.html). This template loosely matches the directory structure defined in that guide.

## Getting started

The easiest way to get started with this template is to use [degit](https://github.com/Rich-Harris/degit).

```sh
npm install -g degit
degit dangreaves/template-cdk-project my-cdk-project
```

## Structure

This template is organised into logical groups according to the [Construct best practices](https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html#best-practices-constructs).

As an example, this template contains a single CDK app ([bin/cdk.ts](./bin/cdk.ts)) which contains the [HelloWorldStack](./lib/stacks/hello-world.ts) which itself contains the [HelloWorldApi](./lib/constructs/hello-world-api.ts) construct. The construct builds a simple API using API Gateway and AWS Lambda, which returns the message "Hello world".

### Apps

A CDK app is the top level logical group. You should probably only have one per AWS account, but you could technically have multiple. This template contains a single app which is defined in [bin/cdk.ts](./bin/cdk.ts). In the [cdk.json](./cdk.json) file, you will see that this app is defined via the "app" attribute.

You can only deploy one app at a time.

If you wanted to add an additional app, you should add it to the lib directory. Then, when deploying, you will need to use the `--app` argument like so. This will override the "app" configuration in the cdk.json file.

```
npm run deploy -- --app "npx tsx bin/app2.ts"
```

### Stacks

A stack represents a single CloudFormation stack. You can have multiple stacks within a CDK app. The contents of each stack should be a single deployable unit of your app, as you cannot deploy only part of a stack. Therefore, you might put your database into one stack, with your frontend app into another, such that they can be deployed independently.

In this template, there is a [HelloWorldStack](./lib/stacks/hello-world.ts) and a [VpcStack](./lib/stacks/vpc.ts).

Stacks should be placed into the `lib/stacks` directory.

### Constructs

A construct represents a single logical resource, which can itself contain other resources. For example, you might have a construct called "Website" which contains all the AWS resources (which are themselves constructs) required to build the website. This might include S3, CloudFront, Lambda etc.

In this template, there is a single [HelloWorldApi](./lib/constructs/hello-world-api.ts) construct which contains the AWS constructs needed to build a simple API.

Constructs should be placed into the `lib/constructs` directory.

### Functions

In this template, the code for the "hello world" API is contained in [src/hello-world-handler.ts](./src/hello-world-handler.ts).

You should place any runtime code in the `src` directory.

## Environment

In [bin/cdk.ts](./bin/cdk.ts), you will find an `env` variable where you should set your AWS account ID and region. There are lots of CDK features which are only possible when the CDK knows up front which account you're deploying to.

You can read more about this in the CDK [Environments](https://docs.aws.amazon.com/cdk/v2/guide/environments.html) documentation.

## VPC

If you're building anything which requires a VPC, then this should be the first thing you configure. An example [VpcStack](./lib/stacks/vpc.ts) has been added which you should edit stack to your requirements. The example is configured to be cheap, rather than reliable.

When you're done, you will need to uncomment it in [bin/cdk.ts](./bin/cdk.ts), where you can then use it as a dependency for other stacks.

## Commands

Boostrap your AWS account.

```
npm run bootstrap
```

Deploy your CDK stack.

```
npm run deploy
```

Destroy your CDK stack.

```
npm run destroy
```

Synthesize your CDK stack to CloudFormation (useful for debugging).

```
npn run synthesize
```
