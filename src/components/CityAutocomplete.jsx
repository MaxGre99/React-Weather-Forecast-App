import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, FormControl, ListGroup } from "react-bootstrap";

const CityAutocomplete = ({
	settedCity,
	setCity,
	setCoordinates,
	setShow,
	apiKey,
	setError,
	setToast,
}) => {
	const [changingCity, setChangingCity] = useState(settedCity);
	const [citiesList, setCitiesList] = useState([]);

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
					setToast(true);
				}
			}
		};
		handleCityFilter(changingCity);
	}, [changingCity, apiKey, setError, setToast]);

	const handleCityClick = (chosenCity, lat, lon) => {
		setCity(chosenCity);
		setCoordinates({ lat, lon });
		setShow(false);
	};

	return (
		<Form>
			<FormControl
				type="text"
				placeholder="Введите название города"
				value={changingCity}
				onChange={(e) => setChangingCity(e.target.value)}
			/>
			<ListGroup>
				{citiesList.map((city, index) => (
					<ListGroup.Item
						key={index}
						onClick={() => handleCityClick(city.name, city.lat, city.lon)}>
						{city.name}
						{city.state && `, ${city.state}`} {city.country}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Form>
	);
};

export default CityAutocomplete;
