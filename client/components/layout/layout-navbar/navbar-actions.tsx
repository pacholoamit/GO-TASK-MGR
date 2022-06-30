import {
  UnstyledButton,
  Group,
  ThemeIcon,
  Text,
  MantineTheme,
} from "@mantine/core";

interface NavbarActionProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

const NavbarAction: React.FC<NavbarActionProps> = ({ color, icon, label }) => {
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
    <UnstyledButton sx={sx}>
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};
