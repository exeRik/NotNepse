// src/components/ForgetPassword.jsx
import React, { useState } from "react";
import { TextInput, Button, Stack, Alert } from "@mantine/core";
import { CheckCircle } from "lucide-react";

const ForgetPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending reset link to:", email);
    setSuccess(true);
    setEmail("");
    setTimeout(() => {
      setSuccess(false);
      if (onClose) onClose();
    }, 3000);
  };

  return (
    <Stack spacing="md">
      {success && (
        <Alert icon={<CheckCircle size={18} />} title="Success" color="green">
          Reset link sent to your email!
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing="sm">
          <TextInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" color="blue">
            Send Reset Link
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default ForgetPassword;
