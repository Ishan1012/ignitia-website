import EventDetailScreen from '@/screen/EventDetailScreen'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'

const Event: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const eventId: number = Number(id);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EventDetailScreen eventId={eventId} />
    </>
  )
}

export default Event