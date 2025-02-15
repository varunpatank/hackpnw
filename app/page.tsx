'use client';

import { useRouter } from 'next/navigation';
import { AppShell, Group, Title, Button, Container, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { MapIcon, Trophy, Users, ChevronRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-blue-50">
      <AppShell.Header className="border-b border-blue-100 bg-white">
        <Container size="xl">
          <Group h={60} px="md" justify="space-between">
            <Group>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <MapIcon className="text-blue-600" size={24} />
              </motion.div>
              <Title order={1} size="h3" className="text-gray-800">Seattle Challenge Explorer</Title>
            </Group>
            <Group>
              <Button
                variant="subtle"
                leftSection={<Trophy size={16} />}
                onClick={() => router.push('/leaderboard')}
                className="text-blue-600 hover:bg-blue-50"
              >
                Leaderboard
              </Button>
              <Button
                variant="subtle"
                leftSection={<Users size={16} />}
                className="text-blue-600 hover:bg-blue-50"
              >
                Friends
              </Button>
              <Button
                variant="filled"
                onClick={() => router.push('/login')}
                className="bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <main className="pt-20 pb-16">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Title className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
                Discover Seattle Through
                <span className="text-blue-600"> Exciting Challenges</span>
              </Title>
              <Text size="xl" c="dimmed" className="max-w-lg">
                Explore the city, complete challenges, and earn points while discovering hidden gems and creating unforgettable memories.
              </Text>
              <div className="space-y-4">
                <Button
                  size="lg"
                  rightSection={<ChevronRight size={16} />}
                  onClick={() => router.push('/login')}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Start Your Adventure
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { number: '50+', label: 'Challenges' },
                  { number: '1000+', label: 'Active Explorers' },
                  { number: '10k+', label: 'Points Awarded' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <Text className="text-2xl font-bold text-blue-600">{stat.number}</Text>
                    <Text size="sm" c="dimmed">{stat.label}</Text>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1502175353174-a7a70e73b362"
                  alt="Seattle Skyline"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </Container>
      </main>
    </div>
  );
}