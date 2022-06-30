import {
  Group,
  Navbar,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";

const NavbarAction = () => {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const LayoutNavbar: React.FC = () => {
  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section
        grow
        component={ScrollArea}
        mx="-x"
        px="xs"
      ></Navbar.Section>
    </Navbar>
  );
};

export default LayoutNavbar;
