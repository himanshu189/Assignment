import { store } from "react-notifications-component";

export const Notify = (
  notificationType,
  notificationMessage,
  notificationTitle,
  notificationPosition,
  notificationContent,
) => {
  store.addNotification({
    title: notificationTitle || "",
    message: notificationMessage,
    type: notificationType,
    insert: "top",
    container: notificationPosition || "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: { duration: 3000 },
    dismissable: { showIcon: true, onScreen: true },
    content: notificationContent,
  });
};
