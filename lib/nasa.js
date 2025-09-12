// lib/nasa.js
const BASE = 'https://api.nasa.gov/mars-photos/api/v1';

export async function fetchManifest(rover) {
  const key = process.env.NEXT_PUBLIC_NASA_API_KEY;
  const res = await fetch(`${BASE}/manifests/${rover}?api_key=${key}`);
  return res.json();
}

export async function fetchPhotos({ rover='curiosity', earth_date, camera, page=1 }) {
  const key = process.env.NEXT_PUBLIC_NASA_API_KEY;
  const params = new URLSearchParams({ api_key: key, page: String(page) });
  if (earth_date) params.set('earth_date', earth_date);
  if (camera) params.set('camera', camera);
  const res = await fetch(`${BASE}/rovers/${rover}/photos?${params.toString()}`);
  return res.json(); // { photos: [...] }
}
