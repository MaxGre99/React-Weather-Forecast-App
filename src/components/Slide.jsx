import React from "react";
import { Image } from "react-bootstrap";

const Slide = ({ weeklyForecast, index }) => {
	//Превращение даты в день недели
	const dateToWeekday = (fullDate) => {
		const date = fullDate.slice(0, 10);
		const newDate = new Date(date);
		const options = { weekday: "short" };
		return new Intl.DateTimeFormat("en-US", options)
			.format(newDate)
			.toUpperCase();
	};
	return (
		<div className="slickSlide">
			<p>{dateToWeekday(weeklyForecast[index].dt_txt)}</p>
			<Image
				src={`https://openweathermap.org/img/wn/${weeklyForecast[index].weather[0].icon}@2x.png`}
			/>
		</div>
	);
};

export default Slide;
