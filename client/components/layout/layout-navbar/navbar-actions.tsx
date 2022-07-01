// import {
//   UnstyledButton,
//   Group,
//   ThemeIcon,
//   Text,
//   MantineTheme,
//   DefaultMantineColor,
//   Title,
// } from "@mantine/core";
// import { Heart } from "tabler-icons-react";

// interface NavbarActionProps {
//   icon: React.ReactNode;
//   color: DefaultMantineColor;
//   label: string;
// }

// const NavbarAction: React.FC<NavbarActionProps> = ({ color, icon, label }) => {
//   const sx = (theme: MantineTheme) => ({
//     display: "block",
//     width: "100%",
//     padding: theme.spacing.xs,
//     borderRadius: theme.radius.sm,
//     color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

//     "&:hover": {
//       backgroundColor:
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[6]
//           : theme.colors.gray[0],
//     },
//   });
//   return (
//     <UnstyledButton sx={sx}>
//       <Group>
//         <ThemeIcon color={color} variant="light">
//           {icon}
//         </ThemeIcon>
//         <Text size="sm">{label}</Text>
//       </Group>
//     </UnstyledButton>
//   );
// };

// const actionsList: NavbarActionProps[] = [
//   { icon: <Heart size={16} />, color: "pink", label: "Watchlist" },
// ];

// const NavbarActions: React.FC = () => {
//   const actions = actionsList.map((action) => (
//     <NavbarAction {...action} key={action.label} />
//   ));
//   return (
//     <>
//       <Title>Projects</Title>
//       {actions}
//     </>
//   );
// };

// export default NavbarActions;
