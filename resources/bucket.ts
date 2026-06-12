import pulumi from "@pulumi/pulumi";
import aws from "@pulumi/aws";

type MainBucketArgs = {
  name: string;
  product: string;
};

class MainBucket extends pulumi.ComponentResource {
  constructor(args: MainBucketArgs, opts: pulumi.CustomResourceOptions) {
    const resourceName = `${args.product}-${args.name}`;

    super("pkg:index:MainBucket", resourceName, {}, opts);

    const stack = pulumi.getStack();

    const bucketName = `${resourceName}-${stack}`;

    const bucket = new aws.s3.Bucket(args.name, {
      bucket: bucketName,
      tags: {
        Environment: stack,
      },
    });

    new aws.s3.BucketPublicAccessBlock(args.name, {
      bucket: bucket.id,
      blockPublicAcls: true,
      blockPublicPolicy: true,
      ignorePublicAcls: true,
      restrictPublicBuckets: true,
    });
  }
}
