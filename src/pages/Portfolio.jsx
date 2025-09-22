import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  Title,
  Avatar,
  Group,
  Button,
  TextInput,
  Textarea,
  Badge,
  Container,
  Loader,
  Center,
  Notification,
} from "@mantine/core";
import {
  IconEdit,
  IconDeviceFloppy,
  IconX,
  IconAlertCircle,
} from "@tabler/icons-react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        //  Guest fallback if no token
        if (!token) {
          setError("No token found. Showing guest profile.");
          setUser({ name: "Guest", email: "guest@example.com" });
          setEditedUser({ name: "Guest", email: "guest@example.com" });
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        const profile = data.user || data;

        setUser(profile);
        setEditedUser(profile);
      } catch (err) {
        console.error(err);
        setError("Error fetching user profile. Showing guest profile.");
        setUser({ name: "Guest", email: "guest@example.com" });
        setEditedUser({ name: "Guest", email: "guest@example.com" });
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Guests cannot update profile. Please log in.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      setUser(editedUser);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError("Could not save profile. Backend may be unreachable.");
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  if (!user)
    return (
      <Center py="xl">
        <Loader size="lg" variant="dots" />
      </Center>
    );

  return (
    <Container size="sm" py="xl">
      {error && (
        <Notification
          icon={<IconAlertCircle size={18} />}
          color="red"
          onClose={() => setError("")}
          mb="md"
        >
          {error}
        </Notification>
      )}

      <Title order={2} mb="md" ta="center">
        User Profile
      </Title>

      <Card shadow="md" radius="md" withBorder>
        {/* Header */}
        <Group justify="space-between" mb="lg">
          <Group>
            <Avatar size="xl" radius="xl" color="blue">
              {user.name?.charAt(0).toUpperCase() || "G"}
            </Avatar>
            <div>
              <Title order={3}>{user.name || "Guest"}</Title>
              <Text c="dimmed">{user.email || "Not available"}</Text>
              {user.role && (
                <Badge color="blue" variant="light" mt="xs">
                  {user.role}
                </Badge>
              )}
            </div>
          </Group>

          {/* Disable editing for guests */}
          {user.name !== "Guest" && !isEditing ? (
            <Button
              leftSection={<IconEdit size={16} />}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : isEditing ? (
            <Group>
              <Button
                leftSection={<IconDeviceFloppy size={16} />}
                color="green"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                leftSection={<IconX size={16} />}
                color="gray"
                variant="light"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Group>
          ) : null}
        </Group>

        {/* Profile Details */}
        <TextInput
          label="Full Name"
          value={isEditing ? editedUser.name : user.name}
          onChange={(e) => handleChange("name", e.currentTarget.value)}
          readOnly={!isEditing}
          mb="md"
        />

        <TextInput
          label="Email"
          value={isEditing ? editedUser.email : user.email}
          onChange={(e) => handleChange("email", e.currentTarget.value)}
          readOnly={!isEditing}
          mb="md"
        />

        <TextInput
          label="Phone"
          value={isEditing ? editedUser.phone || "" : user.phone || ""}
          onChange={(e) => handleChange("phone", e.currentTarget.value)}
          readOnly={!isEditing}
          mb="md"
        />

        <Textarea
          label="Address"
          value={isEditing ? editedUser.address || "" : user.address || ""}
          onChange={(e) => handleChange("address", e.currentTarget.value)}
          readOnly={!isEditing}
          mb="md"
        />
      </Card>
    </Container>
  );
};

export default UserProfile;
