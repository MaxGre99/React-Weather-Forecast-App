import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "../slices/favouriteCitiesSlice";
import { actions } from "../slices/favouriteCitiesSlice";
import axios from "axios";
import { Form, FormControl, ListGroup } from "react-bootstrap";

const CityAutocomplete = ({
	settedCity,
	setCity,
	setCoordinates,
	setShowModal,
	apiKey,
	setError,
	setShowToast,
}) => {
	const [changingCity, setChangingCity] = useState(settedCity);
	const [citiesList, setCitiesList] = useState([]);

	const inputEl = useRef();

	useEffect(() => {
		inputEl.current.focus();
	}, []);

	useEffect(() => {
		const handleCityFilter = async (changingCity) => {
			if (changingCity.trim() !== "") {
				try {
					const response = await axios.get(
						`http://api.openweathermap.org/geo/1.0/direct?q=${changingCity}&limit=5&appid=${apiKey}`
					);
					const cities = response.data.map((item) => {
						if (item.state !== "") {
							return {
								name: item.name,
								state: item.state,
								country: item.country,
								lat: item.lat,
								lon: item.lon,
							};
						} else {
							return {
								name: item.name,
								country: item.country,
								lat: item.lat,
								lon: item.lon,
							};
						}
					});
					setCitiesList(cities);
				} catch (err) {
					setError(err);
					setShowToast(true);
				}
			}
		};
		handleCityFilter(changingCity);
	}, [changingCity, apiKey, setError, setShowToast]);

	const handleCityClick = (chosenCity, lat, lon) => {
		setCity(chosenCity);
		setCoordinates({ lat, lon });
		setShowModal(false);
	};

	const dispatch = useDispatch();
	const { addCity, removeCity } = actions;
	const favouriteCities = Object.values(useSelector(selectors.selectEntities));

	return (
		<Form onSubmit={(e) => e.preventDefault()}>
			<FormControl
				type="text"
				placeholder="Введите название города"
				onChange={(e) => setChangingCity(e.target.value)}
				ref={inputEl}
			/>
			<h4 className="pt-2">Bookmarked Cities:</h4>
			{favouriteCities && favouriteCities.length > 0 ? (
				<ListGroup>
					{favouriteCities.map((favouriteCity) => (
						<ListGroup.Item
							key={favouriteCity.lat}
							style={{ display: "flex", justifyContent: "space-between" }}
							onClick={() =>
								handleCityClick(
									favouriteCity.name,
									favouriteCity.lat,
									favouriteCity.lon
								)
							}>
							<span>
								{favouriteCity.name},{" "}
								{favouriteCity.state && ` ${favouriteCity.state}`},{" "}
								{favouriteCity.country}
							</span>
							<i
								className="bi bi-bookmark-fill"
								onClick={(e) => {
									e.stopPropagation();
									dispatch(removeCity(favouriteCity.lat));
								}}></i>
						</ListGroup.Item>
					))}
				</ListGroup>
			) : (
				<p className="text-center text-muted italic-text">
					No favourite cities added yet
				</p>
			)}
			<hr />
			<ListGroup>
				{citiesList.map((city) => (
					<ListGroup.Item
						key={city.lat}
						onClick={() => handleCityClick(city.name, city.lat, city.lon)}
						style={{ display: "flex", justifyContent: "space-between" }}>
						<span>
							{city.name}, {city.state && ` ${city.state}`}, {city.country}
						</span>
						<i
							className="bi bi-bookmark"
							onClick={(e) => {
								e.stopPropagation();
								dispatch(addCity(city));
							}}></i>
					</ListGroup.Item>
				))}
			</ListGroup>
		</Form>
	);
};

export default CityAutocomplete;
