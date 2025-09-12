import { useState } from 'react';

export default function Filters({ rovers, cameras, rover, setRover, camera, setCamera, date, setDate, onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearchClick = () => {
    onSearch({ searchText });
  }

  // Largura aumentada e altura uniforme
  const inputClass = "border border-gray-400 p-2 rounded bg-white text-black w-64 h-10";

  return (
    <div className="bg-gray-300 p-6 rounded-lg shadow-md flex flex-col md:flex-row md:justify-center md:items-end gap-6 mb-6 text-black">
      
      {/* Campo de busca textual */}
      <div className="flex flex-col items-start md:items-center">
        <label className="block mb-1 text-sm font-medium text-black">Buscar Rover ou Câmera</label>
        <input
          type="text"
          className={inputClass}
          placeholder="Digite o nome..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>

      {/* Rover */}
      <div className="flex flex-col items-start md:items-center">
        <label className="block mb-1 text-sm font-medium text-black">Rover</label>
        <select
          className={inputClass}
          value={rover}
          onChange={e => setRover(e.target.value)}
        >
          <option value="">Selecione um Rover</option>
          {rovers.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Câmera */}
      <div className="flex flex-col items-start md:items-center">
        <label className="block mb-1 text-sm font-medium text-black">Câmera</label>
        <select
          className={inputClass}
          value={camera}
          onChange={e => setCamera(e.target.value)}
        >
          <option value="">Selecione uma câmera</option>
          {cameras.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Data */}
      <div className="flex flex-col items-start md:items-center">
        <label className="block mb-1 text-sm font-medium text-black">Data</label>
        <input
          type="date"
          className={inputClass}
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      {/* Botão */}
      <div className="flex flex-col items-start md:items-center">
        <label className="block mb-1 text-sm font-medium text-transparent">.</label>
        <button
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition h-10"
          onClick={handleSearchClick}
        >
          Buscar
        </button>
      </div>
    </div>
  )
}
