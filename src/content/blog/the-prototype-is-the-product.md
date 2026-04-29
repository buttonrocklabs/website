---
title: "The prototype is the product"
slug: "the-prototype-is-the-product"
date: "2026-04-29"
author: "Greg Falconer"
excerpt: "The software development process used to be the bottleneck between an idea and a useful product. Not anymore. Here's what that means for anyone trying to turn what's in their head into something real — and the new bottlenecks waiting on the other side."
readingTime: "8 min read"
---

You only have an idea.

It started as a conversation, or a frustration, or a quiet observation about the way someone you care about lives their day. Whatever it was, it now lives in your head as a hunch about a thing that could exist — a thing that, if it existed, would make a person's life a little easier, a little richer, a little more connected to the people and the work that matter to them.

The trouble has always been the gap between that hunch and a working product. So you tried to close it. Maybe you opened PowerPoint, or Canva, or Figma, and built screens that gestured at the idea without being it. Maybe you wrote a business case in a Word doc, or assembled a product requirements document for someone else to read. Maybe you spun up a Notion page and listed every feature you could imagine. Each of these is an approximation — a description of the thing rather than the thing.

And then the real work began. The product manager wrote the spec and handed it to the product owner. The product owner refined it with the business analyst. The scrum master organized the sprint. Designers mocked it up. Engineers built it. QA tested it. A few weeks later, you saw a demo and tried to figure out whether what came back resembled, even loosely, what you'd been carrying around in your head — the thing that you couldn't quite get down on paper, because the thing was about a feeling more than a feature.

That hand-off — idea to spec to backlog to sprint to demo — was the bottleneck. The whole apparatus of modern product management was invented to manage it. Agile, Scrum, two-week sprints, story points, ceremonies on every calendar. We didn't build that apparatus because it was elegant. We built it because the gap between an idea and a working product was wide and slow, and we needed a way to coordinate the small army required to cross it.

That's the thing that has shifted.

## An evolution. And a revolution.

I should explain where I'm coming from. I've spent my career around products — different industries, different team sizes, different roles up and down the stack — culminating in running a fintech as CEO. The product side of every one of those companies followed the same pattern. Ideas live in human conversations. Software gets built somewhere downstream. The gap between the two is where most of the work, most of the cost, and most of the lost meaning happens.

Last year I started a small experiment in my free time. The question I wanted to answer was simple: could a real piece of software be shipped without all of the traditional overhead? Not a prototype, not a clickable mockup — a real, running product, in front of real users. Could you do it at pace, on the side, without a team? I wasn't trying to disrupt anything. I was trying to learn.

What I learned has changed how I think about everything I've practiced over twenty-plus years.

The principles haven't changed. You still need to talk to real people. You still need to understand the human you're building for — their purpose, their intent, the texture of their day. You still need taste, judgment, and the discipline to know when something is worth shipping and when it isn't. That's the evolution. Same craft. Same fundamentals. Same care.

What's changed is the constraint. We are no longer bound by the overhead and turnaround times that have defined every product process I've ever run. The hand-off has collapsed. The idea-to-running-software gap that used to take a sprint takes an afternoon. The principles of conversation and building interactions for humans remain the same — they're just no longer captive to a process that was built around the gap. That's the revolution.

At Button Rock Labs we build apps for humans. The name is part of the point. *Button* nods at the keys and controls and small inputs that turn intention into action. *Rock* grounds it in the place we work from — Lyons, Colorado, the foothills under Button Rock Reservoir. The work is digital. The orientation is physical, present, tangible, human.

## Build the thing to see if you want the thing

For fifteen years, the standard advice has been: validate before you build. Run interviews. Send surveys. Test the prototype. Then commit to the build. That advice was correct in its time. Committing to a build was committing to months of expensive work — you wanted to be sure.

That advice is now backwards. When the cost of building drops below the cost of validating, you build to validate. You build to find out.

Here's what I've learned watching real people react to real products: people cannot tell you what they want. They will give you confident, articulate answers, and those answers will be wrong. But they know with absolute clarity what they *don't* want when they see it. They can spot the wrong tone, the wrong flow, the wrong word, the wrong color — instantly, viscerally, with no hedging.

This is the leverage. You can't extract a correct answer from a customer conversation. You can extract a correct *reaction* from a customer in front of a working thing. So put a working thing in front of them.

A software engineer once told me: *we don't roll back, we push through.* The prototype is the product. You don't throw it away when you've validated it. You weave and bounce and iterate it into the thing you ship. The line between "we're testing" and "we're live" disappears. There's just the app, getting better.

Build the thing to see if you want the thing.

## The new bottlenecks

Solving one bottleneck reveals the next one. That's not a flaw in this way of working — it's the *job*. The product manager in this era is a bottleneck hunter. You identify what's slowing you down, you build or buy a tool that removes it, and then you find the next one. This is the loop. This is how you compound.

Here are the bottlenecks I've hit so far, building real products with AI as my engineering team.

**Keeping AI on track across a growing codebase.** A green-field afternoon prototype is one thing. A four-month-old codebase with edge cases and accumulated decisions is another. Regression is real. AI will cheerfully refactor a working feature into a broken one if you let it. You need a way to track context across sessions, link work to specific items, and keep history of what was prompted, when, and why.

**AI drifting from your design system.** Every time you start a fresh session, the AI doesn't remember your color palette, your spacing rules, your typography choices. It will produce something that *looks like* a UI but isn't *your* UI. You need a way to enforce design tokens automatically, on every prompt, without having to remind the model.

**AI's bias toward "net new" over reuse.** Ask AI to add a feature, and it will write the feature from scratch. It won't notice that you already have a component that does most of the work. It won't refactor for reuse unless you push it to. The codebase grows fat, redundant, fragile. You need a way to make extension the default and creation the exception.

Each of these came from a bottleneck I hit while shipping a real product. None of them existed before because the bottlenecks didn't exist before.

There's another one worth naming.

## Estimation has a new currency

In Scrum, you estimated work in story points. The point was a proxy for human effort.

Tokens are the literal currency of AI work. The model has a context window. Big tasks have to be broken down — not because of human capacity, but because of context budget. Prompts have to be tight. Sessions have to have boundaries. State accumulates and quality degrades if you don't manage it.

The product manager who can't manage context is the new product manager who couldn't run a sprint.

This is a deeply unfamiliar skill if you came up under traditional PM training. But it's a learnable skill, and it's the highest-leverage one in the room right now. If you can decompose a project into well-scoped, context-clean prompts, you ship. If you can't, you don't.

## What AI doesn't do

I want to be honest about this part, because the breathless version of this story is wrong.

AI accelerates building. It doesn't accelerate the human side of any of it. Customer conversations still take the time they take. Stakeholder alignment still takes meetings. Trust still has to be earned the slow way. If your bottleneck is people, AI doesn't help you. You still have to do the work.

And there's a harder one. AI doesn't supply the warmth.

In a world of TikToks and shorts and infinite scroll, software has to be *lovable* to get used at all. People stay in apps that feel human. They abandon apps that feel like spec sheets. That feeling — the thing that makes someone want to open the app again tomorrow — comes from someone who actually understood the user. Their purpose. Their intent. The human reality of what they're trying to do. A thousand small choices that add up to *care*.

That's the part AI can't generate. And in an AI-native world, it's the part that matters most.

## The next bottleneck

Solve one bottleneck, the next one appears. I don't know what mine is yet. Maybe it's distribution. Maybe it's keeping the human warmth as the user base grows. Maybe it's something I haven't named.

That's the work. Not "should I use AI." Not "is Scrum dead." Those are the wrong questions. The question is: *which bottleneck am I solving today, and which one will reveal itself when I do?*

Build the thing to see if you want the thing. Push through. Find the next bottleneck. Build a tool for it. Repeat.

The prototype is the product. There's no separate product to wait for.
