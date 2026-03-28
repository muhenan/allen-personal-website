---
title: "Test Blog Post #4 — High-Concurrency Distributed Systems"
date: "2026-03-31"
description: "A test post covering patterns for building distributed systems that handle high read/write throughput."
---

# High-Concurrency Distributed Systems

This is test blog post #4. The topic is distributed systems engineering.

## The Core Problem

When your service needs to handle 10,000+ QPS with P95 latency under 50ms, a single database and a single server simply won't cut it.

## Key Patterns

### Read/Write Splitting

Route read queries to replicas, write queries to the primary. This offloads read pressure and is one of the most impactful first steps.

```
Client
  ├─ READ  → Replica 1
  ├─ READ  → Replica 2
  └─ WRITE → Primary
```

### Caching Layer

Put Redis in front of your database for hot data. A well-tuned cache can absorb 90%+ of read traffic.

```typescript
async function getUser(id: string): Promise<User> {
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);

  const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  await redis.setex(`user:${id}`, 300, JSON.stringify(user));
  return user;
}
```

### Horizontal Sharding

Partition data across multiple database instances by a shard key (e.g. user ID mod N).

## Real Numbers from Practice

At Wayfair, we optimized a service to:

- Peak read **QPS: 10,000+**
- P95 latency reduced by **60%**
- Achieved via read replicas + Redis caching + connection pooling

## CAP Theorem Reminder

In a distributed system you can only guarantee two of three:

- **C**onsistency
- **A**vailability
- **P**artition tolerance

Most real-world systems choose AP (availability + partition tolerance) and accept eventual consistency.

---

*This is a test post. Real content coming soon.*
