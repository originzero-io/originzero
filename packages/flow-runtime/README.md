# /flow-runtime

The core component for running Originzero flows. When a Docker container is started for each flow, a flow-runtime service is launched inside that container alongside a MongoDB service. This service is responsible for managing the database communication of flow elements (nodes and edges) and ensuring the entire flow algorithm runs correctly and concurrently.
