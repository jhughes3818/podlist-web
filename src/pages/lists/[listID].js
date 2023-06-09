import supabase from "../../../utils/supabase";
import Head from "next/head";

export default function List({ listItems, listTitle, episodeTitles }) {
  return (
    <>
      <Head>
        <title>{listTitle}</title>
        <meta name="description" content={listTitle} />
        <meta property="og:title" content={listTitle} />
        <meta property="og:description" content={episodeTitles} />
        <meta property="og:image" content={listItems[0].image} />
        <meta property="og:url" content={listItems[0].spotifyURL} />
        <meta property="twiter:title" content={listTitle} />
        <meta property="twiter:description" content={episodeTitles} />
        <meta property="twiter:image" content={listItems[0].image} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Podlist" />
        <meta property="og:locale" content="en_US" />
        <link rel="icon" href="https://fav.farm/🔥" />
      </Head>
      <div className="grid place-items-center ">
        <h1 className="text-3xl font-bold mb-7">{listTitle}</h1>
        <div className="flex flex-col gap-3">
          {listItems.map((item, index) => {
            const link = `/episode/${item.id}`;

            return (
              <div className="flex flex-row">
                <div className="w-max border-2 border-black flex flex-row rounded-md">
                  <img src={item.image} className="h-52 w-52 rounded-s-md " />
                  <div className="h-52">
                    <h1 className="font-bold text-lg w-96 px-4 max-h-32 overflow-hidden line-clamp-4">
                      {item.title}
                    </h1>
                    <h1 className="text-sm text-gray-600 truncate w-96 px-4">
                      {item.description}
                    </h1>
                    <div className="flex flex-row gap-2">
                      <div className="w-max rounded-md border-2 border-black px-2 py-1 ml-4">
                        <a href={item.spotifyURL || null}>
                          <div>
                            <img
                              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
                              className="h-5"
                            ></img>
                          </div>
                        </a>
                      </div>
                      {item.appleURL && (
                        <div className="w-max rounded-md border-2 border-black px-2 py-1">
                          <a href={item.appleURL || null}>
                            <div className="flex flex-row items-center">
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Podcasts_%28iOS%29.svg/1920px-Podcasts_%28iOS%29.svg.png"
                                className="h-5"
                              ></img>
                              <div className="ml-2">
                                {/* <p className="text-xs text-gray-500 mb-0 p-0 leading-none font-semibold">
                                Listen on
                              </p> */}
                                <p className="text-sm font-bold mt-0 p-0 leading-none">
                                  Apple Podcasts
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* <EpisodeCard id={item.id} /> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { listID } = context.query;

  const { data, error } = await supabase
    .from("curated_lists")
    .select("*, lists_curated_lists_mapping(*, lists(*, episodes(*)))")
    .eq("id", listID)
    .single();

  console.log(data);

  if (error) {
    console.log(error);
  } else {
    // The episode data is nested in the episodes array. Extract each of these, and add them to a new array, and then set the state of listItems to this new array.
    console.log(data);
    const episodes = data.lists_curated_lists_mapping.map((item) => {
      return item.lists.episodes;
    });

    // Create array of episode titles
    const episodeTitles = episodes.map((item) => {
      return item.title;
    });

    return {
      props: {
        listItems: episodes,
        listTitle: data.name,
        episodeTitles: episodeTitles,
      },
    };
  }
}
