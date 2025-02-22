import React from "react";
import { Character } from "../store/charactersSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../store/store";
import { toggleFavorite } from "../store/favoritesSlice";
import classNames from "classnames";
import { Henny_Penny } from "next/font/google";
import Image from "next/image";

const hennyPenny = Henny_Penny({ weight: "400" });

export default function CharacterCard({ character }: { character: Character }) {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: AppState) => state.favorites.favoriteNames
  );
  const isFav = favorites.includes(character.name);

  return (
    <div
      className={`${hennyPenny.className} grid grid-rows-4 p-4 border border-gray-500 rounded-2xl shadow-xl shadow-white-500/50 hover:shadow-lg space-y-2 max-w-full h-96 hover:scale-105 transition-transform duration-150 justify-items-center`}
    >
      <div className="row-span-6">
        <img
          src={character.image || ""}
          alt={character.name}
          className="w-full h-full object-contain rounded-4xl transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="row-span-1 text-xl font-semibold">{character.name}</div>
      <button
        onClick={() => dispatch(toggleFavorite(character.name))}
        className={classNames("row-span-1 px-3 py-1 rounded-full w-28", {
          "bg-yellow-400 text-black hover:bg-gray-700 hover:text-yellow-400 transition duration-300 ease-in-out":
            isFav,
          "bg-gray-200 hover:bg-gray-700 text-black hover:text-white transition duration-300 ease-in-out":
            !isFav,
        })}
      >
        {isFav ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
}
