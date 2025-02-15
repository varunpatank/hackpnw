'use client';

import { useState } from 'react';
import { AppShell, Group, Stack, Text, Container, Grid, Paper, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { Compass, Book, Coffee, Mountain } from 'lucide-react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

const categories = [
  {
    id: 1,
    name: 'Adventure',
    icon: Compass,
    description: 'Explore thrilling outdoor activities',
    points: 500,
    color: '#2563eb'
  },
  {
    id: 2,
    name: 'Cultural',
    icon: Book,
    description: 'Discover local art and history',
    points: 400,
    color: '#3b82f6'
  },
  {
    id: 3,
    name: 'Food & Drink',
    icon: Coffee,
    description: 'Taste Seattle\'s finest cuisine',
    points: 300,
    color: '#60a5fa'
  },
  {
    id: 4,
    name: 'Nature',
    icon: Mountain,
    description: 'Connect with the outdoors',
    points: 450,
    color: '#93c5fd'
  }
];

export default function Dashboard() {
  return (
    <>
      <Header />
      <AppShell.Main className="bg-blue-50">
        <Container size="xl" py="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid gutter="lg" mb="xl">
              {categories.map((category, index) => (
                <Grid.Col key={category.id} span={{ base: 12, sm: 6, md: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper
                      p="xl"
                      radius="lg"
                      className="category-card"
                    >
                      <div className="category-icon" style={{ backgroundColor: `${category.color}15` }}>
                        <category.icon size={24} style={{ color: category.color }} />
                      </div>
                      <Title order={3} className="text-xl mb-2">{category.name}</Title>
                      <Text size="sm" c="dimmed" mb="md">{category.description}</Text>
                      <Text size="sm" className="font-semibold text-blue-600">Up to {category.points} points</Text>
                    </Paper>
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>

            <Paper shadow="sm" p="md" radius="lg" className="h-[500px] bg-white">
              <Map onChallengeClick={() => {}} />
            </Paper>
          </motion.div>
        </Container>
      </AppShell.Main>
    </>
  );
}