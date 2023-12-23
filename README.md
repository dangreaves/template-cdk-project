# Template for TypeScript AWS CDK v2 projects

![GitHub License](https://img.shields.io/github/license/dangreaves/template-cdk)

This template is a starting point for building [AWS CDK v2](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html) projects with [TypeScript](https://www.typescriptlang.org).

1. [New to CDK?](#new-to-cdk)
2. [Structure](#structure)
   1. [Apps](#apps)
   2. [Stacks](#stacks)
   3. [Constructs](#constructs)
   4. [Functions](#functions)
3. [Commands](#commands)
4. [Tools](#tools)

## New to CDK?

If you are new to the AWS CDK, I highly recommend reading the [CDK TypeScript Workshop](https://cdkworkshop.com/20-typescript.html). This template loosely matches the directory structure defined in that guide.

## Structure

This template is organised into logical groups according to the [Construct best practices](https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html#best-practices-constructs).

As an example, this template contains a single CDK app ([bin/cdk.ts](./bin/cdk.ts)) which contains the [HelloWorldStack](./lib/hello-world-stack.ts) which itself contains the [HelloWorldApi](./lib/hello-world-api/hello-world-api.ts) construct. The construct builds a simple API using API Gateway and AWS Lambda, which returns the message "Hello world".

### Apps

A CDK app is the top level logical group. You should probably only have one per AWS account, but you could technically have multiple. This template contains a single app which is defined in [bin/cdk.ts](./bin/cdk.ts). In the [cdk.json](./cdk.json) file, you will see that this app is defined via the "app" attribute.

You can only deploy one app at a time.

If you wanted to add an additional app, you should add it to the lib directory. Then, when deploying, you will need to use the `--app` argument like so. This will override the "app" configuration in the cdk.json file.

```
npm run deploy -- --app "npx tsx bin/app2.ts"
```

### Stacks

A stack represents a single CloudFormation stack. You can have multiple stacks within a CDK app. The contents of each stack should be a single deployable unit of your app, as you cannot deploy only part of a stack. Therefore, you might put your database into one stack, with your frontend app into another, such that they can be deployed independently.

In this template, there is a single [HelloWorldStack](./lib/hello-world-stack.ts).

Stacks should be placed into the `lib` directory.

### Constructs

A construct represents a single logical resource, which can itself contain other resources. For example, you might have a construct called "Website" which contains all the AWS resources (which are themselves constructs) required to build the website. This might include S3, CloudFront, Lambda etc.

In this template, there is a single [HelloWorldApi](./lib/hello-world-api/hello-world-api.ts) construct which contains the AWS constructs needed to build a simple API.

Constructs should be placed into the `lib` directory, organised by directory name.

### Functions

A function is the code for a Lambda function. Often, a Lambda function is associated with a single construct, so you should co-locate it with the code for the construct, in the same directory.

In this template, the code for the "hello world" API is contained in [lib/hello-world-api/hello-world-handler.ts](./lib/hello-world-api/hello-world-handler.ts).

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

## Tools

This template has the following tools configured.

- [tsx](https://github.com/privatenumber/tsx)
- [husky](https://github.com/typicode/husky)
- [prettier](https://prettier.io)
- [commander](https://github.com/tj/commander.js)
- [typescript](https://www.typescriptlang.org)
- [lint-staged](https://github.com/lint-staged/lint-staged)
- [eslint](https://eslint.org) and [typescript-eslint](https://typescript-eslint.io)
