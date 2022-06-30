import { Navbar, ScrollArea } from "@mantine/core";
import NavbarActions from "./navbar-actions";

const LayoutNavbar: React.FC = () => {
  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section grow component={ScrollArea} mx="-x" px="xs">
        <NavbarActions />
      </Navbar.Section>
    </Navbar>
  );
};

export default LayoutNavbar;
