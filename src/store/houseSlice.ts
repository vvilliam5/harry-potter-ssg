import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const HOUSES = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];

interface HouseState {
  preferred: string;
}

const initialHouseState: HouseState = {
  preferred: "Gryffindor",
};

export const houseSlice = createSlice({
  name: "house",
  initialState: initialHouseState,
  reducers: {
    setHouse: (state, action: PayloadAction<string>) => {
      if (HOUSES.includes(action.payload)) {
        state.preferred = action.payload;
      }
    },
  },
});

export const { setHouse } = houseSlice.actions;
