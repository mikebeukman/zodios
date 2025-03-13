import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const endpoints = makeApi([
  {
    method: "get",
    path: "/3/find/:external_id",
    alias: "find-by-id",
    description: `Find data by external ID&#x27;s.`,
    requestFormat: "json",
    parameters: [
      {
        name: "external_id",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "external_source",
        type: "Query",
        schema: z.enum([
          "",
          "imdb_id",
          "facebook_id",
          "instagram_id",
          "tvdb_id",
          "tiktok_id",
          "twitter_id",
          "wikidata_id",
          "youtube_id",
        ]),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        movie_results: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              backdrop_path: z.string(),
              id: z.number().int().default(0),
              title: z.string(),
              original_language: z.string(),
              original_title: z.string(),
              overview: z.string(),
              poster_path: z.string(),
              media_type: z.string(),
              genre_ids: z.array(z.number()),
              popularity: z.number().default(0),
              release_date: z.string(),
              video: z.boolean().default(true),
              vote_average: z.number().default(0),
              vote_count: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
        person_results: z.array(z.any()),
        tv_results: z.array(z.any()),
        tv_episode_results: z.array(z.any()),
        tv_season_results: z.array(z.any()),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id",
    alias: "movie-details",
    description: `Get the top level details of a movie by ID.`,
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "append_to_response",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
    ],
    response: z
      .object({
        adult: z.boolean().default(true),
        backdrop_path: z.string(),
        belongs_to_collection: z.unknown(),
        budget: z.number().int().default(0),
        genres: z.array(
          z
            .object({ id: z.number().int().default(0), name: z.string() })
            .partial()
            .passthrough()
        ),
        homepage: z.string(),
        id: z.number().int().default(0),
        imdb_id: z.string(),
        original_language: z.string(),
        original_title: z.string(),
        overview: z.string(),
        popularity: z.number().default(0),
        poster_path: z.string(),
        production_companies: z.array(
          z
            .object({
              id: z.number().int().default(0),
              logo_path: z.string(),
              name: z.string(),
              origin_country: z.string(),
            })
            .partial()
            .passthrough()
        ),
        production_countries: z.array(
          z
            .object({ iso_3166_1: z.string(), name: z.string() })
            .partial()
            .passthrough()
        ),
        release_date: z.string(),
        revenue: z.number().int().default(0),
        runtime: z.number().int().default(0),
        spoken_languages: z.array(
          z
            .object({
              english_name: z.string(),
              iso_639_1: z.string(),
              name: z.string(),
            })
            .partial()
            .passthrough()
        ),
        status: z.string(),
        tagline: z.string(),
        title: z.string(),
        video: z.boolean().default(true),
        vote_average: z.number().default(0),
        vote_count: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/account_states",
    alias: "movie-account-states",
    description: `Get the rating, watchlist and favourite status of an account.`,
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "session_id",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "guest_session_id",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        id: z.number().int().default(0),
        favorite: z.boolean().default(true),
        rated: z
          .object({ value: z.number().int().default(0) })
          .partial()
          .passthrough(),
        watchlist: z.boolean().default(true),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/alternative_titles",
    alias: "movie-alternative-titles",
    description: `Get the alternative titles for a movie.`,
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "country",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        id: z.number().int().default(0),
        titles: z.array(
          z
            .object({
              iso_3166_1: z.string(),
              title: z.string(),
              type: z.string(),
            })
            .partial()
            .passthrough()
        ),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/changes",
    alias: "movie-changes",
    description: `Get the recent changes for a movie.`,
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "end_date",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "start_date",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        changes: z.array(
          z
            .object({
              key: z.string(),
              items: z.array(
                z
                  .object({
                    id: z.string(),
                    action: z.string(),
                    time: z.string(),
                    iso_639_1: z.string(),
                    iso_3166_1: z.string(),
                    value: z
                      .object({
                        poster: z
                          .object({ file_path: z.string() })
                          .partial()
                          .passthrough(),
                      })
                      .partial()
                      .passthrough(),
                  })
                  .partial()
                  .passthrough()
              ),
            })
            .partial()
            .passthrough()
        ),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/credits",
    alias: "movie-credits",
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
    ],
    response: z
      .object({
        id: z.number().int().default(0),
        cast: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              gender: z.number().int().default(0),
              id: z.number().int().default(0),
              known_for_department: z.string(),
              name: z.string(),
              original_name: z.string(),
              popularity: z.number().default(0),
              profile_path: z.string(),
              cast_id: z.number().int().default(0),
              character: z.string(),
              credit_id: z.string(),
              order: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
        crew: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              gender: z.number().int().default(0),
              id: z.number().int().default(0),
              known_for_department: z.string(),
              name: z.string(),
              original_name: z.string(),
              popularity: z.number().default(0),
              profile_path: z.string(),
              credit_id: z.string(),
              department: z.string(),
              job: z.string(),
            })
            .partial()
            .passthrough()
        ),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/external_ids",
    alias: "movie-external-ids",
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z
      .object({
        id: z.number().int().default(0),
        imdb_id: z.string(),
        wikidata_id: z.unknown(),
        facebook_id: z.string(),
        instagram_id: z.unknown(),
        twitter_id: z.unknown(),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/images",
    alias: "movie-images",
    description: `Get the images that belong to a movie.`,
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "include_image_language",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        backdrops: z.array(
          z
            .object({
              aspect_ratio: z.number().default(0),
              height: z.number().int().default(0),
              iso_639_1: z.unknown(),
              file_path: z.string(),
              vote_average: z.number().default(0),
              vote_count: z.number().int().default(0),
              width: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
        id: z.number().int().default(0),
        logos: z.array(
          z
            .object({
              aspect_ratio: z.number().default(0),
              height: z.number().int().default(0),
              iso_639_1: z.string(),
              file_path: z.string(),
              vote_average: z.number().default(0),
              vote_count: z.number().int().default(0),
              width: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
        posters: z.array(
          z
            .object({
              aspect_ratio: z.number().default(0),
              height: z.number().int().default(0),
              iso_639_1: z.string(),
              file_path: z.string(),
              vote_average: z.number().default(0),
              vote_count: z.number().int().default(0),
              width: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/keywords",
    alias: "movie-keywords",
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z
      .object({
        id: z.number().int().default(0),
        keywords: z.array(
          z
            .object({ id: z.number().int().default(0), name: z.string() })
            .partial()
            .passthrough()
        ),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/lists",
    alias: "movie-lists",
    description: `Get the lists that a movie has been added to.`,
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
    ],
    response: z
      .object({
        id: z.number().int().default(0),
        page: z.number().int().default(0),
        results: z.array(
          z
            .object({
              description: z.string(),
              favorite_count: z.number().int().default(0),
              id: z.number().int().default(0),
              item_count: z.number().int().default(0),
              iso_639_1: z.string(),
              list_type: z.string(),
              name: z.string(),
              poster_path: z.unknown(),
            })
            .partial()
            .passthrough()
        ),
        total_pages: z.number().int().default(0),
        total_results: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/recommendations",
    alias: "movie-recommendations",
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
    ],
    response: z.object({}).partial().passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/release_dates",
    alias: "movie-release-dates",
    description: `Get the release dates and certifications for a movie.`,
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z
      .object({
        id: z.number().int().default(0),
        results: z.array(
          z
            .object({
              iso_3166_1: z.string(),
              release_dates: z.array(
                z
                  .object({
                    certification: z.string(),
                    descriptors: z.array(z.any()),
                    iso_639_1: z.string(),
                    note: z.string(),
                    release_date: z.string(),
                    type: z.number().int().default(0),
                  })
                  .partial()
                  .passthrough()
              ),
            })
            .partial()
            .passthrough()
        ),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/reviews",
    alias: "movie-reviews",
    description: `Get the user reviews for a movie.`,
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
    ],
    response: z
      .object({
        id: z.number().int().default(0),
        page: z.number().int().default(0),
        results: z.array(
          z
            .object({
              author: z.string(),
              author_details: z
                .object({
                  name: z.string(),
                  username: z.string(),
                  avatar_path: z.string(),
                  rating: z.unknown(),
                })
                .partial()
                .passthrough(),
              content: z.string(),
              created_at: z.string(),
              id: z.string(),
              updated_at: z.string(),
              url: z.string(),
            })
            .partial()
            .passthrough()
        ),
        total_pages: z.number().int().default(0),
        total_results: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/similar",
    alias: "movie-similar",
    description: `Get the similar movies based on genres and keywords.`,
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
    ],
    response: z
      .object({
        page: z.number().int().default(0),
        results: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              backdrop_path: z.string(),
              genre_ids: z.array(z.number()),
              id: z.number().int().default(0),
              original_language: z.string(),
              original_title: z.string(),
              overview: z.string(),
              popularity: z.number().default(0),
              poster_path: z.string(),
              release_date: z.string(),
              title: z.string(),
              video: z.boolean().default(true),
              vote_average: z.number().default(0),
              vote_count: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
        total_pages: z.number().int().default(0),
        total_results: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/translations",
    alias: "movie-translations",
    description: `Get the translations for a movie.`,
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z
      .object({
        id: z.number().int().default(0),
        translations: z.array(
          z
            .object({
              iso_3166_1: z.string(),
              iso_639_1: z.string(),
              name: z.string(),
              english_name: z.string(),
              data: z
                .object({
                  homepage: z.string(),
                  overview: z.string(),
                  runtime: z.number().int().default(0),
                  tagline: z.string(),
                  title: z.string(),
                })
                .partial()
                .passthrough(),
            })
            .partial()
            .passthrough()
        ),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/:movie_id/videos",
    alias: "movie-videos",
    requestFormat: "json",
    parameters: [
      {
        name: "movie_id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
    ],
    response: z
      .object({
        id: z.number().int().default(0),
        results: z.array(
          z
            .object({
              iso_639_1: z.string(),
              iso_3166_1: z.string(),
              name: z.string(),
              key: z.string(),
              site: z.string(),
              size: z.number().int().default(0),
              type: z.string(),
              official: z.boolean().default(true),
              published_at: z.string(),
              id: z.string(),
            })
            .partial()
            .passthrough()
        ),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/latest",
    alias: "movie-latest-id",
    description: `Get the newest movie ID.`,
    requestFormat: "json",
    response: z
      .object({
        adult: z.boolean().default(true),
        backdrop_path: z.unknown(),
        belongs_to_collection: z.unknown(),
        budget: z.number().int().default(0),
        genres: z.array(z.any()),
        homepage: z.string(),
        id: z.number().int().default(0),
        imdb_id: z.unknown(),
        original_language: z.string(),
        original_title: z.string(),
        overview: z.string(),
        popularity: z.number().int().default(0),
        poster_path: z.unknown(),
        production_companies: z.array(z.any()),
        production_countries: z.array(z.any()),
        release_date: z.string(),
        revenue: z.number().int().default(0),
        runtime: z.number().int().default(0),
        spoken_languages: z.array(z.any()),
        status: z.string(),
        tagline: z.string(),
        title: z.string(),
        video: z.boolean().default(true),
        vote_average: z.number().int().default(0),
        vote_count: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/now_playing",
    alias: "movie-now-playing-list",
    description: `Get a list of movies that are currently in theatres.`,
    requestFormat: "json",
    parameters: [
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "region",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        dates: z
          .object({ maximum: z.string(), minimum: z.string() })
          .partial()
          .passthrough(),
        page: z.number().int().default(0),
        results: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              backdrop_path: z.string(),
              genre_ids: z.array(z.number()),
              id: z.number().int().default(0),
              original_language: z.string(),
              original_title: z.string(),
              overview: z.string(),
              popularity: z.number().default(0),
              poster_path: z.string(),
              release_date: z.string(),
              title: z.string(),
              video: z.boolean().default(true),
              vote_average: z.number().default(0),
              vote_count: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
        total_pages: z.number().int().default(0),
        total_results: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/popular",
    alias: "movie-popular-list",
    description: `Get a list of movies ordered by popularity.`,
    requestFormat: "json",
    parameters: [
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "region",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        page: z.number().int().default(0),
        results: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              backdrop_path: z.string(),
              genre_ids: z.array(z.number()),
              id: z.number().int().default(0),
              original_language: z.string(),
              original_title: z.string(),
              overview: z.string(),
              popularity: z.number().default(0),
              poster_path: z.string(),
              release_date: z.string(),
              title: z.string(),
              video: z.boolean().default(true),
              vote_average: z.number().default(0),
              vote_count: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
        total_pages: z.number().int().default(0),
        total_results: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/top_rated",
    alias: "movie-top-rated-list",
    description: `Get a list of movies ordered by rating.`,
    requestFormat: "json",
    parameters: [
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "region",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        page: z.number().int().default(0),
        results: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              backdrop_path: z.string(),
              genre_ids: z.array(z.number()),
              id: z.number().int().default(0),
              original_language: z.string(),
              original_title: z.string(),
              overview: z.string(),
              popularity: z.number().default(0),
              poster_path: z.string(),
              release_date: z.string(),
              title: z.string(),
              video: z.boolean().default(true),
              vote_average: z.number().default(0),
              vote_count: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
        total_pages: z.number().int().default(0),
        total_results: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/movie/upcoming",
    alias: "movieUpcomingList",
    description: `Get a list of movies that are being released soon.`,
    requestFormat: "json",
    parameters: [
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional().default(1),
      },
      {
        name: "region",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        dates: z
          .object({ maximum: z.string(), minimum: z.string() })
          .partial()
          .passthrough(),
        page: z.number().int().default(0),
        results: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              backdrop_path: z.string(),
              genre_ids: z.array(z.number()),
              id: z.number().int().default(0),
              original_language: z.string(),
              original_title: z.string(),
              overview: z.string(),
              popularity: z.number().default(0),
              poster_path: z.string(),
              release_date: z.string(),
              title: z.string(),
              video: z.boolean().default(true),
              vote_average: z.number().int().default(0),
              vote_count: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
        total_pages: z.number().int().default(0),
        total_results: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/trending/all/:time_window",
    alias: "trending-all",
    description: `Get the trending movies, TV shows and people.`,
    requestFormat: "json",
    parameters: [
      {
        name: "time_window",
        type: "Path",
        schema: z.enum(["day", "week"]).default("day"),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
    ],
    response: z
      .object({
        page: z.number().int().default(0),
        results: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              backdrop_path: z.string(),
              id: z.number().int().default(0),
              title: z.string(),
              original_language: z.string(),
              original_title: z.string(),
              overview: z.string(),
              poster_path: z.string(),
              media_type: z.string(),
              genre_ids: z.array(z.number()),
              popularity: z.number().default(0),
              release_date: z.string(),
              video: z.boolean().default(true),
              vote_average: z.number().default(0),
              vote_count: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
        total_pages: z.number().int().default(0),
        total_results: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/trending/movie/:time_window",
    alias: "trending-movies",
    description: `Get the trending movies on TMDB.`,
    requestFormat: "json",
    parameters: [
      {
        name: "time_window",
        type: "Path",
        schema: z.enum(["day", "week"]).default("day"),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
    ],
    response: z
      .object({
        page: z.number().int().default(0),
        results: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              backdrop_path: z.string(),
              id: z.number().int().default(0),
              title: z.string(),
              original_language: z.string(),
              original_title: z.string(),
              overview: z.string(),
              poster_path: z.string(),
              media_type: z.string(),
              genre_ids: z.array(z.number()),
              popularity: z.number().default(0),
              release_date: z.string(),
              video: z.boolean().default(true),
              vote_average: z.number().default(0),
              vote_count: z.number().int().default(0),
            })
            .partial()
            .passthrough()
        ),
        total_pages: z.number().int().default(0),
        total_results: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/trending/person/:time_window",
    alias: "trending-people",
    description: `Get the trending people on TMDB.`,
    requestFormat: "json",
    parameters: [
      {
        name: "time_window",
        type: "Path",
        schema: z.enum(["day", "week"]).default("day"),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
    ],
    response: z
      .object({
        page: z.number().int().default(0),
        results: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              id: z.number().int().default(0),
              name: z.string(),
              original_name: z.string(),
              media_type: z.string(),
              popularity: z.number().default(0),
              gender: z.number().int().default(0),
              known_for_department: z.string(),
              profile_path: z.string(),
              known_for: z.array(
                z
                  .object({
                    adult: z.boolean().default(true),
                    backdrop_path: z.string(),
                    id: z.number().int().default(0),
                    title: z.string(),
                    original_language: z.string(),
                    original_title: z.string(),
                    overview: z.string(),
                    poster_path: z.string(),
                    media_type: z.string(),
                    genre_ids: z.array(z.number()),
                    popularity: z.number().default(0),
                    release_date: z.string(),
                    video: z.boolean().default(true),
                    vote_average: z.number().default(0),
                    vote_count: z.number().int().default(0),
                  })
                  .partial()
                  .passthrough()
              ),
            })
            .partial()
            .passthrough()
        ),
        total_pages: z.number().int().default(0),
        total_results: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/3/trending/tv/:time_window",
    alias: "trending-tv",
    description: `Get the trending TV shows on TMDB.`,
    requestFormat: "json",
    parameters: [
      {
        name: "time_window",
        type: "Path",
        schema: z.enum(["day", "week"]).default("day"),
      },
      {
        name: "language",
        type: "Query",
        schema: z.string().optional().default("en-US"),
      },
    ],
    response: z
      .object({
        page: z.number().int().default(0),
        results: z.array(
          z
            .object({
              adult: z.boolean().default(true),
              backdrop_path: z.string(),
              id: z.number().int().default(0),
              name: z.string(),
              original_language: z.string(),
              original_name: z.string(),
              overview: z.string(),
              poster_path: z.string(),
              media_type: z.string(),
              genre_ids: z.array(z.number()),
              popularity: z.number().default(0),
              first_air_date: z.string(),
              vote_average: z.number().default(0),
              vote_count: z.number().int().default(0),
              origin_country: z.array(z.string()),
            })
            .partial()
            .passthrough()
        ),
        total_pages: z.number().int().default(0),
        total_results: z.number().int().default(0),
      })
      .partial()
      .passthrough(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
