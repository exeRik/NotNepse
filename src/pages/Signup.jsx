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
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Signup form submitted");
  };
  const url= import.meta.env.VITE_BASE_URL;
  console.log("url",url)

  return (

    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Create an account
      </Title>

      <Text className={classes.subtitle} ta="center" mt={5}>
        Go back to login?{' '}
        <Anchor component={Link} to="/login">
          Log in
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
          label="Name"
          placeholder="you@gmail.com"
          type="name"
          autoComplete="name"
          required
          radius="md"
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email"
          placeholder="guest@gmail.com"
          type="email"
          autoComplete="email"
          required
          radius="md"
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          autoComplete="new-password"
          required
          mt="md"
          radius="md"
          onChange={(e) => setPassword(e.target.value)}
        />
{/* 
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          required
          mt="md"
          radius="md"
        /> */}

        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
        </Group>

 <Button
      onClick={() => {
        fetch(`${url}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({name, email, password}) 
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Signup NOT SUCCESSFUL!!");
            }
            return response.json();
          })
          .then(data => {
            alert("Signup success:", data);
            navigate("/login"); 
          })
          .catch(error => {
            alert("Something went wrong: " + error.message);
            console.error("Signup error:", error);
          });
      }}
      type="submit"
      fullWidth
      mt="xl"
      radius="md"
    >
      Signup
    </Button>
      </Paper>
    </Container>
  );
}
