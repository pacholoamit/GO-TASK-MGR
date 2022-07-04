import { NotificationProps, showNotification } from "@mantine/notifications";
import { X } from "tabler-icons-react";

interface ErrorNotificationArgs {
  title: string;
  message: string;
}
const ErrorNotification = ({ title, message }: ErrorNotificationArgs) => {
  const notificationProps: NotificationProps = {
    title,
    message,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.red[6],
        borderColor: theme.colors.red[6],
        "&::before": { backgroundColor: theme.white },
      },

      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        "&:hover": { backgroundColor: theme.colors.red[7] },
      },
    }),
  };

  return showNotification(notificationProps);
};

export default ErrorNotification;
