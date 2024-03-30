import React from "react";
import { Modal } from "react-bootstrap";
import CityAutocomplete from "./CityAutocomplete";

const ChoseCityModal = ({
	showModal,
	setShowModal,
	handleCloseModal,
	settedCity,
	setCity,
	setCoordinates,
	apiKey,
	setError,
	setShowToast,
}) => (
	<Modal show={showModal} onHide={handleCloseModal}>
		<Modal.Header closeButton>
			<Modal.Title>Choose a city</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<CityAutocomplete
				settedCity={settedCity}
				setCity={setCity}
				setCoordinates={setCoordinates}
				setShowModal={setShowModal}
				apiKey={apiKey}
				setError={setError}
				setShowToast={setShowToast}
			/>
		</Modal.Body>
	</Modal>
);

export default ChoseCityModal;
