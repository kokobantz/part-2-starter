# Part 2 — Responses

**What worked**

Figma MCP was genuinely useful for the stuff I'd normally eyeball and get wrong — exact hex values, font weights, letter spacing, padding. Reading nodes one at a time (header, filter panel, card, results) kept each prompt focused and the output easy to verify against the design. Wiring everything into a single Zustand store early made the filter/sort/selection logic clean and avoided prop-drilling across three components.

**What didn't**

I seeded the store with pre-selected filters that matched the Figma chip state, which ended up filtering out every card on load — nothing visible until I caught it. The MCP output also uses style tokens, not Tailwind classes, so there's still a manual translation step that's easy to misread under time pressure.

**Next time**

Read the root container node first to lock in layout constraints before touching children. Would've caught the `max-w` issue earlier instead of fixing it after the fact.
