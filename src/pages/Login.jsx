import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from '../components/Signup.module.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {

  const navigate = useNavigate();

  const url= import.meta.env.VITE_BASE_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle} ta="center" mt={5}>
        Don't have an account yet?{' '}
        <Anchor component={Link} to="/signup">
          Create an account
        </Anchor>
      </Text>

      <Paper
        component="form"
        withBorder
        shadow="sm"
        p={22}
        mt={30}
        radius="md"
        onSubmit={handleSubmit}
      >
        <TextInput
          label="Email"
          placeholder="you@gmail.com"
          type="email"
          autoComplete="email"
          required
          radius="md"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          autoComplete="current-password"
          required
          mt="md"
          radius="md"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>

 <Button
      onClick={() => {
        fetch(`${url}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email, password}) 
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Signup NOT SUCCESSFUL!!");
            }
            return response.json();
          })
          .then(data => {
            console.log(data.token)
            localStorage.setItem("token", data.token);
            navigate("/dashboard"); 
          })
          .catch(error => {
            alert("Something went wrong: " + error.message);
            console.error("Login error:", error);
          });
      }}
      type="submit"
      fullWidth
      mt="xl"
      radius="md"
    >
      Login
    </Button>
      </Paper>
    </Container>
  );
}
