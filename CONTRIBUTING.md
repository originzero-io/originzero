# Contributing to Originzero

Hello and welcome! We're thrilled that you're considering contributing to Originzero ✨. Here's a guide on how you can get involved with the project.

## Table of Contents

- [Contributing to Originzero](#contributing-to-originzero)
  - [Table of Contents](#table-of-contents)
  - [Our Contribution Philosophy](#our-contribution-philosophy)
  - [Ways You Can Help](#ways-you-can-help)
    - [Enhancements](#enhancements)
    - [Get in Touch](#get-in-touch)
  - [Directory structure](#directory-structure)
  - [Pull Requests](#pull-requests)
    - [Branching Strategy](#branching-strategy)
    - [Coding Standards](#coding-standards)

## Our Contribution Philosophy

The core team leads the direction of Originzero, deciding which features to add and which to leave out. While we guide the project, we're always open to fresh ideas and discussions. We want to hear your thoughts, and we encourage everyone to share their perspectives.

We make sure that contributions align with the project's goals so that your efforts are meaningful and the application stays on track. We don't want anyone's hard work to go to waste, and we aim to keep the app focused and efficient.

As a token of our appreciation, contributors will have lifetime access to the application for free, no matter how it evolves in the future. We’ll also give credit where it's due by featuring contributor names in our repository.

Contributing isn't just about writing code. Helping to spread the word about Originzero and participating in discussions about new ideas are also incredibly valuable. We believe that bringing more people into the conversation and exploring new concepts together are just as important as coding itself.

**We especially need help with creating nodes. If you’re interested in building nodes or improving the node-writing system, we’d love your support. Contributors in this area will be recognized both on GitHub and in the application’s node list, highlighting their important role in the project.**

Your contributions, whether through coding, brainstorming, or sharing the project with others, are what help Originzero grow. We're glad to have you with us on this journey!

## Ways You Can Help

Here are some of the key areas where you can contribute to the application and its community:

**🐛 Report Bugs**: We can't catch every issue. Please check the [existing issues](https://github.com/originzero-io/originzero/issues) and discussions before [creating a new one](https://github.com/originzero-io/originzero/issues/new/choose).

**💬 Answer Questions**: Engage with the community on our [Discord Server](https://discord.gg/VyQD9QAq) and in [GitHub discussions](https://github.com/orgs/originzero-io/discussions).

🎬 **Create Tutorials**: Share your tutorials with us, and we’ll be happy to promote them!

All interactions should be conducted respectfully, adhering to our [Code of Conduct](https://github.com/originzero-io/originzero/blob/main/CODE_OF_CONDUCT.md).

### Enhancements

If you have ideas for improving Originzero, please contribute them to the [New Features](https://github.com/orgs/originzero-io/discussions/categories/new-features) discussion section. If you plan on implementing the enhancement yourself, **please reach out before starting a pull request.** Discussions about the future of Originzero and potential new features occur on our Discord Server and in GitHub discussions, with final decisions made by the core team.

Discussing your enhancement idea with us first is the best way to ensure your pull request gets merged into the application (refer to Our Contribution Philosophy above). We want to avoid situations where you spend time writing code that may already be in development or may not align with the application's goals.

### Get in Touch

For enhancement suggestions, feel free to email us at info@originzero.io.

# Directory structure

Originzero is split up in different modules which are all in a single mono repository.

The most important directories:

- [/packages](/packages) - All originzero modules
- [/packages/editor](/packages/editor) - React frontend components
- [/packages/api-gateway](/packages/api-gateway) - Central api gateway to access all APIs safely and efficiently
- [/packages/entity-api](/packages/entity-api) - All entities like workspaces, projects, flows, users, etc.
- [/packages/flow-runtime](/packages/flow-runtime) - Runtime algorithm that handles flow execution, concurrency, and parallelism, and also includes nodes.
  - **Contact us before starting on any changes here**
- [/packages/dockerize-api](/packages/dockerize-api) - A package that creates a container for each flow created
- [/packages/math-service](/packages/math-service) - Allows the Calculate node to handles complex mathematical operations

## Pull Requests

If you wish to contribute by adding new features, improvements, or refactoring existing code, please discuss your ideas with us first. You can reach out via GitHub discussions, our Discord server, or email us at info@originzero.dev. This ensures your time and effort align with the project goals. We're eager to review your pull requests and collaborate with you 😊.

## Branching Strategy

We follow a structured branching model to manage contributions effectively. Please follow these guidelines when contributing to the project:

### Main Branches

- `main`: This branch contains the production-ready code. Only thoroughly tested and approved changes should be merged here.
- `develop`: This is the active development branch where new features and improvements are integrated and tested.

### Supporting Branches

- **Feature Branches** (`feature/`): Use for adding new features. Name your branch as `feature/your-feature-name`. Example: `feature/add-user-auth`.
- **Fix Branches** (`fix/`): Use for fixing bugs. Name your branch as `fix/issue-description`. Example: `fix/typo-in-docs`.
- **Refactor Branches** (`refactor/`): Use for code improvements or reorganizing code. Name your branch as `refactor/your-refactor-name`. Example: `refactor/improve-query-performance`.
- **Chore Branches** (`chore/`): Use for maintenance tasks or configuration changes. Example: `chore/update-dependencies`.
- **Style Branches** (`style/`): Use for code style improvements. Example: `style/fix-lint-errors`.

### Release and Hotfix Branches

- **Release Branches** (`release/`): Use for preparing a new production release. Example: `release/v1.2.0`.
- **Hotfix Branches** (`hotfix/`): Use for quick fixes on production code. Example: `hotfix/critical-bug-fix`.

### Branch Workflow

1. Create a new branch from `develop`.
2. Work on your changes and commit regularly.
3. Open a Pull Request (PR) to `develop`.
4. Ensure all tests pass and request a code review.
5. Once approved, the PR will be merged into `develop` for testing. When ready for release, it will be merged into `main`.

Following this branching strategy helps maintain a clean and organized codebase and ensures smooth collaboration.

## Coding Standards

Please make sure to follow the coding standards used throughout the codebase. Here are some basic guidelines:

- All files must include the Apache license in the header.
- Use 4 spaces for indentation, not tabs.
- Place the opening brace on the same line as `if`/`for`/`function`, and the closing brace on a new line.
