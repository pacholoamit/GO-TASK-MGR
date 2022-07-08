import { NotificationProps, showNotification } from "@mantine/notifications";

interface SuccessNotificationArgs {
  title: string;
  message: string;
}
const SuccessNotification = ({ title, message }: SuccessNotificationArgs) => {
  const notificationProps: NotificationProps = {
    title,
    message,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.green[6],
        borderColor: theme.colors.green[6],
        "&::before": { backgroundColor: theme.white },
      },

      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        "&:hover": { backgroundColor: theme.colors.green[7] },
      },
    }),
  };

  return showNotification(notificationProps);
};

export default SuccessNotification;
