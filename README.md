SWITCHBOARD

Switchboard is a terminal-based AI coding agent built with Node.js, TypeScript, and the Vercel AI SDK.

It can inspect a project, understand its codebase, plan changes, modify files through controlled tools, execute approved shell commands, and show proposed file changes before applying them.

The project was built from scratch to understand how AI coding agents work internally rather than treating the LLM as a black box.


FEATURES-

< Agent Mode >
Agent mode allows Switchboard to work on a project using AI-powered tool calling.
It can-
Inspect project files
Read source files
Search the codebase
Create files
Edit existing files
Execute approved shell commands
Stage file changes
Show a diff
Ask for approval before applying changes

< Plan Mode >
Plan mode is read-only.
It can inspect the project and produce an implementation plan without modifying files.

< Ask Mode >
Ask mode provides read-only questions and answers about the current project.
It can inspect:
Project structure
Source files
Existing implementation
Code relationships

< Safety >
Switchboard does not allow the AI to directly modify files
The modification flow is:

AI
 ↓
Tool Call
 ↓
Action Tracker
 ↓
Diff
 ↓
User Approval
 ↓
Executor
 ↓
Project File

Shell commands also pass through a command validation layer and require user approval before execution.
File paths are resolved against the project root to prevent access outside the project.


TECH STACK-

Node.js
TypeScript
Vercel AI SDK
Google Gemini
Zod
@clack/prompts
Chalk
Vitest
diff


GETTING STARTED-

1. Clone the repository
git clone <your-repository-url>
cd switchboard
2. Install dependencies
npm install
3. Configure Gemini
Create a .env file:
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
The .env file should never be committed.
4. Development mode
npm run dev
5. Production build
npm run build
6. Run the compiled application
npm start


MODES-

< Agent >
Use Agent mode when you want Switchboard to actually work on your project.
Example:
Create a reusable Button component in React and add it to the project.
Switchboard can inspect the project, propose changes, show the diff, and ask for approval before applying them.

< Plan >
Use Plan mode when you want to understand how a feature should be implemented before making changes.
Example:
How should I add authentication to this project?
Plan mode only has access to read-only project inspection tools.

< Ask >
Use Ask mode when you want to understand existing code.
Example:
How does the AI tool-calling flow work?
Ask mode is read-only.


AI PROVIDER-
Switchboard currently uses Google Gemini through @ai-sdk/google.
The application requires a valid Gemini API key and is subject to the availability and quota limits of the selected Gemini model/provider.


LEARNING GOALS-
Switchboard was built to explore the architecture behind modern AI coding agents, including-
LLM tool calling
Agent loops
Project context
Filesystem tools
Shell tools
Action staging
Approval workflows
Diff generation
Security boundaries
CLI architecture
AI SDK integration


LICENSE-
MIT