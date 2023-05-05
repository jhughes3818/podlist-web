import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [url, setUrl] = useState("");
  const [warning, setWarning] = useState("");

  const handleClick = () => {
    if (url === "") {
      setWarning("Please enter a URL");
      return;
    }

    if (!url.includes("spotify")) {
      setWarning("Please enter a Spotify URL");
      return;
    }

    axios
      .post("api/add", {
        url: url,
      })
      .then((res) => {
        console.log(res);

        // Redirect to episode page

        window.location.href = `/episode/${res.data.id}`;
      });
  };

  return (
    <>
      <Head>
        <title>PodList</title>
        <meta name="description" content="Create Universal Podcast Links" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://fav.farm/🔥" />
      </Head>
      <main className={styles.main}>
        <div className="grid place-items-center h-screen">
          <div>
            <h1 className="text-2xl font-bold text-center">
              Paste a Spotify URL to get started.
            </h1>
            <div className="flex flex-col">
              <input
                className="w-96 h-10 border-r-4 border-b-4 border-t-2 border-l-2 border-black rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Paste link"
                onChange={(e) => setUrl(e.target.value)}
              ></input>

              <p className="text-red-600">{warning}</p>
              <button
                className="w-96 h-10 border-r-4 border-b-4 border-t-2 border-l-2 border-black rounded-lg px-4 mx-auto mt-4  font-bold text-lg hover:bg-gray-400"
                onClick={() => handleClick()}
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
