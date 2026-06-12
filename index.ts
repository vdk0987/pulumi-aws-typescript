import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { MainBucket } from "./resources/bucket";

new MainBucket({
  name: "first-bucket",
  product: "first-product",
})
