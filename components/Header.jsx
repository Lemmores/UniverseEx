// components/Header.jsx
export default function Header() {
  return (
    <header className="bg-red-600 text-white sticky top-0 z-10 shadow-md">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">UniverseEx</h1>
        <nav className="text-sm opacity-80">NASA Mars Rover Photos API</nav>
      </div>
    </header>
  )
}
