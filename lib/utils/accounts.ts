import * as cdk from "aws-cdk-lib";

export interface Account {
  name: string;
  env: cdk.Environment;
}

// @todo Set your account ID and region here.
export const root = {
  name: "root",
  env: { account: "123456789", region: "ap-southeast-2" },
} as const satisfies Account;
