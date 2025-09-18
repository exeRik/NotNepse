import { NavLink } from "react-router-dom";
import { Group, Text } from "@mantine/core"; // ✅ added Text
import {
  IconBellRinging,
  IconReceipt2,
  IconFingerprint,
  IconKey,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconBrandReact,
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
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {/* Header / Logo */}
        <Group
          className={classes.header}
          position="apart"
          align="center"
          spacing="sm"
          style={{ marginBottom: "1.5rem" }} // extra spacing below header
        >
          <IconBrandReact size={36} stroke={1.5} />
          <Text weight={700} size="lg" color="black">
            Definitely not nepse-
          </Text>
        </Group>

        {/* Navigation Links */}
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

      {/* Footer */}
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
  );
}
