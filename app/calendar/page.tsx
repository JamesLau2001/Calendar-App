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

// Define the type for the events by day
type EventsByDay = {
  [key: string]: Event[]; // Keys are day names, values are arrays of events
};

// Define the type for a day (union type for specific day names)
type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState<Day>('Monday');
  const [eventsByDay, setEventsByDay] = useState<EventsByDay>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [newEvent, setNewEvent] = useState<Event>({ time: '', description: '' });

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.time || !newEvent.description) return;

    setEventsByDay({
      ...eventsByDay,
      [selectedDay]: [...eventsByDay[selectedDay], newEvent],
    });

    setNewEvent({ time: '', description: '' });
  };

  const deleteEvent = (time: string) => {
    setEventsByDay({
      ...eventsByDay,
      [selectedDay]: eventsByDay[selectedDay].filter((event) => event.time !== time),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Header selectedDay={selectedDay} />
      <DaySelector
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay} // Pass state updater
        days={Object.keys(eventsByDay) as Day[]} // Cast keys to Day[]
      />
      <AddEventForm newEvent={newEvent} setNewEvent={setNewEvent} addEvent={addEvent} />
      <Calendar events={eventsByDay[selectedDay]} deleteEvent={deleteEvent} />
    </div>
  );
}
