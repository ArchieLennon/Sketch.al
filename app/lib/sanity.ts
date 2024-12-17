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

// import { createClient, type QueryParams } from "next-sanity";


// export const client = createClient({
//   projectId: "383qwd03",
//   dataset: "production",
//   apiVersion: "2024-01-01",
//   useCdn: false,
//   perspective:'published',
// });

// export async function sanityFetch<const QueryString extends string>({
//   query,
//   params = {},
//   tags,
// }: {
//   query: QueryString;
//   params?: QueryParams;
//   tags?: string[];
// }) {
//   return client.fetch(query, params, {
//     next: {
//       revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
//       tags,
//     },
//   });
// }

