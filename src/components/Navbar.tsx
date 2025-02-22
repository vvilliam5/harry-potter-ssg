import React from "react";
import Link from "next/link";
import { Benne } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../store/store";
import { setHouse } from "../store/houseSlice";

const benne = Benne({
  weight: "400",
  subsets: ["kannada", "latin", "latin-ext"],
});

const POSSIBLE_HOUSES = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];

export default function Navbar() {
  const preferred = useSelector((state: AppState) => state.house.preferred);
  const dispatch = useDispatch();

  return (
    <div
      className={`${benne.className} w-full bg-gray-800 text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 items-center`}
    >
      <div className="flex gap-4">
        <Link
          className="hover:text-gray-300 transition easi-in-out duration-300"
          href="/"
        >
          All Characters
        </Link>
        <Link
          className="hover:text-gray-300 transition easi-in-out duration-300"
          href="/students"
        >
          Students
        </Link>
        <Link
          className="hover:text-gray-300 transition easi-in-out duration-300"
          href="/staff"
        >
          Staff
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="houseSelect">Preferred House:</label>
        <select
          id="houseSelect"
          value={preferred}
          onChange={(e) => dispatch(setHouse(e.target.value))}
          className="rounded px-2 py-1 text-black"
        >
          {POSSIBLE_HOUSES.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
