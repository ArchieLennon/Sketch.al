import { createClient } from "next-sanity";

const projectId = "383qwd03";
const dataset = "production";
const apiVersion = "2024-09-09";

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
})

import "server-only";

