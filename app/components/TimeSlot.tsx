// components/TimeSlot.tsx
type TimeSlotProps = {
    time: string;
    event: { time: string; description: string } | undefined;
    deleteEvent: (time: string) => void;
  };
  
  export default function TimeSlot({ time, event, deleteEvent }: TimeSlotProps) {
    return (
      <div
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
  }
  