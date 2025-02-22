import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import React from "react";
import { GetStaticProps } from "next";
import { useSelector } from "react-redux";
import { AppState, reduxWrapper } from "../store/store";
import { setCharacters } from "../store/charactersSlice";
import Navbar from "../components/Navbar";
import Link from "next/link";
import CharacterCard from "../components/CharacterCard";

export default function Home() {
  const characters = useSelector((state: AppState) => state.characters.all);
  return (
    <div>
      <Navbar />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((character, index) => (
          <Link key={`${character.name}-${index}`} href={`/character/${index}`}>
            <CharacterCard character={character} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = reduxWrapper.getStaticProps(
  (store) => async () => {
    const resp = await fetch("https://hp-api.onrender.com/api/characters");
    const data = await resp.json();
    store.dispatch(setCharacters(data));
    return { props: {}, revalidate: 3600 };
  }
);
