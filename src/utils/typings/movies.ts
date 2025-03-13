import {
  ApiOf,
  Zodios,
  ZodiosErrorByAlias,
  ZodiosQueryParamsByAlias,
  ZodiosResponseByAlias,
} from "@zodios/core";
import { createClient } from "../tmdb/client";

const client = await createClient();

type Api = ApiOf<typeof client>;

type UpcomingMovies = ZodiosResponseByAlias<Api, "movieUpcomingList">;

type UpcomingMoviesQueryParams = ZodiosQueryParamsByAlias<
  Api,
  "movieUpcomingList"
>;

// OpenAPI heeft geen error response
type UpcomingMoviesErrors = ZodiosErrorByAlias<Api, "movieUpcomingList", 500>;
