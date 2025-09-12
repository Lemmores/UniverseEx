const API_KEY = process.env.NASA_API_KEY; 

export async function fetchManifest(rover) {
  const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`);
  return res.json();
}

export async function fetchPhotos({ rover, camera, earth_date }) {
  const url = new URL(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`);
  if (camera) url.searchParams.append('camera', camera);
  if (earth_date) url.searchParams.append('earth_date', earth_date);
  url.searchParams.append('api_key', API_KEY);

  const res = await fetch(url);
  return res.json();
}
