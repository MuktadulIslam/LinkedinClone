import React, { useEffect, useState } from 'react'
import constant from '../../messageConstant';
import Axios from 'axios';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default function Notification(props) {
	
	const day = 7;
	const hour = 0;
	const min = 0;
	const sec = 0;
	const maxNotificationAge = (day*24*3600 + hour*3600 + min*60 + sec)*1000;
	
	let loadFirstTime = false;
	const user = props.user;
	const [allNotifications, setAllNotifications] = useState([]);

	const getallNotifications = async () => {
		try {
			const response = await Axios.get(constant.SERVER_IP + "getallNotifications", {
				params: {
					email: user.email
				}
			});
			// console.log(response.data);
			await setAllNotifications(response.data);
		} catch (error) {
			console.error('An error occurred while sending request to get all notifiaction!!!');
		}
	}


	useEffect(() => {
		if (!loadFirstTime) {
			getallNotifications();
			loadFirstTime = true;
		}
	}, []);


	const removeNotification = async(event, postID) => {
		event.preventDefault();

		const formData = {email: user.email, postID: postID};
		await Axios.post(constant.SERVER_IP + "removeNotification", formData).then((response) => {
			if (response.data.message == constant.SUCCESS) {
				setAllNotifications(allNotifications.filter(item => item.postID !== postID));
			}
			else if (response.data.message == constant.SERVER_ERROR) {
				console.log("Enternal server error!!!");
			}
			else {
				console.log("Unkown error!!!")
			}
		}).catch((error) => {
			console.log('An error occurred while sending the data!!!');
		});
	}

	const getPostTime = (postDate) => {
		const postTime = new Date(postDate);
		const now = new Date();
		const timeDiff = now - postTime;

		const minutes = Math.floor(timeDiff / (1000 * 60));
		const hours = Math.floor(timeDiff / (1000 * 60 * 60));

		// Format the date based on the elapsed time
		if (minutes < 1) {
			return <span style={{ color: 'blue' }}>Just now</span>;
		} else if (minutes < 60) {
			return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
		} else if (hours < 24) {
			return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
		} else {
			return `${postDate.toDateString()}`;
		}

	}

	return (
		<div className="container mt-4">
			<h4>Notifications</h4>
			<ListGroup>
				{allNotifications.map(notification => (
					new Date()-new Date(notification.date) < maxNotificationAge ? (
					<ListGroupItem key={notification.postID}>
						<div className="d-flex justify-content-between align-items-center">
							<div><strong>{notification.name}</strong> added a post  ({getPostTime(notification.date)})</div>
							<div>
								<button onClick={(e) => removeNotification(e,notification.postID)}>Mark As Read</button>
							</div>
						</div>
					</ListGroupItem>
					) : null
				))}
			</ListGroup>
		</div>
	);
};
