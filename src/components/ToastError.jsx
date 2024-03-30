import React from "react";
import { Toast } from "react-bootstrap";

const ToastError = ({ showToast, handleCloseToast, error }) => (
	<Toast
		className="d-inline-block m-1"
		bg="danger"
		key={0}
		show={showToast}
		onClose={handleCloseToast}>
		<Toast.Header>
			<i className="bi bi-cloud-lightning-rain-fill">&nbsp;</i>
			<strong className="me-auto">"Ouch! Something went wrong..."</strong>
		</Toast.Header>
		<Toast.Body>{error}</Toast.Body>
	</Toast>
);

export default ToastError;

/*
if you'll need a successful toast too:

import React from "react";
import { Toast } from "react-bootstrap";

const ToastError = ({showToast, handleCloseToast, error}) => (
	<Toast
		className="d-inline-block m-1"
		bg={error ? "danger" : "success"}
		key={0}
		show={showToast}
		onClose={handleCloseToast}>
		<Toast.Header>
			<i className={error ? "bi bi-cloud-lightning-rain-fill" : "bi bi-brightness-alt-high"}>&nbsp;</i>
			<strong className="me-auto">{error ? "Ouch! Something went wrong..." : "Data updated"}</strong>
		</Toast.Header>
		<Toast.Body>{error ? error : "Everything is fine. Have a good day!"}</Toast.Body>
	</Toast>
);

export default ToastError;
*/
