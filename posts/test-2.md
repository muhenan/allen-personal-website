---
title: "Test Blog Post #2 — Getting Started with LLM Post-Training"
date: "2026-03-29"
description: "A test post exploring the basics of LLM post-training techniques like SFT and RLHF."
---

# Getting Started with LLM Post-Training

This is test blog post #2. The topic is large language model post-training.

## What is Post-Training?

Post-training refers to the set of techniques applied to a pre-trained language model to align it with human preferences and specific use cases. The main stages are:

1. **Supervised Fine-Tuning (SFT)** — Train the model on high-quality instruction-response pairs.
2. **Reward Modeling (RM)** — Train a model to score outputs based on human preferences.
3. **Reinforcement Learning from Human Feedback (RLHF)** — Use PPO or similar algorithms to optimize the policy against the reward model.

## Example: A Simple SFT Data Point

```json
{
  "messages": [
    { "role": "user", "content": "Explain gradient descent in one sentence." },
    { "role": "assistant", "content": "Gradient descent iteratively updates model parameters in the direction that minimizes the loss function." }
  ]
}
```

## Key Challenges

- **Reward hacking** — the model learns to game the reward model rather than truly aligning.
- **Distribution shift** — fine-tuned outputs drift far from the pre-trained distribution.
- **Data quality** — garbage in, garbage out; human annotation quality is critical.

## Modern Alternatives

Recent work has moved toward simpler approaches like **DPO (Direct Preference Optimization)**, which skips the RL loop entirely and directly optimizes on preference pairs.

---

*This is a test post. Real content coming soon.*
