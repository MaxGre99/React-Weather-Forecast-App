import React, { useState, useEffect } from "react";

const CurrTime = () => {
	// Получение и сохранение актуальной даты и времени
	const [currDateAndTime, setCurrDateAndTime] = useState(new Date());
	const tick = () => setCurrDateAndTime(new Date());
	useEffect(() => {
		const timerId = setInterval(() => tick(), 1000);
		return () => clearInterval(timerId);
	}, []);

	// Установка времени
	const options = {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};
	const currTime = currDateAndTime.toLocaleString("en-US", options); // Получаем, например, "2:34 PM".

	const timezoneOffsetMinutes = currDateAndTime.getTimezoneOffset();

	// Вычисляем часовой пояс в часах и минутах
	const hours = Math.floor(Math.abs(timezoneOffsetMinutes) / 60);
	const countedMins = Math.abs(timezoneOffsetMinutes) % 60;
	const minutes = countedMins > 0 ? `:${countedMins}` : "";

	// Определяем направление (+ или -) часового пояса
	const sign = timezoneOffsetMinutes > 0 ? "-" : "+";

	return `${currTime} GMT ${sign}${hours}${minutes}`;
};

export default CurrTime;
