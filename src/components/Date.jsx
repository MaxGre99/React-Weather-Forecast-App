import React, { useState, useEffect } from "react";

const CurrDate = () => {
	// Получение и сохранение актуальной даты и времени
	const [currDateAndTime, setCurrDateAndTime] = useState(new Date());
	const tick = () => setCurrDateAndTime(new Date());
	useEffect(() => {
		const timerId = setInterval(() => tick(), 1000);
		return () => clearInterval(timerId);
	}, []);

	// Установка даты
	let options = {
		weekday: "long",
	};
	const currWeekday = currDateAndTime.toLocaleString("en-US", options);

	options = {
		day: "numeric",
		month: "short",
		year: "numeric",
	};

	const currDate = currDateAndTime.toLocaleString("en-US", options);
	return (
		<p>
			{currWeekday} | {currDate}
		</p>
	);
};

export default CurrDate;
