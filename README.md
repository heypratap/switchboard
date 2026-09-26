# Switchboard

> A TypeScript-based AI coding agent that helps you understand, plan, and modify software projects directly from the terminal.

Switchboard is an AI-powered CLI developer assistant currently being built from the ground up with Node.js and TypeScript.

The goal is to create a developer tool that can understand a codebase, reason about changes, use development tools, and safely apply modifications with user approval.

## 🚧 Project Status

**Early development**

The CLI foundation is currently implemented. Agent, Plan, and Ask modes are being built incrementally.

## ✨ Planned Capabilities

### Agent

Use AI to work directly with a codebase.

* Read files
* Create files
* Modify files
* Delete files
* Search the codebase
* Execute approved shell commands
* Track proposed changes
* Review diffs
* Approve or reject changes

### Plan

Turn a high-level development request into an actionable implementation plan.

```text
User request
     ↓
Project analysis
     ↓
Research
     ↓
Implementation plan
     ↓
User selects steps
     ↓
Execution
```

### Ask

Understand an existing codebase without modifying it.

Examples:

```text
Why is this component re-rendering?

Where is authentication handled?

How does data flow through this application?

Why is this API request failing?
```

## 🏗️ Architecture

The project is being designed around a modular architecture:

```text
                    Switchboard
                         │
                      CLI
                         │
          ┌──────────────┼──────────────┐
          │              │              │
        Agent           Plan           Ask
          │              │              │
          └──────────────┼──────────────┘
                         │
                      AI Model
                         │
                    Tool Calling
                         │
          ┌──────────────┼──────────────┐
          │              │              │
      File Tools      Search        Shell
          │              │              │
          └──────────────┼──────────────┘
                         │
                  Action Tracker
                         │
                  Diff / Approval
                         │
                    File System
```

## 🛠️ Tech Stack

* Node.js
* TypeScript
* Commander
* Clack
* Chalk
* Figlet
* Vercel AI SDK
* Zod
* OpenRouter
* Firecrawl

Additional technologies will be introduced as the project evolves.

## 📁 Current Structure

```text
src/
├── index.ts
├── cli.ts
│
├── agent/
│   └── index.ts
│
├── plan/
│   └── index.ts
│
└── ask/
    └── index.ts
```

## 🚀 Getting Started

### Prerequisites

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd switchboard
```

Install dependencies:

```bash
npm install
```

Run the CLI:

```bash
npx tsx src/index.ts
```

Type-check the project:

```bash
npx tsc --noEmit
```

## 🧪 Current CLI

The current CLI provides three development modes:

```text
Agent
Plan
Ask
Exit
```

The modes are currently being implemented incrementally.

## 🗺️ Roadmap

* [x] Node.js + TypeScript setup
* [x] CLI foundation
* [x] Interactive main menu
* [x] Agent / Plan / Ask module structure
* [ ] Project context detection
* [ ] File system tools
* [ ] Code search
* [ ] Shell execution tool
* [ ] AI model integration
* [ ] AI tool calling
* [ ] Agent mode
* [ ] Action tracking
* [ ] Diff viewer
* [ ] Approval system
* [ ] Plan mode
* [ ] Ask mode
* [ ] Security and permission controls
* [ ] CLI packaging
* [ ] Documentation and examples

## 🎯 Project Goal

Switchboard is being built as a practical exploration of how AI coding agents work internally.

The project focuses on understanding the systems behind an AI developer tool rather than simply wrapping an LLM in a chat interface.

## 📄 License

License will be added as the project approaches its first stable release.
