import Image from 'next/image';
import { useState } from 'react';

// Componente separado para cada foto
function PhotoCard({ photo }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white p-2 rounded-lg shadow hover:shadow-lg transition">
      {!imgError ? (
        <Image
          src={photo.img_src}
          alt={`${photo.rover.name} ${photo.camera.full_name}`}
          width={400}
          height={300}
          className="rounded-lg"
          unoptimized
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center rounded-lg">
          <span className="text-gray-700">Imagem indisponível</span>
        </div>
      )}
      <p className="text-sm mt-2 font-medium text-gray-800">{photo.rover.name} - {photo.camera.full_name}</p>
      <p className="text-xs text-gray-500">Data: {photo.earth_date}</p>
    </div>
  );
}

// Componente Gallery principal
export default function Gallery({ photos }) {
  if (!photos || photos.length === 0)
    return <p className="text-center mt-6">Nenhuma foto encontrada.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {photos.map(photo => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
