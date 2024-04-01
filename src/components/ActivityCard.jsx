import React from "react";
import { Card } from "react-bootstrap";

const ActivityCard = ({pic}) => {
	return (
		<Card>
			<Card.Img variant="top" src={pic} className="rounded" />
			<Card.Footer>
				<small>2km away</small>
			</Card.Footer>
		</Card>
	);
};

export default ActivityCard;
