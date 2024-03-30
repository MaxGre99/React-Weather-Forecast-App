import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const favouriteCitiesAdapter = createEntityAdapter({
	selectId: (city) => city.name,
});

const initialState = favouriteCitiesAdapter.getInitialState();

const favouriteCitiesSlice = createSlice({
	name: "favouriteCities",
	initialState,
	reducers: {
		addCity: favouriteCitiesAdapter.addOne,
		removeCity: favouriteCitiesAdapter.removeOne,
	},
});

export const selectors = favouriteCitiesAdapter.getSelectors(
	(state) => state.favouriteCitiesReducer
);
export const { actions } = favouriteCitiesSlice;
export default favouriteCitiesSlice.reducer;
