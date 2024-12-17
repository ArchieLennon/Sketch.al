import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "383qwd03",
    dataset: "production",
  },
  server: {
    hostname: "localhost",
    port: 3333,
  },
  graphql: [{
    tag: "default",
    playground: true,
    generation: "gen3",
    nonNullDocumentFields: false,
  }],
  vite: (config) => config,
});