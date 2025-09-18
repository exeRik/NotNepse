import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Group, Text, ActionIcon, Drawer } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks'; // ✅ import hook
import {
  IconBellRinging,
  IconReceipt2,
  IconFingerprint,
  IconKey,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconBrandReact,
  IconMenu2,
} from "@tabler/icons-react";
import classes from "./NavbarSimple.module.css";

const data = [
  { link: "/", label: "Dashboard", icon: IconBellRinging },
  { link: "/market", label: "Market Data", icon: IconReceipt2 },
  { link: "/portfolio", label: "Portfolio", icon: IconFingerprint },
  { link: "/reports", label: "Reports", icon: IconKey },
  { link: "/settings", label: "Settings", icon: IconSettings },
];

export default function NavbarSimple() {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)'); // screen <768px considered mobile

  return (
    <>
      {/* Mobile Menu Icon */}
      {isMobile && (
        <ActionIcon
          size="lg"
          variant="filled"
          onClick={() => setOpened(true)}
          style={{ position: "fixed", top: 20, left: 20, zIndex: 1000 }}
        >
          <IconMenu2 size={24} />
        </ActionIcon>
      )}

      {/* Drawer for mobile */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="md"
        size="250px"
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div className={classes.navbarMain}>
          <Group
            className={classes.header}
            position="apart"
            align="center"
            spacing="sm"
            style={{ marginBottom: "1.5rem" }}
          >
            <IconBrandReact size={36} stroke={1.5} />
            <Text weight={700} size="lg" color="black">
              Definitely not nepse-
            </Text>
          </Group>

          {data.map((item) => (
            <NavLink
              key={item.label}
              to={item.link}
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.active : ""}`
              }
              onClick={() => setOpened(false)}
            >
              <item.icon className={classes.linkIcon} stroke={1.5} />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className={classes.footer} style={{ marginTop: "auto" }}>
            <NavLink to="/change-account" className={classes.link}>
              <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
              <span>Change account</span>
            </NavLink>

            <NavLink to="/logout" className={classes.link}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </NavLink>
          </div>
        </div>
      </Drawer>

      {/* Desktop Navbar */}
      {!isMobile && (
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group
              className={classes.header}
              position="apart"
              align="center"
              spacing="sm"
              style={{ marginBottom: "1.5rem" }}
            >
              <IconBrandReact size={36} stroke={1.5} />
              <Text weight={700} size="lg" color="black">
                Definitely not nepse-
              </Text>
            </Group>

            {data.map((item) => (
              <NavLink
                key={item.label}
                to={item.link}
                className={({ isActive }) =>
                  `${classes.link} ${isActive ? classes.active : ""}`
                }
              >
                <item.icon className={classes.linkIcon} stroke={1.5} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className={classes.footer}>
            <NavLink to="/change-account" className={classes.link}>
              <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
              <span>Change account</span>
            </NavLink>

            <NavLink to="/logout" className={classes.link}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </NavLink>
          </div>
        </nav>
      )}
    </>
  );
}
