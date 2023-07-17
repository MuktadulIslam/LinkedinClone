import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default function NotificationComponent() {
  const notifications = [
    { id: 1, text: 'John Doe liked your post', time: '5 minutes ago' },
    { id: 2, text: 'Jane Smith commented on your photo', time: '1 hour ago' },
    { id: 3, text: 'New connection: Mark Johnson', time: '2 hours ago' },
    { id: 4, text: 'You have a new message', time: '3 hours ago' },
  ];

  return (
    <div className="container mt-4">
      <h4>Notifications</h4>
      <ListGroup>
        {notifications.map(notification => (
          <ListGroupItem key={notification.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>{notification.text}</div>
              <div className="text-muted">{notification.time}</div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};
