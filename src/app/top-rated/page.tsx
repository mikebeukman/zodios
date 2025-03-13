import { createClient } from "@/utils/tmdb/client";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const client = await createClient();
  let movies;

  try {
    movies = await client["movie-top-rated-list"]().then((res) => res.results);
  } catch (e) {
    console.error(e);
    return null;
  }

  return (
    <main className="h-screen w-full flex relative flex-col bg-black">
      <div className="py-4 bg-black/90 w-full justify-center flex sticky z-20 top-0">
        <h1 className="text-white font-bold text-2xl">Top rated movies</h1>
      </div>
      <div className="flex">
        <div className="w-[400px] h-screen [&_*]:text-white flex flex-col items-center py-8 gap-y-8">
          <Link
            className="font-semibold text-lg border-b-2 border-transparent hover:border-white transition-all duration-300"
            href="/"
          >
            Upcoming movies -&gt;
          </Link>
          <Link
            className="font-semibold text-lg border-b-2 border-transparent hover:border-white transition-all duration-300"
            href="/popular"
          >
            Popular movies -&gt;
          </Link>
          <Link
            className="font-semibold text-lg border-b-2 border-transparent hover:border-white transition-all duration-300"
            href="/top-rated"
          >
            Top rated movies -&gt;
          </Link>
        </div>

        <div className="grid w-full grid-cols-4">
          {movies?.map((movie) => (
            <Link
              href={`/${movie.id}`}
              key={crypto.randomUUID()}
              className="col-span-1 relative bg-gray-200 aspect-square"
            >
              <Image
                className="size-full object-cover"
                alt=""
                src={`${process.env.POSTER_PATH}${movie.backdrop_path}`}
                width={300}
                height={300}
              />
              <div className="absolute group z-10 inset-0 p-4 flex flex-col gap-y-2 size-full hover:bg-black/50 duration-300 transition">
                <h2 className="text-transparent uppercase font-semibold group-hover:text-white transition duration-500">
                  {movie.original_title}
                </h2>
                <p className="text-transparent font-light text-sm group-hover:text-white transition duration-500">
                  {movie.release_date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
