// components/AddEventForm.tsx
type AddEventFormProps = {
    newEvent: { time: string; description: string };
    setNewEvent: (event: { time: string; description: string }) => void;
    addEvent: (e: React.FormEvent) => void;
  };
  
  export default function AddEventForm({ newEvent, setNewEvent, addEvent }: AddEventFormProps) {
    return (
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
          className="p-2 border border-gray-300 flex-1 text-black rounded-md"
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
    );
  }
  