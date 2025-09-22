import React, { useState } from "react";
import {
  Lock,
  Bell,
  Eye,
  Globe,
  Moon,
  Sun,
  CheckCircle,
} from "lucide-react";
import {
  Container,
  Title,
  Text,
  Paper,
  Group,
  Switch,
  Button,
  PasswordInput,
  Select,
  Divider,
  Alert,
  Stack,
  Modal,
} from "@mantine/core";
import ForgetPassword from "../components/ForgetPassword"; // adjust path

const Settings = () => {
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [forgetModalOpen, setForgetModalOpen] = useState(false);

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (field, value) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    setTimeout(() => {
      setShowPasswordSuccess(true);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setShowPasswordSuccess(false), 3000);
    }, 500);
  };

  return (
    <Container size="lg" py="xl">
      <Stack spacing="xl">
        {/* Page Header */}
        <div style={{ textAlign: "center" }}>
          <Title order={2} mb="xs">
            Settings
          </Title>
          <Text color="dimmed">
            Manage your account preferences and security settings
          </Text>
        </div>

        {/* Success Message */}
        {showPasswordSuccess && (
          <Alert
            icon={<CheckCircle size={18} />}
            title="Success"
            color="green"
            radius="md"
          >
            Password updated successfully!
          </Alert>
        )}

        {/* Security Section */}
        <Paper withBorder shadow="sm" radius="md" p="xl">
          <Group mb="md" align="center" spacing="sm">
            <Lock color="var(--mantine-color-blue-6)" />
            <Title order={3}>Security</Title>
          </Group>
          <Text size="sm" color="dimmed" mb="lg">
            Manage your password and security preferences
          </Text>

          <form onSubmit={handlePasswordSubmit}>
            <Stack spacing="md">
              <PasswordInput
                label="Current Password"
                placeholder="Enter current password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  handlePasswordChange("currentPassword", e.target.value)
                }
                required
              />
              <Group grow>
                <PasswordInput
                  label="New Password"
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    handlePasswordChange("newPassword", e.target.value)
                  }
                  required
                />
                <PasswordInput
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange("confirmPassword", e.target.value)
                  }
                  required
                />
              </Group>
              <Button type="submit" color="blue">
                Update Password
              </Button>

              {/* Forget Password Button */}
              <Button
                variant="outline"
                color="red"
                onClick={() => setForgetModalOpen(true)}
              >
                Forgot Password?
              </Button>
            </Stack>
          </form>

          <Divider my="lg" />

          <Stack spacing="md">
            <Switch label="Two-Factor Authentication" />
            <Switch label="Login Alerts" defaultChecked />
          </Stack>
        </Paper>

        {/* Notifications Section */}
        <Paper withBorder shadow="sm" radius="md" p="xl">
          <Group mb="md" align="center" spacing="sm">
            <Bell color="var(--mantine-color-green-6)" />
            <Title order={3}>Notifications</Title>
          </Group>
          <Text size="sm" color="dimmed" mb="lg">
            Choose what notifications you want to receive
          </Text>

          <Stack spacing="md">
            <Switch label="Email Notifications" defaultChecked />
            <Switch label="SMS Notifications" />
            <Switch label="Push Notifications" defaultChecked />
            <Switch label="Security Alerts" defaultChecked />
            <Switch label="Marketing Emails" />
            <Switch label="Weekly Digest" defaultChecked />
            <Switch label="Stock Updates" defaultChecked />
          </Stack>
        </Paper>

        {/* Privacy Section */}
        <Paper withBorder shadow="sm" radius="md" p="xl">
          <Group mb="md" align="center" spacing="sm">
            <Eye color="var(--mantine-color-indigo-6)" />
            <Title order={3}>Privacy</Title>
          </Group>
          <Text size="sm" color="dimmed" mb="lg">
            Control your privacy and data sharing preferences
          </Text>

          <Stack spacing="md">
            <Select
              label="Profile Visibility"
              data={[
                { value: "public", label: "Public" },
                { value: "friends", label: "Friends Only" },
                { value: "private", label: "Private" },
              ]}
              defaultValue="public"
            />
            <Switch label="Show Email Address" />
            <Switch label="Show Phone Number" />
          </Stack>
        </Paper>

        {/* Preferences Section */}
        <Paper withBorder shadow="sm" radius="md" p="xl">
          <Group mb="md" align="center" spacing="sm">
            <Globe color="var(--mantine-color-indigo-6)" />
            <Title order={3}>Preferences</Title>
          </Group>
          <Text size="sm" color="dimmed" mb="lg">
            Customize your experience
          </Text>

          <Stack spacing="md">
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.currentTarget.checked)}
              label={
                <Group spacing="xs">
                  {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                  <span>Dark Mode</span>
                </Group>
              }
            />

            <Select
              label="Language"
              value={language}
              onChange={setLanguage}
              data={[
                { value: "en", label: "English" },
                { value: "es", label: "Spanish" },
                { value: "fr", label: "French" },
                { value: "de", label: "German" },
                { value: "it", label: "Italian" },
              ]}
            />
          </Stack>
        </Paper>
      </Stack>

      {/* Forget Password Modal */}
      <Modal
        opened={forgetModalOpen}
        onClose={() => setForgetModalOpen(false)}
        title="Reset Password"
      >
        <ForgetPassword onClose={() => setForgetModalOpen(false)} />
      </Modal>
    </Container>
  );
};

export default Settings;
