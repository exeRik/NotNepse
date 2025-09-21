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
import { IconEdit, IconDeviceFloppy, IconX, IconAlertCircle } from "@tabler/icons-react";
import { getUserFromToken } from "../utils/getUserFromToken";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch user info from token on mount
  useEffect(() => {
    try {
      const userFromToken = getUserFromToken();
      if (userFromToken) {
        setUser(userFromToken);
        setEditedUser(userFromToken);
      } else {
        // No token or invalid token
        setUser({ name: "Guest", email: "" });
        setEditedUser({ name: "Guest", email: "" });
        setError("Cannot access user info. Token missing or invalid.");
      }
    } catch (err) {
      setUser({ name: "Guest", email: "" });
      setEditedUser({ name: "Guest", email: "" });
      setError("Error fetching user info.");
      console.error(err);
    }
  }, []);

  const handleChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedUser),
      });

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

          {!isEditing ? (
            <Button leftSection={<IconEdit size={16} />} onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <Group>
              <Button leftSection={<IconDeviceFloppy size={16} />} color="green" onClick={handleSave}>
                Save
              </Button>
              <Button leftSection={<IconX size={16} />} color="gray" variant="light" onClick={handleCancel}>
                Cancel
              </Button>
            </Group>
          )}
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
