import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Messages.css";
import { Message } from '../Message'
export const Messages = ({ messages, name }) => {
    console.log(messages);
	return (
		<ScrollToBottom className="messages">
			{messages.map((message, i) => {
				return <div key={i}>
					<Message message={message} name={name} />
				</div>;
			})}
		</ScrollToBottom>
	);
};
