// components/Header.tsx
type HeaderProps = {
    selectedDay: string;
  };
  
  export default function Header({ selectedDay }: HeaderProps) {
    return (
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{selectedDay}'s Calendar</h1>
        <p className="text-gray-600">Plan your day effectively!</p>
      </header>
    );
  }
  