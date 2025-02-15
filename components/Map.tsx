'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Paper, Button, Modal, TextInput, Textarea, NumberInput, FileInput, Stack, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Camera, Clock, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define marker icon outside of component to prevent recreation
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const SEATTLE_CENTER: [number, number] = [47.6062, -122.3321];

const challenges = [
  {
    id: 1,
    title: 'Space Needle Visit',
    location: [47.6205, -122.3493] as [number, number],
    category: 'cultural',
    points: 100,
    description: 'Visit the iconic Space Needle and take in the panoramic views of Seattle.',
    difficulty: 'Easy',
    estimatedTime: '1-2 hours'
  },
  {
    id: 2,
    title: 'Pike Place Market Food Tour',
    location: [47.6097, -122.3422] as [number, number],
    category: 'food',
    points: 75,
    description: 'Sample local delicacies at the historic Pike Place Market.',
    difficulty: 'Medium',
    estimatedTime: '2-3 hours'
  },
];

interface MapProps {
  onChallengeClick?: () => void;
}

export default function Map({ onChallengeClick }: MapProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<typeof challenges[0] | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Paper shadow="sm" p="md" radius="lg" className="h-full bg-white">
        <MapContainer
          center={SEATTLE_CENTER}
          zoom={13}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {challenges.map((challenge) => (
            <Marker
              key={challenge.id}
              position={challenge.location}
              icon={icon}
            >
              <Popup>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4"
                >
                  <h3 className="font-bold text-lg mb-2 text-blue-600">{challenge.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-blue-400" />
                    <span className="text-sm text-gray-600">{challenge.estimatedTime}</span>
                  </div>
                  <p className="text-sm font-semibold mb-3 text-blue-600">Points: {challenge.points}</p>
                  <Button
                    fullWidth
                    className="bg-blue-600 hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setSelectedChallenge(challenge);
                      if (onChallengeClick) onChallengeClick();
                      open();
                    }}
                  >
                    Log Completion
                  </Button>
                </motion.div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Paper>

      <Modal
        opened={opened}
        onClose={close}
        title="Log Challenge Completion"
        size="lg"
      >
        <AnimatePresence>
          {selectedChallenge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Stack spacing="xl">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-blue-600">{selectedChallenge.title}</h2>
                  <Text size="sm" c="dimmed">{selectedChallenge.description}</Text>
                </div>
                
                <FileInput
                  label="Upload Photo"
                  placeholder="Choose photo"
                  accept="image/*"
                  icon={<Camera size={16} />}
                  required
                  size="md"
                  classNames={{
                    input: "focus:border-blue-600",
                    label: "text-gray-700"
                  }}
                />

                <NumberInput
                  label="Time Spent (minutes)"
                  placeholder="Enter time in minutes"
                  min={1}
                  required
                  size="md"
                  icon={<Clock size={16} />}
                  classNames={{
                    input: "focus:border-blue-600",
                    label: "text-gray-700"
                  }}
                />

                <Textarea
                  label="What was your favorite part?"
                  placeholder="Share your experience..."
                  minRows={3}
                  required
                  size="md"
                  icon={<Heart size={16} />}
                  classNames={{
                    input: "focus:border-blue-600",
                    label: "text-gray-700"
                  }}
                />

                <Group justify="flex-end" mt="xl">
                  <Button 
                    variant="light" 
                    onClick={close}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      close();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Submit Completion
                  </Button>
                </Group>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
}