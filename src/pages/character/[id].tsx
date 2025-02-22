import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { reduxWrapper } from "../../store/store";
import { Character } from "../../store/charactersSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";
import Navbar from "../../components/Navbar";
import { toggleFavorite } from "../../store/favoritesSlice";
import classNames from "classnames";
import Link from "next/link";
import { WindSong, Henny_Penny } from "next/font/google";
import CharacterInfo from "../..//components/CharacterInfo";
const windSong = WindSong({
  weight: "400",
  subsets: ["latin", "latin-ext", "vietnamese"],
});
const hennyPenny = Henny_Penny({ weight: "400", subsets: ["latin"] });

export default function CharacterDetail({
  data: character,
}: {
  data: Character;
}) {
  const dispatch = useDispatch();
  //   const characters = useSelector((state: AppState) => state.characters.all);
  const favorites = useSelector(
    (state: AppState) => state.favorites.favoriteNames
  );

  // if (!characters.find((character) => character.id === id)) {
  if (!character) {
    return (
      <div>
        <Navbar />
        <div className="p-4">No character found</div>
      </div>
    );
  }

  //   const character = characters.filter((character) => character.id === id)[0];
  const isFav = favorites.includes(character.name);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Link href="/" className="text-white-600 underline">
          &larr; Back Home
        </Link>
        <div className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 justify-self-center max-h-[550px]">
            <img
              src={
                character.image ||
                "https://via.placeholder.com/200?text=No+Image"
              }
              alt={character.name}
              className=" object-cover rounded-xl h-full"
            />
          </div>
          <div className="col-span-12 md:col-span-6 self-center text-center md:text-left">
            <h2
              className={`${windSong.className} text-3xl font-extrabold mb-6`}
            >
              {character.name}
            </h2>
            <button
              onClick={() => dispatch(toggleFavorite(character.name))}
              className={classNames(
                `${hennyPenny.className} px-6 py-2 rounded-full w-32`,
                {
                  "bg-yellow-400 text-black hover:bg-gray-700 hover:text-yellow-400 transition duration-300 ease-in-out":
                    isFav,
                  "bg-gray-200 hover:bg-gray-700 text-black hover:text-white transition duration-300 ease-in-out":
                    !isFav,
                }
              )}
            >
              {isFav ? "Unfavorite" : "Favorite"}
            </button>
            <div className="mt-4 space-y-1">
              <CharacterInfo name={"Species"} value={character.species} />
              <CharacterInfo name={"Gender"} value={character.gender} />
              <CharacterInfo name={"House"} value={character.house} />
              <CharacterInfo
                name={"Date of Birth"}
                value={character.dateOfBirth}
              />
              <CharacterInfo name={"Patronus"} value={character.patronus} />
              <CharacterInfo name={"Actor"} value={character.actor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const resp = await fetch("https://hp-api.onrender.com/api/characters");
  const data: Character[] = await resp.json();

  const paths = data.map((_) => ({
    params: { id: _.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = reduxWrapper.getStaticProps(
  () => async (context) => {
    const idStr = context.params?.id as string;
    const id = idStr;
    const resp = await fetch(`https://hp-api.onrender.com/api/character/${id}`);
    const data = await resp.json();

    // store.dispatch(setCharacters(data));

    return {
      props: { data: data[0] },
      revalidate: 3600,
    };
  }
);
