import {
  DefaultMantineColor,
  MantineTheme,
  UnstyledButton,
  Group,
  ThemeIcon,
  Text,
} from "@mantine/core";
import { MouseEventHandler } from "react";

interface NavbarButtonProps {
  icon: React.ReactNode;
  color: DefaultMantineColor;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({
  color,
  icon,
  label,
  onClick,
}) => {
  const sx = (theme: MantineTheme) => ({
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  });
  return (
    <UnstyledButton sx={sx} onClick={onClick}>
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text lineClamp={1} size="sm">
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

export default NavbarButton;
