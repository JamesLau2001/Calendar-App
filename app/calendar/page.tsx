"use client";

import React from "react";
import { useState } from "react";

const CalendarPage = () => {
  const [events, setEvents] = useState<{ time: string; description: string }[]>(
    []
  );
  const [newEvent, setNewEvent] = useState({ time: "", description: "" });

  // Add an event to the list
  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newEvent.time ||
      !newEvent.description ||
      !/^\d{2}:00$/.test(newEvent.time)
    ) {
      alert("Please select a whole hour (e.g., 00:00, 01:00, etc.)");
      return;
    }

    setEvents([...events, newEvent]);
    setNewEvent({ time: "", description: "" });
  };

  // Delete an event from the list
  const deleteEvent = (time: string) => {
    setEvents(events.filter((event) => event.time !== time));
  };

  return (
    <div>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Monday's Calendar</h1>
        <p className="text-gray-600">Plan your day effectively!</p>
      </header>

      <main className="max-w-3xl mx-auto">
        {/* Add Event Form */}
        <form
          onSubmit={addEvent}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <select
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            className="p-2 border border-gray-300 rounded-md flex-1 text-blue-600"
            required
          >
            {/* Generate options for each whole hour */}
            {[...Array(24)].map((_, hour) => {
              const time = `${hour.toString().padStart(2, "0")}:00`;
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
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
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
            const time = `${hour.toString().padStart(2, "0")}:00`;
            const event = events.find((event) => event.time === time);
            return (
              <div
                key={time}
                className="flex items-center justify-between p-4 bg-white rounded-md shadow"
              >
                <div>
                  <span className="font-bold text-blue-600">{time}</span>
                  {event && (
                    <p className="text-gray-700 mt-1">{event.description}</p>
                  )}
                </div>
                {event && (
                  <button
                    onClick={() => deleteEvent(time)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
