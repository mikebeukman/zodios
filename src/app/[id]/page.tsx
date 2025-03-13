import { Button } from "@/components/Actions/Button";
import { createClient } from "@/utils/tmdb/client";
import parse from "html-react-parser";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: Params }) {
  const client = await createClient();
  const id = params.id;
  let data;

  try {
    data = await client["movie-details"]({ params: { movie_id: id } }).then(
      (res) => res
    );
  } catch (e) {
    console.error(e);
    return [];
  }

  console.log(data);

  return (
    <div className="relative h-screen">
      <div className="size-full bg-black/40 z-10 absolute">
        <div className="max-w-[900px] absolute flex flex-col p-8 [&_*]:text-white gap-y-4">
          <Button label="&lt;- Terug" />
          <div className="flex flex-col gap-y-2">
            <h1 className="text-[92px] uppercase font-bold leading-none w-fit">
              {data.original_title}
            </h1>

            <p>{data.release_date}</p>
          </div>

          <div className="flex gap-x-4">
            {data.genres?.map((genre) => (
              <p className="!text-white/70" key={genre.id}>
                {genre.name}
              </p>
            ))}
          </div>
          {data.overview && <div>{parse(data.overview)}</div>}
          <Link
            className="text-md font-bold hover:border-white border-b-2 border-transparent w-fit transition-all"
            href={`${process.env.IMDB_TITLE_PATH}/${data.imdb_id}`}
          >
            Meer info op IMDB -&gt;
          </Link>
        </div>
      </div>
      <Image
        className="size-full object-cover"
        alt=""
        src={`${process.env.POSTER_PATH}${data.backdrop_path}`}
        width={300}
        height={300}
      />
    </div>
  );
}
