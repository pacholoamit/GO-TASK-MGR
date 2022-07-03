import {
  DefaultMantineColor,
  MantineTheme,
  UnstyledButton,
  Group,
  ThemeIcon,
  Text,
  Menu,
} from "@mantine/core";
import { MouseEventHandler } from "react";
import { Eraser, Trash } from "tabler-icons-react";

const ProjectMenu = () => {
  return (
    <Menu>
      <Menu.Label>Settings</Menu.Label>
      <Menu.Item icon={<Eraser size={14} />} color="green">
        Rename
      </Menu.Item>
      <Menu.Item icon={<Trash size={14} />} color="red">
        Delete
      </Menu.Item>
    </Menu>
  );
};
interface NavbarButtonProps {
  icon: React.ReactNode;
  color: DefaultMantineColor;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  enableMenu?: boolean;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({
  color,
  icon,
  label,
  enableMenu,
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
      <Group position="apart">
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>
          <Text lineClamp={1} size="sm">
            {label}
          </Text>
        </Group>
        {enableMenu && <ProjectMenu />}
      </Group>
    </UnstyledButton>
  );
};

export default NavbarButton;
