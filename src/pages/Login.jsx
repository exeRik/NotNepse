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
import classes from '../components/Signup.module.css'; // Make sure styles match usage
import { Link } from 'react-router-dom';

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic (e.g., API call)
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
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          autoComplete="current-password"
          required
          mt="md"
          radius="md"
        />

        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>

        <Button type="submit" fullWidth mt="xl" radius="md">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
