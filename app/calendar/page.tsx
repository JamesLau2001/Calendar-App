'use client';
import { useState } from 'react';

// Define types for events and the state
type Event = {
  time: string;
  description: string;
};

type EventsByDay = {
  [key: string]: Event[]; // Keys are day names, values are arrays of events
};

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
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

  // Add Event Function
  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.time || !newEvent.description) return;

    setEventsByDay({
      ...eventsByDay,
      [selectedDay]: [...eventsByDay[selectedDay], newEvent],
    });

    setNewEvent({ time: '', description: '' }); // Reset form
  };

  // Delete Event Function
  const deleteEvent = (time: string) => {
    setEventsByDay({
      ...eventsByDay,
      [selectedDay]: eventsByDay[selectedDay].filter((event) => event.time !== time),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{selectedDay}'s Calendar</h1>
        <p className="text-gray-600">Plan your day effectively!</p>
      </header>

      {/* Day Selector */}
      <div className="mb-6">
        <label htmlFor="day-selector" className="block text-lg font-semibold mb-2">
          Select a Day:
        </label>
        <select
          id="day-selector"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-blue-600"
        >
          {Object.keys(eventsByDay).map((day) => (
            <option key={day} value={day} className="text-blue-600">
              {day}
            </option>
          ))}
        </select>
      </div>

      {/* Add Event Form */}
      <form onSubmit={addEvent} className="mb-8 flex flex-col md:flex-row gap-4">
        <select
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          className="p-2 border border-gray-300 rounded-md flex-1 text-blue-600"
          required
        >
          <option value="" disabled className="text-gray-400">
            Select a time
          </option>
          {[...Array(24)].map((_, hour) => {
            const time = `${hour.toString().padStart(2, '0')}:00`;
            return (
              <option
                key={time}
                value={time}
                className="text-blue-600 bg-gray-100 hover:bg-blue-200"
              >
                {time}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          className="p-2 border border-gray-300 rounded-md flex-1"
          placeholder="Event Description"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Event
        </button>
      </form>

      {/* Time Slots */}
      <div className="space-y-4">
        {[...Array(24)].map((_, hour) => {
          const time = `${hour.toString().padStart(2, '0')}:00`;
          const event = eventsByDay[selectedDay].find((event) => event.time === time);

          return (
            <div
              key={time}
              className="flex items-center justify-between p-4 bg-white rounded-md shadow hover:bg-gray-100"
            >
              <div>
                <span className="font-bold text-blue-600">{time}</span>
                {event && <p className="text-gray-700 mt-1">{event.description}</p>}
              </div>
              {event && (
                <button
                  onClick={() => deleteEvent(time)}
                  className="text-red-500 hover:text-red-700 hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
