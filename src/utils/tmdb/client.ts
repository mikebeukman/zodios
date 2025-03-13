import { pluginToken } from "@zodios/plugins";
import { createApiClient } from "../../generated/client";
import { makeApi, Zodios } from "@zodios/core";
import { z } from "zod";

// Manually create your own endpoints with response types....
export async function createClientPrimitive() {
  const api = makeApi([
    {
      method: "get",
      path: "/movie/upcoming",
      alias: "movieUpcomingList",
      description: "Get a list of upcoming movies",
      response: z.array(z.object({ id: z.number() })),
    },
  ]);

  // zodios-api-shorthand can be used to shorten this definition
  // https://github.com/thelinuxlich/zodios-api-shorthand

  const clientPrimitive = new Zodios(process.env.BASE_URL!, api);
}

// Base your endppoints of an openAPI spec!!!!
// https://github.com/astahmer/openapi-zod-client
export async function createClient() {
  const client = createApiClient(process.env.BASE_URL!, {
    validate: false,
  });

  async function getToken() {
    return process.env.TMDB_READ_ACCCESS_TOKEN!;
  }

  client.use(
    pluginToken({
      getToken,
    })
  );
  return client;
}
