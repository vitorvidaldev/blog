# Aurora Read Replicas And Multi-AZ

*Date: 2025-06-29*

### Aurora Read Replicas

Aurora Read Replicas also referred to as reader instances have two main purposes. You can issue queries to them to scale your read operations for your application. You typically do so by connecting to the reader endpoint of the cluster. That away, Aurora can spread the load for read-only connections across many Aurora Replicas as you have in the cluster. Aurora Replicas also help to increase availability.

By adding a reader instance to the Aurora cluster, the read-only traffic requests can be served from the reader instance, greatly reducing the traffic to the primary DB and avoiding interruption.

The cluster endpoint provides failover support for read/write connections to the DB cluster. If the current primary DB instance of a DB cluster fails, Aurora automatically fails over to a new primary DB instance. During a failover, the DB cluster continues to serve connection requests to the cluster endpoint from the new primary DB instance, with minimal interruption of service. This is the reason you should use the cluster endpoint and not the instance endpoint.

### Aurora Multi-AZ

**Once you have created your Aurora cluster, you cannot change its configuration to Multi-AZ**

Aurora Multi-AZ works by automatically replicating your database across multiple AZs in the same AWS region to improve availability, durability, and failover capabilities.

---

*Tags: AWS, Aurora*