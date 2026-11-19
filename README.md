# declarative-story

> **The Central Storytelling & Architectural Guide for the KeshavSoft Declarative UI Ecosystem.**

Live Documentation Website: **[https://keshavsoft.github.io/declarative-story/](https://keshavsoft.github.io/declarative-story/)**

---

## 🏛️ What is `declarative-story`?

`declarative-story` is the dedicated documentation website that carries the heavy lifting of explaining the architecture, motivations, and design patterns behind the four core repositories:

1. **[declarative-tags](https://github.com/keshavsoft/declarative-tags)** (Tier 1 &mdash; Ground Truth Dictionary)
2. **[declarative-spec](https://github.com/keshavsoft/declarative-spec)** (Tier 2 &mdash; DOM Tag Blueprints)
3. **[declarative-instructions](https://github.com/keshavsoft/declarative-instructions)** (Tier 3 &mdash; Declarative Assembly Pipeline)
4. **[declarative-definitions](https://github.com/keshavsoft/declarative-definitions)** (Tier 4 &mdash; Component Contracts & Options)

All coordinated under the top-level orchestrator **[spec-repo](https://github.com/keshavsoft/spec-repo)**.

---

## 📂 Site Structure

* `/` &mdash; **The Grand Overview**: Why Declarative UI, The 4 Pillars, The Pipeline Flow
* `/tags/` &mdash; **Chapter 1: The Tag Taxonomy**: Attribute whitelists, allowed children, and schema validation
* `/spec/` &mdash; **Chapter 2: DOM Blueprints**: Raw HTML primitives, CSS class bindings, and interpolation tokens
* `/instructions/` &mdash; **Chapter 3: Assembly Pipeline**: Replacing loops with declarative JSONPath transformation rules
* `/definitions/` &mdash; **Chapter 4: Component Contracts**: 10 UI blueprints, option frames (search, serials), and base bindings

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/keshavsoft/declarative-story.git
cd declarative-story

# Serve the static website
npx serve .
```

---

## 📄 License

MIT © [KeshavSoft](https://github.com/keshavsoft)
