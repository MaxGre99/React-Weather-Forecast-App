import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./css/index.css";
import App from "./components/App";
import store from "./slices/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
