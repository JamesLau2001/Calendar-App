import React from 'react';

// Define props for DaySelector
type DaySelectorProps = {
  selectedDay: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  setSelectedDay: (day: DaySelectorProps['selectedDay']) => void; // Function to update selectedDay
  days: DaySelectorProps['selectedDay'][]; // List of days
};

export default function DaySelector({ selectedDay, setSelectedDay, days }: DaySelectorProps) {
  return (
    <div className="mb-6">
      <label htmlFor="day-selector" className="block text-lg font-semibold mb-2">
        Select a Day:
      </label>
      <select
        id="day-selector"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value as DaySelectorProps['selectedDay'])} // Type casting
        className="p-2 border border-gray-300 rounded-md text-blue-600"
      >
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
}
