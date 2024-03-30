import { configureStore } from "@reduxjs/toolkit";
import favouriteCitiesReducer from "./favouriteCitiesSlice";

export default configureStore({
	reducer: {
		favouriteCitiesReducer: favouriteCitiesReducer,
	},
});
