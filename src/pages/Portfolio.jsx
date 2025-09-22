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
  FileInput,
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
  const [editedUser, setEditedUser] = useState({});
  const [error, setError] = useState("");
  const [profileFile, setProfileFile] = useState(null);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Showing guest profile.");
        const guestProfile = {
          name: "Guest",
          email: "guest@example.com",
          phoneNumber: "",
          address: "",
          dateOfBirth: "",
          bio: "",
          profilePicture: "",
        };
        setUser(guestProfile);
        setEditedUser(guestProfile);
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

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      const profile = {
        name: data.name,
        email: data.email,
        role: data.role,
        phoneNumber: data.profile?.phoneNumber || "",
        address: data.profile?.address || "",
        dateOfBirth: data.profile?.dateOfBirth || "",
        bio: data.profile?.bio || "",
        profilePicture: data.profile?.profilePicture || "",
      };

      setUser(profile);
      setEditedUser(profile);
    } catch (err) {
      console.error(err);
      setError("Error fetching user profile. Showing guest profile.");
      const guestProfile = {
        name: "Guest",
        email: "guest@example.com",
        phoneNumber: "",
        address: "",
        dateOfBirth: "",
        bio: "",
        profilePicture: "",
      };
      setUser(guestProfile);
      setEditedUser(guestProfile);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  // Save updated profile
const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Guests cannot update profile. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("phoneNumber", editedUser.phoneNumber);
    formData.append("address", editedUser.address);
    formData.append("dateOfBirth", editedUser.dateOfBirth);
    formData.append("bio", editedUser.bio);
    if (profileFile) formData.append("profilePicture", profileFile);

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/profile/update`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type manually for FormData
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to update profile");
    }

    // Option 1: call fetchUserProfile again to refresh from backend
    await fetchUserProfile();

    setIsEditing(false);
    setProfileFile(null);
  } catch (err) {
    console.error(err);
    setError("Could not save profile: " + err.message);
  }
};



  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
    setProfileFile(null);
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
            <Avatar
              size="xl"
              radius="xl"
              color="blue"
              src={user.profilePicture || ""}
            >
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

          {/* Edit/Save buttons */}
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

        <form encType="multipart/form-data">
          {/* Readonly fields */}
          <TextInput label="Full Name" value={user.name || ""} readOnly mb="md" />
          <TextInput label="Email" value={user.email || ""} readOnly mb="md" />

          {/* Editable fields */}
          <TextInput
            label="Phone"
            value={editedUser.phoneNumber || ""}
            onChange={(e) => handleChange("phoneNumber", e.currentTarget.value)}
            readOnly={!isEditing}
            mb="md"
          />

          <Textarea
            label="Address"
            value={editedUser.address || ""}
            onChange={(e) => handleChange("address", e.currentTarget.value)}
            readOnly={!isEditing}
            mb="md"
          />

          <TextInput
            label="DOB"
            value={editedUser.dateOfBirth || ""}
            onChange={(e) => handleChange("dateOfBirth", e.currentTarget.value)}
            readOnly={!isEditing}
            mb="md"
          />

          <TextInput
            label="Bio"
            value={editedUser.bio || ""}
            onChange={(e) => handleChange("bio", e.currentTarget.value)}
            readOnly={!isEditing}
            mb="md"
          />

          {/* Profile Picture Upload */}
          {isEditing && (
            <FileInput
              name="profilePicture"
              label="Profile Picture"
              placeholder="Choose an image"
              accept="image/*"
              onChange={(file) => setProfileFile(file)}
              mt="md"
              clearable
            />
          )}
        </form>
      </Card>
    </Container>
  );
};

export default UserProfile;
