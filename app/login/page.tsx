'use client';

import { useState } from 'react';
import { TextInput, PasswordInput, Checkbox, Button, Paper, Title, Text, Container } from '@mantine/core';
import { motion } from 'framer-motion';
import { MapIcon, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <Container size="xs" className="min-h-screen flex items-center justify-center bg-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Paper radius="lg" p="xl" withBorder className="bg-white shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MapIcon size={48} className="text-blue-600 mb-4" />
            </motion.div>
            <Title order={1} className="text-2xl font-bold text-center mb-2 text-gray-800">
              Welcome Back
            </Title>
            <Text c="dimmed" size="sm">
              Sign in to continue your journey
            </Text>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              leftSection={<Mail size={16} className="text-blue-600" />}
              classNames={{
                input: "focus:border-blue-600",
                label: "text-gray-700"
              }}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              leftSection={<Lock size={16} className="text-blue-600" />}
              classNames={{
                input: "focus:border-blue-600",
                label: "text-gray-700"
              }}
            />

            <div className="flex items-center justify-between mt-2">
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.currentTarget.checked)}
                classNames={{
                  input: "checked:bg-blue-600 checked:border-blue-600"
                }}
              />
              <Button 
                variant="subtle"
                size="sm"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              fullWidth
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
}