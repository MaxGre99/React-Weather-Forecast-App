import "../css/App.css";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import Fall from "../img/osen_les_park_128379_1920x1080.jpg";
import Waterfall from "../img/vodopad_obryv_kamennyj_141850_1920x1080.jpg";
import Sakura from "../img/most_reka_techenie_100663_1920x1080.jpg";
import River from "../img/lodka_gory_ozero_135258_1920x1080.jpg";
import dayWeather from "../img/dayWeather.jpeg";
import CurrDate from "./Date";
import CurrTime from "./Time";
import ChoseCityModal from "./ChoseCityModal";
import ToastError from "./ToastError";
// import CityAutocomplete from "./CityAutocomplete";

// API Key
const apiKey = "2a1415da8e78fd27494cf3257836cd32";

// Настройки слайдера
const sliderSettings = {
	className: "Slider",
	centerMode: true,
	slidesToShow: 3,
	centerPadding: "0",
	responsive: [
		{
			breakpoint: 900,
			settings: {
				className: "Slider",
				centerMode: true,
				centerPadding: "0",
				slidesToShow: 3,
				arrows: false,
			},
		},
	],
};

const App = () => {
	// Настройки "тоста" ошибок
	const [showToast, setShowToast] = useState(false);
	const [error, setError] = useState("");
	const handleCloseToast = () => setShowToast(false);

	// Состояние модалки
	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	//Город начальный и его изменение
	const [settedCity, setCity] = useState("New York");

	// Координаты
	const [coordinates, setCoordinates] = useState({
		lat: "40.7127281",
		lon: "-74.0060152",
	});

	//Показания погоды
	const [loading, setLoading] = useState(true);
	const [weatherConditions, setWeatherConditions] = useState({});
	const [airPollution, setAirPollution] = useState({});
	const [weeklyForecast, setWeeklyForecast] = useState({});
	console.log(weatherConditions);

	useEffect(() => {
		const { lat, lon } = coordinates;
		const getConditions = async () => {
			try {
				const weatherResponse = await axios.get(
					`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
				);
				const pollutionResponse = await axios.get(
					`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
				);
				const weeklyResponse = await axios.get(
					`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=40&appid=${apiKey}`
				);
				const indexes = [4, 12, 20, 28, 36];
				const indexedWeekly = weeklyResponse.data.list.filter((item, index) =>
					indexes.includes(index)
				);
				setWeatherConditions(weatherResponse.data);
				setAirPollution(pollutionResponse.data);
				setWeeklyForecast(indexedWeekly);
				// this one is for successful toast (look at the end of ToastError.jsx): setShowToast(true);
				setLoading(false);
			} catch (err) {
				setError(err);
				setShowToast(true);
			}
		};
		getConditions();
	}, [coordinates]);

	//Превращение даты в день недели
	const dateToWeekday = (fullDate) => {
		const date = fullDate.slice(0, 10);
		const newDate = new Date(date);
		const options = { weekday: "short" };
		return new Intl.DateTimeFormat("en-US", options)
			.format(newDate)
			.toUpperCase();
	};

	if (!loading) {
		return (
			<div className="app">
				<ToastError
					showToast={showToast}
					handleCloseToast={handleCloseToast}
					error={error}
				/>
				<ChoseCityModal
					showModal={showModal}
					setShowModal={setShowModal}
					handleCloseModal={handleCloseModal}
					settedCity={settedCity}
					setCity={setCity}
					setCoordinates={setCoordinates}
					apiKey={apiKey}
					setError={setError}
					setShowToast={setShowToast}
				/>
				<Container fluid>
					<Row className="d-flex">
						<Col className="info" xs={6} sm={4} xl={4}>
							<h6 onClick={handleShowModal}>
								<i className="bi bi-geo-alt-fill"></i> {settedCity}
							</h6>
							<h2>{weatherConditions.weather[0].main}</h2>
							<h1 className="temperature">
								{Math.floor(weatherConditions.main.temp)}°C
							</h1>
							<CurrDate />
						</Col>
						<Col className="cloud" xs={4} sm={6} xl={4}>
							<Image
								src={`https://openweathermap.org/img/wn/${weatherConditions.weather[0].icon}@2x.png`}
							/>
						</Col>
					</Row>
				</Container>
				<Container fluid>
					<Row className="tabs">
						<Col className="navigation d-flex" xs={12} sm={2} md={2} xl={1}>
							{/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
							<a href="/profile" className="avatar"></a>
							<a href="/weather" className="active">
								<i className="bi bi-cloud-sun-fill"></i>weather
							</a>
							<a href="/explore">
								<i className="bi bi-compass-fill"></i>explore
							</a>
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<a href="#" onClick={handleShowModal}>
								<i className="bi bi-geo-alt-fill"></i>cities
							</a>
							<a href="/settings">
								<i className="bi bi-gear-fill"></i>settings
							</a>
						</Col>
						<Col className="mainBlock" xs={12} sm={6} md={6} xl={7}>
							<div className="activities d-flex">
								<h3>
									<i className="bi bi-heart-fill"></i> Activities in your area
								</h3>
								<div className="d-flex activities-cards">
									<Card>
										<Card.Img variant="top" src={Fall} className="rounded" />
										<Card.Footer>
											<small>2km away</small>
										</Card.Footer>
									</Card>
									<Card>
										<Card.Img
											variant="top"
											src={Waterfall}
											className="rounded"
										/>
										<Card.Footer>
											<small>2km away</small>
										</Card.Footer>
									</Card>
									<Card>
										<Card.Img variant="top" src={Sakura} className="rounded" />
										<Card.Footer>
											<small>2km away</small>
										</Card.Footer>
									</Card>
									<Card>
										<Card.Img variant="top" src={River} className="rounded" />
										<Card.Footer>
											<small>2km away</small>
										</Card.Footer>
									</Card>
								</div>
							</div>
							<div className="emptySpace"></div>
							<div className="dailyForecast d-flex">
								<h3>
									<i className="bi bi-clock-fill"></i> 24-hour forecast
								</h3>
								<div className="img">
									<Image src={dayWeather} />
								</div>
							</div>
						</Col>
						<Col className="weekly d-flex" xs={12} sm={3} md={3} xl={3}>
							<Slider {...sliderSettings}>
								<div className="slickSlide">
									<p>{dateToWeekday(weeklyForecast[0].dt_txt)}</p>
									<Image
										src={`https://openweathermap.org/img/wn/${weeklyForecast[0].weather[0].icon}@2x.png`}
									/>
								</div>
								<div className="slickSlide">
									<p>{dateToWeekday(weeklyForecast[1].dt_txt)}</p>
									<Image
										src={`https://openweathermap.org/img/wn/${weeklyForecast[1].weather[0].icon}@2x.png`}
									/>
								</div>
								<div className="slickSlide">
									<p>{dateToWeekday(weeklyForecast[2].dt_txt)}</p>
									<Image
										src={`https://openweathermap.org/img/wn/${weeklyForecast[2].weather[0].icon}@2x.png`}
									/>
								</div>
								<div className="slickSlide">
									<p>{dateToWeekday(weeklyForecast[3].dt_txt)}</p>
									<Image
										src={`https://openweathermap.org/img/wn/${weeklyForecast[3].weather[0].icon}@2x.png`}
									/>
								</div>
								<div className="slickSlide">
									<p>{dateToWeekday(weeklyForecast[4].dt_txt)}</p>
									<Image
										src={`https://openweathermap.org/img/wn/${weeklyForecast[4].weather[0].icon}@2x.png`}
									/>
								</div>
							</Slider>
							<p className="time">
								<i className="bi bi-clock-fill"></i> <CurrTime />
							</p>
							<div className="airConditions d-flex">
								<p className="airConditionsTitle">AIR CONDITIONS</p>
								<p>
									<i className="bi bi-thermometer-half"></i> Real Feel
									<br />
									<span>{Math.floor(weatherConditions.main.feels_like)}°C</span>
								</p>
								<p>
									<i className="bi bi-wind"></i> Wind
									<br />
									<span>{weatherConditions.wind.speed} m/s</span>
								</p>
								<p className="rain">
									<i className="bi bi-droplet-fill"></i> Chance of rain
									<br />
									<span>{weeklyForecast[0].pop * 100} %</span>
								</p>
								<p>
									<i className="bi bi-lungs-fill"></i> Air Pollution Index
									<br />
									<span>{airPollution.list[0].main.aqi}</span>
								</p>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
};

export default App;
