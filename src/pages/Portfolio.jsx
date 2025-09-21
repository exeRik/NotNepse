import React, { useState } from "react";
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
} from "@mantine/core";
import {
  IconEdit,
  IconDeviceFloppy,
  IconX,
} from "@tabler/icons-react";

const UserProfile = () => {
  // ✅ Static dummy data
  const staticUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, Springfield",
    role: "Admin",
    createdAt: "2023-05-01T12:00:00Z",
  };

  const [user, setUser] = useState(staticUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(staticUser);

  const handleChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <Container size="sm" py="xl">
      <Title order={2} mb="md" ta="center">
        User Profile
      </Title>

      <Card shadow="md" radius="md" withBorder>
        {/* Header */}
        <Group justify="space-between" mb="lg">
          <Group>
            <Avatar size="xl" radius="xl" color="blue">
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <Title order={3}>{user.name}</Title>
              <Text c="dimmed">{user.email}</Text>
              {user.role && (
                <Badge color="blue" variant="light" mt="xs">
                  {user.role}
                </Badge>
              )}
            </div>
          </Group>

          {!isEditing ? (
            <Button
              leftSection={<IconEdit size={16} />}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
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
          value={isEditing ? editedUser.phone : user.phone}
          onChange={(e) => handleChange("phone", e.currentTarget.value)}
          readOnly={!isEditing}
          mb="md"
        />

        <Textarea
          label="Address"
          value={isEditing ? editedUser.address : user.address}
          onChange={(e) => handleChange("address", e.currentTarget.value)}
          readOnly={!isEditing}
          mb="md"
        />

        {user.createdAt && (
          <Text mt="md" c="dimmed" size="sm">
            Member since:{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        )}
      </Card>
    </Container>
  );
};

export default UserProfile;
