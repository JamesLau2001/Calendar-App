// components/Calendar.tsx
import TimeSlot from './TimeSlot';

type CalendarProps = {
  events: { time: string; description: string }[];
  deleteEvent: (time: string) => void;
};

export default function Calendar({ events, deleteEvent }: CalendarProps) {
  return (
    <div className="space-y-4">
      {[...Array(24)].map((_, hour) => {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        const event = events.find((event) => event.time === time);
        return <TimeSlot key={time} time={time} event={event} deleteEvent={deleteEvent} />;
      })}
    </div>
  );
}
