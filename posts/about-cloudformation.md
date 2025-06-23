# About CloudFormation

*Date: 2025-06-23*

AWS CloudFormation is a powerful Infrastructure as Code (IaC) service that allows you to model and provision AWS resources using declarative templates. 

### Concepts

#### Template

A CloudFormation template is a JSON or YAML formatted text file. You can save these files with any extension. CloudFormation uses these files templates as blueprints for building your AWS resources.

#### Stack

When you use CloudFormation, you manage related resources as a single unit called a stack. You create, update, and delete a collection of resources by operating on stacks. All the resources in a stack are defined by the stack's CloudFormation template.

#### Change set

If you need to make changes to the running resources in a stack, you update the stack. Before making changes to your resources, you can generate a change set, which is a summary of your proposed changes. Change sets allow you to see how your changes might impact your running resources, especially critical resources, before implementing them.

#### Stack set

A Stack Set lets you create stacks in AWS accounts across regions by using a single CloudFormation template. All resources included in each stack are defined by the stack set's CloudFormation template.

### Example

Here's a basic CloudFormation template that creates a simple S3 bucket with some basic configuration:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Basic S3 Bucket Template'

Parameters:
  BucketName:
    Type: String
    Description: Name for the S3 bucket
    Default: my-cloudformation-bucket

Resources:
  MyS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref BucketName
      VersioningConfiguration:
        Status: Enabled
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
      Tags:
        - Key: Environment
          Value: Production
        - Key: Purpose
          Value: CloudFormation Example

Outputs:
  BucketName:
    Description: Name of the created S3 bucket
    Value: !Ref MyS3Bucket
    Export:
      Name: !Sub "${AWS::StackName}-BucketName"
```

This template demonstrates several key CloudFormation concepts:

- **Parameters**: The `BucketName` parameter allows you to customize the bucket name when deploying the stack
- **Resources**: The `MyS3Bucket` resource defines an S3 bucket with versioning enabled and public access blocked for security
- **Properties**: Each resource has specific properties that configure its behavior
- **Outputs**: The template exports the bucket name so other stacks can reference it
- **Intrinsic Functions**: `!Ref` and `!Sub` are CloudFormation functions that reference other values

To deploy this template, you would save it as a `.yaml` file and use the AWS CLI or CloudFormation console to create a new stack.

---

*Tags: CloudFormation, AWS*