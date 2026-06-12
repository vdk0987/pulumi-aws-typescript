import {
  ComponentResource,
  CustomResourceOptions,
  getStack,
} from "@pulumi/pulumi";
import { s3 } from "@pulumi/aws";

type MainBucketArgs = {
  name: string;
  product: string;
};

export class MainBucket extends ComponentResource {
  constructor(args: MainBucketArgs, opts?: CustomResourceOptions) {
    const resourceName = `${args.product}-${args.name}`;

    super("pkg:index:MainBucket", resourceName, {}, opts);

    const stack = getStack();

    const bucketName = `${resourceName}-${stack}`;

    const bucket = new s3.Bucket(args.name, {
      bucket: bucketName,
      tags: {
        Environment: stack,
      },
    });

    new s3.BucketPublicAccessBlock(args.name, {
      bucket: bucket.id,
      blockPublicAcls: true,
      blockPublicPolicy: true,
      ignorePublicAcls: true,
      restrictPublicBuckets: true,
    });
  }
}
