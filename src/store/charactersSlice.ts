import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface Character {
  id: string;
  name: string;
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  image: string;
}

interface CharactersState {
  all: Character[];
}

interface HydrateAction extends PayloadAction<{ characters: CharactersState }> {
  type: typeof HYDRATE;
}

const initialCharactersState: CharactersState = {
  all: [],
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState: initialCharactersState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.all = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: HydrateAction) => {
      const hydratePayload = action.payload;
      if (
        hydratePayload.characters &&
        hydratePayload.characters.all &&
        hydratePayload.characters.all.length > 0
      ) {
        return {
          ...state,
          all: hydratePayload.characters.all,
        };
      }
      return state;
    });
  },
});

export const { setCharacters } = charactersSlice.actions;
