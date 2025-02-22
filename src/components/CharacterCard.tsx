import React from "react";
import { Character } from "../store/charactersSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../store/store";
import { toggleFavorite } from "../store/favoritesSlice";
import classNames from "classnames";

export default function CharacterCard({ character }: { character: Character }) {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: AppState) => state.favorites.favoriteNames
  );
  const isFav = favorites.includes(character.name);

  return (
    <div className="flex flex-col p-4 border rounded-2xl shadow hover:shadow-lg space-y-2">
      <img
        src={character.image || "https://via.placeholder.com/200?text=No+Image"}
        alt={character.name}
        className="w-48 h-56 object-cover rounded-xl"
      />
      <div className="text-xl font-semibold">{character.name}</div>
      <button
        onClick={() => dispatch(toggleFavorite(character.name))}
        className={classNames("px-3 py-1 rounded-full w-fit", {
          "bg-yellow-400 text-black": isFav,
          "bg-gray-200 text-black": !isFav,
        })}
      >
        {isFav ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
}
