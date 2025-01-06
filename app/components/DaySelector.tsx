import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DaySelectorProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

export default function DaySelector({ selectedDate, setSelectedDate }: DaySelectorProps) {
  return (
    <div className="mb-6">
      <label htmlFor="date-selector" className="block text-lg font-semibold mb-2  text-blue-600 w-full">
        Select a Date:
      </label>
      <DatePicker
        id="date-selector"
        selected={selectedDate}
        onChange={(date: Date | null) => {
          if (date) {
            setSelectedDate(date);
          }
        }}
        className="p-2 border border-gray-300 rounded-md text-blue-600 w-full"
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}
