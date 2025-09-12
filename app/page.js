'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filters from '../components/Filters';
import Gallery from '../components/Gallery';
import { fetchManifest, fetchPhotos } from '../lib/nasa';

export default function Page() {
  const [rovers] = useState(['curiosity','opportunity','spirit','perseverance']);
  const [rover, setRover] = useState('');
  const [cameras, setCameras] = useState([]);
  const [camera, setCamera] = useState('');
  const [date, setDate] = useState('');
  const [photos, setPhotos] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 12;

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const totalPages = Math.ceil(photos.length / photosPerPage);

  // Carregar fotos iniciais de todos os rovers e todas as câmeras
  useEffect(() => {
    async function loadInitial() {
      let allPhotos = [];
      let allCameras = new Set();

      for (const r of rovers) {
        const manifest = await fetchManifest(r);
        const maxDate = manifest.photo_manifest.max_date;

        const data = await fetchPhotos({ rover: r, earth_date: maxDate });
        allPhotos = allPhotos.concat(data.photos);

        // Adiciona todas as câmeras do rover
        manifest.photo_manifest.photos.forEach(p => {
          p.cameras.forEach(c => allCameras.add(c));
        });
      }

      setPhotos(allPhotos);
      setCameras([...allCameras]);
      setNoResults(false);
    }

    loadInitial();
  }, [rovers]);

  // Atualizar câmeras quando o usuário escolher um rover
  useEffect(() => {
    if (!rover) return;

    async function loadManifest() {
      const manifest = await fetchManifest(rover);
      const cams = manifest.photo_manifest.photos.flatMap(p => p.cameras);
      setCameras([...new Set(cams)]);
      setCamera('');
      setDate('');
    }

    loadManifest();
  }, [rover]);

  // Função de busca: recebe também o searchText do campo de busca textual
  const handleSearch = async ({ searchText = '' } = {}) => {
    let results = [];

    // Nenhum filtro → galeria inicial
    if (!rover && !camera && !date && !searchText) {
      let allPhotos = [];
      for (const r of rovers) {
        const manifest = await fetchManifest(r);
        const maxDate = manifest.photo_manifest.max_date;
        const data = await fetchPhotos({ rover: r, earth_date: maxDate });
        allPhotos = allPhotos.concat(data.photos);
      }
      setPhotos(allPhotos);
      setNoResults(false);
      setCurrentPage(1);
      return;
    }

    // Lista de rovers para buscar
    const roversToSearch = rover ? [rover] : rovers;

    for (const r of roversToSearch) {
      const manifest = await fetchManifest(r);
      const searchDate = date || manifest.photo_manifest.max_date;

      const data = await fetchPhotos({
        rover: r,
        camera: camera || undefined,
        earth_date: searchDate
      });

      results = results.concat(data.photos);
    }

    // Filtrar pelo texto digitado, se houver
    if (searchText) {
      results = results.filter(p =>
        p.rover.name.toLowerCase().includes(searchText.toLowerCase()) ||
        p.camera.full_name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setPhotos(results);
    setNoResults(results.length === 0);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-black text-center">Mars Rover Gallery</h2>

        <Filters
          rovers={rovers}
          cameras={cameras}
          rover={rover} setRover={setRover}
          camera={camera} setCamera={setCamera}
          date={date} setDate={setDate}
          onSearch={handleSearch}
        />

        {noResults ? (
          <p className="text-center text-red-600 font-semibold mt-6">
            Nenhuma foto encontrada com os filtros selecionados.
          </p>
        ) : (
          <Gallery photos={currentPhotos} />
        )}

        {totalPages > 1 && !noResults && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i+1}
                className={`px-3 py-1 rounded ${currentPage === i+1 ? 'bg-red-600 text-white' : 'bg-gray-300'}`}
                onClick={() => setCurrentPage(i+1)}
              >
                {i+1}
              </button>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
