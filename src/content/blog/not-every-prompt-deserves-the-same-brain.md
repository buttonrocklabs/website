---
title: "Not every prompt deserves the same brain"
slug: "not-every-prompt-deserves-the-same-brain"
date: "2026-07-09"
author: "Greg Falconer"
excerpt: "Building is cheap now, but intelligence is metered. The new waste is aiming your most expensive brain at work a cheaper one does better. Here is how we triage work by complexity, match the model to the job, and stop paying surgeon prices for box-carrying."
readingTime: "7 min read"
---

> Last month I watched my AI capacity gauge cross 90% before lunch. I keep it on my dashboard for exactly this reason, the way a shop keeps an eye on the lumber rack: you check what's left before you promise the next cut. I scrolled back through the morning to see what had eaten it. Renaming files. Reformatting a table. Moving a section of copy from one page to another. Not one decision in the pile. I had spent a morning of the most capable intelligence money can buy on work a fraction of it would have done identically.
>
> I had sent a surgeon to carry boxes. All morning. At surgeon rates.

When I wrote that [the prototype is the product](/blog/the-prototype-is-the-product), the point was that building collapsed from months to hours. When I wrote about [the discipline of vibe coding](/blog/the-discipline-of-vibe-coding), the point was that cheap building makes direction the scarce thing. This post is the third leg of that stool: even with the right destination, there is a craft to deciding what each mile of the road deserves.

## Intelligence became a utility, and utilities are metered

We talk about AI like it is a person. It is closer to electricity. It comes in grades, it is metered, and the meter does not care whether you used it wisely.

The meter shows up differently depending on how you work. If you pay per token, it is a literal invoice. If you work inside a capacity plan, it is a ceiling you hit at 2pm with real work still on the bench. Either way, the constraint is the same: there is a finite pool of intelligence available to you today, and every unit you spend on trivia is a unit unavailable for the decision that actually needed it.

Nobody plans their week around electricity because electricity is cheap and effectively infinite. Intelligence is neither yet. Which means allocation, not access, is where the advantage lives.

## Staff the work like you would staff a team

Most companies would never send their most senior engineer to reset a password. The assignment question is so obvious inside a company that we do not even think of it as a decision. Junior work goes to junior people. The expensive judgment goes where mistakes are expensive.

Then most of us sit down with an AI and do the opposite: one model, maximum effort, every prompt, all day. The default settings crown every task instead of staffing it.

The fix is a ten-second triage before you type. Every piece of work is one of three things:

- **Mechanical.** Renames, reformatting, boilerplate, rote edits, the hundredth instance of a known pattern. There is one right answer and it is obvious. This is box-carrying. Smallest model that can lift it.
- **Lookup.** Find where something lives, fetch a fact, summarize what a file says. The work is retrieval, not judgment. Send a scout, and let the scout be cheap.
- **Judgment.** Architecture, tradeoffs, naming, anything a customer will see, anything expensive to get wrong. This is where the frontier brain earns its rate. Spend here without guilt.

My rule of thumb: match the model to the blast radius of a mistake. A botched rename costs you a minute. A botched architecture decision costs you a quarter.

## The discipline, in practice

Like the last post, this only works as habits, not intentions. Here is what we actually run:

- **Triage before you type.** One breath: mechanical, lookup, or judgment? The answer changes which brain gets the job and how much effort it is granted.
- **Send scouts for lookups.** Cheap agents do the searching and return conclusions. The expensive brain should read findings, not rummage through file dumps. Paying frontier rates to scroll is the quietest leak in the whole system.
- **Keep the working context lean.** Do not re-read what you already know. Do not fetch the whole record when you need one field. Every token spent re-reading is a token that cannot be spent thinking. We trimmed our own internal tooling to answer in summaries instead of novels and the effect showed up on the gauge within a week.
- **Watch the gauge.** Capacity is a fuel tank, not a suggestion. At 90% we finish the unit of work in flight, write down exactly where we stopped, and end clean. Starting a big job on fumes produces the worst work of the day and then leaves it half-done.
- **Log what work actually costs.** Every unit of work gets its real cost recorded when it ships: time, prompts, tokens. Estimates built on observed burn beat estimates built on optimism, and after a few weeks you know precisely which kinds of work are cheap for you and which quietly eat the budget.

None of this is exotic. It is the same operational hygiene every well-run shop applies to labor, just applied to a resource most people have not started treating as finite.

## Why this matters beyond builders

If you run a business, here is the part worth stealing: a token line item is coming to your P&L, if it is not there already. The companies that treat intelligence allocation as a craft will quietly out-execute the ones that treat it as a faucet, the same way companies that manage labor thoughtfully out-execute the ones that throw headcount at everything.

And if you are evaluating a partner to build with, ask them how they decide what level of intelligence a task deserves. If the answer is a blank look, you are about to pay surgeon rates for box-carrying, marked up.

For us the connection is direct. We price work by the value it creates, not the hours it consumes, and that only survives if the cost of delivery is disciplined. Allocation is that discipline. It is why the economics work at all.

## The bottleneck keeps moving

First the bottleneck was building, and the tools dissolved it. Then it was direction, and that one never dissolves, you just get better at choosing. Now, with a real meter running, it is allocation: the judgment to know what each moment of work deserves, and the restraint to give it exactly that.

The pattern underneath all three posts is the same. Every time a constraint falls, the craft moves up a level. The tools keep getting more powerful, and the human decisions keep getting more important, not less. I find that genuinely encouraging.

*(Next in this series: what the road from concept to cash flow looks like when a partner walks it with us.)*
