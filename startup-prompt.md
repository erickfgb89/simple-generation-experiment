# OpenSearch Document Complexity Analyzer - Single Page TypeScript Application

Create a beautiful, interactive single-page TypeScript application that analyzes JSON documents against OpenSearch's indexing algorithm to predict resource usage and complexity.

## Core Requirements

### Primary Functionality

- **Document Input**: Accept arbitrary JSON documents via an intuitive form interface
- **Analysis Engine**: Implement analysis logic based on OpenSearch's actual indexing behavior
- **Scoring System**: Generate two key metrics:
  - **Index Size Score**: Predicted storage requirements
  - **Complexity Score**: Processing overhead assessment
- **Visual Reporting**: Present results with compelling charts, tables, and visualizations

### Analysis Foundation

Your analysis must be grounded in OpenSearch's real indexing logic. Use one or more of these approaches:

1. **Source Code Analysis**: Study OpenSearch's open-source indexing code to understand field processing, mapping inference, and storage calculations
2. **Live Instance Analysis**: Connect to a local OpenSearch instance to analyze indexing metadata and behavior
3. **Documentation Deep-dive**: Thoroughly research OpenSearch documentation on field types, analyzers, mappings, and resource usage

### Technical Implementation

- **Framework**: Use modern TypeScript with your preferred framework (React, Vue, Svelte, etc.)
- **Visualization**: Implement charts and graphs that clearly illustrate complexity sources
- **Responsive Design**: Ensure the interface works beautifully on desktop and mobile
- **Real-time Analysis**: Process documents and update visualizations dynamically

### User Experience Goals

- **Visual Appeal**: Create a vibrant, colorful interface that "pops"
- **Intuitive Form**: Design an easy-to-use document input system
- **Clear Insights**: Users should understand exactly how their document will consume server resources
- **Educational Value**: Help users learn about OpenSearch indexing through the analysis

## Recommended Approach

Consider using **Claude agents** to tackle this complex project efficiently:

1. **Research Agent**: Have an agent dive deep into OpenSearch documentation and source code to understand indexing algorithms
2. **Analysis Agent**: Create an agent to design and implement the scoring algorithms based on research findings
3. **UI/UX Agent**: Use an agent to design and build the attractive, responsive interface
4. **Visualization Agent**: Employ an agent to create compelling charts and data representations

You can activate specialized agents by asking Claude to use the Task tool with specific agent types, or by requesting help with agent activation and configuration.

## Success Criteria

- Accurate scoring based on legitimate OpenSearch indexing logic
- Beautiful, engaging user interface with vibrant colors
- Clear visualizations that explain complexity sources
- Educational value that helps users optimize their documents
- Professional-quality code ready for production use

## Project Planning & Agent Coordination

After the initial research phase, create a comprehensive **project-plan.md** document that structures the work into milestones:

### Milestone Structure

Each milestone should include:

- **Objective**: Clear description of what needs to be accomplished
- **Dependencies**: Which milestones must be completed first
- **Assigned Agent**: Which specialized agent should handle this milestone
- **Deliverables**: Specific files/components that will be created
- **Success Criteria**: How to verify the milestone is complete

### Parallel Processing Strategy

Design milestones to maximize parallel execution:

- Independent milestones can run simultaneously
- Dependent milestones wait for their prerequisites
- Each agent focuses on their specialized area

### Example Milestone Format

```markdown
## Milestone 3: Analysis Engine Core

- **Dependencies**: Milestone 1 (Research Complete)
- **Agent**: general-purpose
- **Objective**: Implement scoring algorithms based on research findings
- **Deliverables**:
  - `src/analysis/scoring.ts`
  - `src/analysis/complexity-calculator.ts`
- **Success Criteria**: Accurate scoring that reflects OpenSearch indexing behavior
```

## Progress Tracking

Create a **progress.md** document to track milestone completion and maintain continuity across sessions:

### Progress Document Format

```markdown
# OpenSearch Analyzer - Project Progress

## Overall Status: [Planning/Development/Testing/Complete]

Last Updated: [Date/Time]

## Completed Milestones

- [x] Milestone 1: Research Complete (Agent: general-purpose) - [Date]
- [x] Milestone 2: Project Setup (Agent: general-purpose) - [Date]

## In Progress

- [ ] Milestone 3: Analysis Engine Core (Agent: general-purpose) - Started [Date]

## Pending Milestones

- [ ] Milestone 4: UI Framework Setup (Agent: general-purpose)
- [ ] Milestone 5: Visualization Components (Agent: general-purpose)

## Notes & Blockers

- Research findings: [Key insights from OpenSearch analysis]
- Technical decisions: [Framework choices, architecture decisions]
- Blockers: [Any issues preventing progress]

## Next Steps

1. [Immediate next action]
2. [Following priority]
```

### Session Continuity

- Update progress.md after each milestone completion
- Document key decisions and findings
- Note any blockers or technical debt
- Always check progress.md when resuming work

## Getting Started

1. **Research Agent**: Start with comprehensive OpenSearch research
2. **Planning**: Create detailed milestone plan based on research findings
3. **Progress Setup**: Initialize progress.md for tracking
4. **Parallel Execution**: Launch multiple agents on independent milestones
5. **Integration**: Combine all components into final application
