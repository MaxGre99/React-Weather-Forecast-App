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

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	};

	const dispatch = useDispatch();
	const { addCity, removeCity } = actions;
	const favouriteCities = Object.values(useSelector(selectors.selectEntities));

	return (
		<Form>
			<FormControl
				type="text"
				placeholder="Введите название города"
				value={changingCity}
				onChange={(e) => setChangingCity(e.target.value)}
				onKeyUp={handleKeyPress}
				ref={inputEl}
			/>
			{favouriteCities && favouriteCities.length > 0 ? (
				<ListGroup>
					{favouriteCities.map((favouriteCity, index) => (
						<ListGroup.Item key={index}
						style={{ display: "flex", justifyContent: "space-between" }}
						onClick={() => handleCityClick(favouriteCity.name, favouriteCity.lat, favouriteCity.lon)}>
							<span>
								{favouriteCity.name}, {favouriteCity.state && ` ${favouriteCity.state}`}, {favouriteCity.country}
							</span>
							<i
							className="bi bi-bookmark-fill"
							onClick={(e) => {
								e.stopPropagation();
								dispatch(removeCity(favouriteCity.name));
							}}></i>
						</ListGroup.Item>
					))}
				</ListGroup>
			) : (
				<p className="pt-3 text-center text-muted">No favourite cities added yet</p>
			)}
			<hr />
			<ListGroup>
				{citiesList.map((city, index) => (
					<ListGroup.Item
						key={index}
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
