# About AWS Organizations and AWS Control Tower

*Date: 2025-06-25*

AWS Organizations enables centralized management of multiple AWS accounts with policy-based governance, while AWS Control Tower provides a pre-packaged solution for establishing secure multi-account environments with automated guardrails and compliance controls.

### AWS Organizations

AWS Organizations is an AWS service that lets you centrally manage and govern multiple AWS accounts as your environment grows. It provides policy-based management, automation, and consolidated billing for all accounts in your organization.

#### Main Features
- Create accounts programmatically
- Group accounts into Organizational Units (OUs)
- Create and enforce tag policies
- Centrally provide tools and access for your security team
- Use Service Control Policies (SCPs)
- Share resources with AWS Resource Access Manager (RAM)
- Consolidated billing

##### Group accounts into Organizational Units (OUs)
OUs let you organize accounts into a hierarchy, making it easier to apply policies and manage access at scale. AWS allows you to nest OUs within other OUs, creating a multi-level hierarchy that mirrors your organization's structure.

**Important limitations:**
- OUs can be nested a maximum of 5 levels deep under the root
- You cannot register an OU unless its parent OU is registered
- Nested OUs must be registered separately in AWS Control Tower
- You cannot register an OU under the core OU (Security OU)

**Control inheritance:** When you enable controls on a parent OU, preventive controls are automatically enforced on all nested OUs and accounts below it. However, detective and proactive controls must be enabled separately for each nested OU.

Example:
```yaml
AWS Organization: acme-root
│
├── OU: Core
│   ├── Account: Management
│   ├── Account: LogArchive
│   └── Account: Audit
│
├── OU: Infrastructure
│   ├── OU: Shared
│   │   ├── Account: SharedServices
│   │   └── Account: Monitoring
│   └── OU: Network
│       ├── Account: TransitGateway
│       └── Account: DNS
│
├── OU: Sandbox
│   ├── OU: DeveloperTeams
│   │   ├── OU: TeamA
│   │   │   ├── Account: DevUserA1
│   │   │   └── Account: DevUserA2
│   │   └── OU: TeamB
│   │       ├── Account: DevUserB1
│   │       └── Account: DevUserB2
│   └── OU: Training
│       └── Account: WorkshopLab
│
├── OU: Workloads
│   ├── OU: BusinessUnits
│   │   ├── OU: BU1
│   │   │   ├── OU: Prod
│   │   │   │   ├── Account: BU1-AppProd
│   │   │   │   └── Account: BU1-DBProd
│   │   │   └── OU: Dev
│   │   │       ├── Account: BU1-AppDev
│   │   │       └── Account: BU1-DBDev
│   │   └── OU: BU2
│   │       └── OU: Dev
│   │           └── Account: BU2-AppDev
│   └── OU: CustomerFacing
│       └── Account: PublicWeb
│
└── OU: Suspended
    └── Account: OldFinance

```

##### Create and enforce tag policies
Tag policies let you define rules for how AWS resources should be tagged across your organization. This ensures consistency in tagging (such as requiring certain tags or enforcing tag formats), which is important for cost allocation, automation, and security. For example, you can require that all EC2 instances have a `Project` tag, and that the tag value matches a specific pattern.

Tag policies only enforce tagging rules for new or updated resources. They do **not** retroactively fix untagged resources that already exist.

##### Centrally provide tools and access for your security team
Give your security and compliance teams the access and tools they need across all accounts from a central location. This includes cross-account access, centralized logging, and unified security monitoring.

##### Use Service Control Policies (SCPs)
SCPs allow you to set permission guardrails, ensuring that accounts and users can only perform actions that comply with your organization's security and compliance requirements. SCPs work at the organization, OU, or account level and can deny specific AWS service actions.

##### Share resources with AWS Resource Access Manager (RAM)
Share resources like subnets, transit gateways, or license configurations across accounts in your organization. This enables resource reuse and reduces duplication while maintaining proper access controls.

### AWS Control Tower

AWS Control Tower is a service that helps you set up and govern a secure, multi-account AWS environment based on AWS best practices. It provides a pre-packaged solution for establishing a landing zone with automated account provisioning and governance controls.

#### How it works

1. **Landing Zone Setup**: Control Tower creates a secure, preconfigured environment (landing zone) with three foundational accounts: Management, Audit, and Log Archive accounts.

2. **Organizational Structure**: It sets up AWS Organizations with predefined OUs and applies baseline configurations across all accounts.

3. **Guardrails**: Control Tower deploys preventive and detective guardrails that enforce security and compliance policies across your organization.

4. **Account Factory**: Provides automated account provisioning with baseline configurations, ensuring new accounts are created with proper security settings.

5. **Dashboard**: Offers a centralized dashboard for monitoring compliance, managing accounts, and viewing organizational structure.

#### Nested OUs in Control Tower

When working with nested OUs in AWS Control Tower, there are several important considerations:

- **Registration requirements**: Nested OUs must be registered separately, and you cannot register an OU unless its parent OU is registered first.

- **Control behavior**: Preventive controls enabled on higher OUs are automatically enforced on all nested OUs below them. Detective and proactive controls must be enabled separately for each nested OU.

- **Compliance tracking**: An OU's compliance status is not determined by the compliance of its nested OUs. Each OU is evaluated independently based on its own accounts and controls.

- **Drift management**: If a top-level OU is in drift, it may prevent registration of nested OUs, especially if AWS Config resources are affected.

#### When to use Control Tower
- You need a governed multi-account AWS setup with security best practices
- You're scaling to many teams or business units and need consistent governance
- You want to enforce compliance and security baselines automatically across all accounts
- You want easy account provisioning with baseline configurations built-in
- You need a standardized approach to AWS account management and governance

#### Key Benefits
- **Automated Setup**: Pre-built landing zone with security best practices
- **Consistent Governance**: Automated guardrails and policies across all accounts
- **Simplified Management**: Centralized dashboard and account provisioning
- **Compliance Ready**: Built-in controls for common compliance frameworks

---

*Tags: AWS, AWS Organizations, AWS Control Tower*