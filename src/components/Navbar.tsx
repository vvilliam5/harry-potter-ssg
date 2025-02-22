import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../store/store";
import { setHouse } from "../store/houseSlice";

const POSSIBLE_HOUSES = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];

export default function Navbar() {
  const preferred = useSelector((state: AppState) => state.house.preferred);
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-gray-800 text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex gap-4">
        <Link href="/">All Characters</Link>
        <Link href="/students">Students</Link>
        <Link href="/staff">Staff</Link>
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
