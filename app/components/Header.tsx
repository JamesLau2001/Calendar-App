// components/Header.tsx
type HeaderProps = {
  selectedDate: string;
  };
  
  export default function Header({ selectedDate }: HeaderProps) {
    return (
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{selectedDate}'s Calendar</h1>
        <p className="text-gray-600">Plan your day effectively!</p>
      </header>
    );
  }
  