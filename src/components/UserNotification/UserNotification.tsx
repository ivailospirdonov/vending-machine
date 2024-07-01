import React from "react";

interface UserNotificationTypes {
  notification: string;
  totalInserted: number;
}

export default function UserNotification({
  notification,
  totalInserted,
}: UserNotificationTypes) {
  return (
    <>
      <p>{notification}</p>
      <p>{totalInserted}</p>
    </>
  );
}
