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
import { Link } from 'react-router-dom';

export default function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement signup logic (e.g., check if passwords match, API call)
    console.log("Signup form submitted");
  };

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
          autoComplete="new-password"
          required
          mt="md"
          radius="md"
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          required
          mt="md"
          radius="md"
        />

        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
        </Group>

        <Button type="submit" fullWidth mt="xl" radius="md">
          Sign up
        </Button>
      </Paper>
    </Container>
  );
}
