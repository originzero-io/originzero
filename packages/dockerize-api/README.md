# dockerize-api

To ensure that different flows run in isolation and use system resources efficiently, each flow is given its own container when created. Every flow runs inside its own Docker container. All data related to that flow is stored in the database within that container. The container can be stopped or moved to another computer as needed. The purpose of this package is to manage this entire process.
