![originzero-brandmark](https://github.com/user-attachments/assets/6e648bc9-9179-4b3c-937e-5b8ea1ebb10c)

# OriginZero - Collaborative low-code workflow automation tool

Originzero is a collaborative low-code workflow automation tool designed to empower individuals and businesses to create their own workflows without needing any coding skills. Users can easily build workflows using a drag-and-drop method to add and connect nodes. These nodes operate concurrently (and in parallel when needed), significantly enhancing performance. 

Originzero also allows teams to create their own workspaces, enabling members to collaborate on workflows based on their permission levels. This promotes a collaborative environment where team members can work together efficiently. 

**The tool features an extendable node system, with a goal to continuously expand the number of nodes through contributions from the core team and the community.**

![Yayınla LinkedIn](https://github.com/user-attachments/assets/3225e639-b219-4e80-b48b-9e14e4a4ad7e)

## 🏁 Quick Start

Check out our [wiki page](https://github.com/originzero-io/originzero/wiki/Getting-Started) for full instructions on getting started.

1. Clone the code:
   
        git clone https://github.com/originzero-io/originzero.git
        cd originzero 

2. Install the dependencies

        npm install
3. Install [Lerna](https://lerna.js.org/docs/introduction)

        npm i -g lerna

4. Run
   
        npm start
5. Open
   
        http://localhost:5173


## 📂 Directory structure

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

## ⚒️ Requirements
1. [Node.js](https://nodejs.org/en/download/package-manager) 18 and above
2. [Typescript](https://www.typescriptlang.org/download/) 5 and above
3. [Lerna](https://lerna.js.org/docs/getting-started)
4. [Python](https://www.python.org/downloads/) 3 and above
5. [Docker](https://www.docker.com/products/docker-desktop/)
6. [Mongodb](https://www.mongodb.com/try/download/community-kubernetes-operator)

## 📚 Documentation

The official documentation can be found on [here](https://github.com/originzero-io/originzero/wiki).

For further help, or general discussion, please use the [Github discussions](https://github.com/orgs/originzero-io/discussions) or [discord server](https://discord.gg/VyQD9QAq).

## 💫 Contributing
Before raising a pull-request, please read our
[contributing guide](/CONTRIBUTING.md).

This project adheres to the [Contributor Covenant 1.4](http://contributor-covenant.org/version/1/4/).
 By participating, you are expected to uphold this code. Please report unacceptable
 behavior to any of the project's core team at info@originzero.io.

## 📋 License

This project is under [the Apache 2.0 license](LICENSE).
