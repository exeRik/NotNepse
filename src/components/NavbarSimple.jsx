import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Group, Text, ActionIcon, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBellRinging,
  IconReceipt2,
  IconFingerprint,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconUser,
  IconMenu2,
} from "@tabler/icons-react";
import classes from "./NavbarSimple.module.css";

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconBellRinging },
  { link: "/market", label: "Market Data", icon: IconReceipt2 },
  { link: "/portfolio", label: "Portfolio", icon: IconFingerprint },
  { link: "/settings", label: "Settings", icon: IconSettings },
];

export default function NavbarSimple() {
  const [opened, setOpened] = useState(false);
  const [user, setUser] = useState({ name: "", username: "" });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://192.168.1.114:3000/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // send token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();

       
        const profile = data.user || data;

        setUser({
          name: profile.name || "Unknown User",
          username: profile.email || "no-email@example.com",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        // If unauthorized, clear token & redirect
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // User info 
  const renderUserHeader = () => (
    <Group
      className={classes.header}
      position="apart"
      align="center"
      spacing="sm"
      style={{ marginBottom: "1.5rem" }}
    >
      <IconUser size={36} stroke={1.5} />
      <div>
        <Text fw={700} size="lg" c="black">
          {user.name || "Guest Guest"}
        </Text>
        <Text size="sm" c="dimmed">
          {user.username || "guest@gmail.com"}
        </Text>
      </div>
    </Group>
  );

  // Logout / Change account
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Footer
  const renderFooter = () => (
    <div className={classes.footer} style={{ marginTop: "auto" }}>
      <div
        className={classes.link}
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
      >
        <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
        <span>Change account</span>
      </div>

      <div
        className={classes.link}
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
      >
        <IconLogout className={classes.linkIcon} stroke={1.5} />
        <span>Logout</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      {isMobile && !opened && (
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
          {renderUserHeader()}

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

          {renderFooter()}
        </div>
      </Drawer>

      {/* Desktop Navbar */}
      {!isMobile && (
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            {renderUserHeader()}

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

          {renderFooter()}
        </nav>
      )}
    </>
  );
}
