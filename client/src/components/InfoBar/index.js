import React from "react";
import "./InfoBar.css";
import { GiPlainCircle } from "react-icons/gi";
import { Link } from "react-router-dom";

export const InfoBar = ({ room }) => {
	return (
		<div className="infoBar">
			<div className="leftInnerContainer">
				<GiPlainCircle style={{ color: "#42f57b", marginRight: "10px" }} />
				<h3>{room}</h3>
			</div>
			<div className="rightInnerContainer">
				<Link to="/">
					<GiPlainCircle style={{ color: "#3b3b3b" }} />
				</Link>
			</div>
		</div>
	);
};
