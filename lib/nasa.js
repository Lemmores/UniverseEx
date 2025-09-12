const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY; // variável de ambiente pública para o frontend

// Buscar manifest do rover
export async function fetchManifest(rover) {
  if (!rover) throw new Error("Rover não definido");
  
  const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`);
  
  if (!res.ok) {
    throw new Error(`Erro ao buscar manifest do rover ${rover}: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

// Buscar fotos do rover
export async function fetchPhotos({ rover, camera, earth_date }) {
  if (!rover) throw new Error("Rover não definido");

  const url = new URL(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`);
  if (camera) url.searchParams.append('camera', camera);
  if (earth_date) url.searchParams.append('earth_date', earth_date);
  url.searchParams.append('api_key', API_KEY);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erro ao buscar fotos do rover ${rover}: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
