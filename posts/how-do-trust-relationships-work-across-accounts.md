# How do trust relationships work across accounts?

*Date: 2025-06-26*

### What is a Trust Relationship?

A Trust Relationship in AWS defines who (which AWS principals) can assume an IAM role. This is configured in the role's trust policy, which is a JSON document stating which accounts or entities can use `sts:AssumeRole` to access the role.

#### Example

Suppose we have:
- Account A (where a user or a service lives)
- Account B (where a resource or IAM role lives)

1. **Account B** defines a role with a trust policy allowing account A's principal to assume it.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT-A-ID:root"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

2. Account A configures its users, services, or automation to call `sts:AssumeRole` with the role ARN from Account B.

3. Temporary credentials are returned, and the caller from account A can now act with the permissions attached to the role in account B, but only within the session time limit.

#### What is `aws-auth` ConfigMap? (Edge case configuration when using EKS)

The `aws-auth` ConfigMap is a Kubernetes resource inside an EKS cluster that maps IAM identities (users or roles) to Kubernetes RBAC permissions. Think of it like a bridge between AWS IAM and Kubernetes RBAC.

EKS requires you to explicitly allow that IAM role to act as a Kubernetes user by mapping it in the `aws-auth` ConfigMap.

Example:
```
DevOps Account
  └── CodeBuild runs as CodeBuildServiceRole
      └── sts:AssumeRole → EKSDeploymentRole (in App Account)
          └── IAM policy: access to EKS resources (e.g., eks:DescribeCluster)
          └── aws-auth ConfigMap maps EKSDeploymentRole to Kubernetes access
```

---

*Tags: EKS, IAM, Trust relationships, AWS*