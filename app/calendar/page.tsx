'use client';

import { useState } from 'react';
import Header from '../components/Header';
import DaySelector from '../components/DaySelector';
import AddEventForm from '../components/AddEventForm';
import Calendar from '../components/Calendar';

// Define the type for an event
type Event = {
  time: string;
  description: string;
};

// Define the type for events grouped by date
type EventsByDate = {
  [key: string]: Event[]; // Keys are date strings (e.g., "2025-01-12"), values are arrays of events
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [eventsByDate, setEventsByDate] = useState<EventsByDate>({});
  const [newEvent, setNewEvent] = useState<Event>({ time: '', description: '' });

  const formatDate = (date: Date): string => {
    // Format the date as "YYYY-MM-DD" (ISO format)
    return date.toISOString().split('T')[0];
  };

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.time || !newEvent.description) return;

    const dateKey = formatDate(selectedDate);

    setEventsByDate({
      ...eventsByDate,
      [dateKey]: [...(eventsByDate[dateKey] || []), newEvent], // Add the event to the selected date
    });

    setNewEvent({ time: '', description: '' });
  };

  const deleteEvent = (time: string) => {
    const dateKey = formatDate(selectedDate);

    setEventsByDate({
      ...eventsByDate,
      [dateKey]: (eventsByDate[dateKey] || []).filter((event) => event.time !== time),
    });
  };

  const dateKey = formatDate(selectedDate);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Header selectedDate={selectedDate.toDateString()} />
      <DaySelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <AddEventForm newEvent={newEvent} setNewEvent={setNewEvent} addEvent={addEvent} />
      <Calendar events={eventsByDate[dateKey] || []} deleteEvent={deleteEvent} />
    </div>
  );
}
