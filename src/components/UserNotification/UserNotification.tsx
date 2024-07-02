import classes from "./UserNotification.module.scss";

interface UserNotificationTypes {
  notification: string;
}

export default function UserNotification({
  notification,
}: UserNotificationTypes) {
  return (
    <div className={classes["notification-wrapper"]}>
      <p className={classes["notification-wrapper__text"]}>{notification}</p>
    </div>
  );
}
