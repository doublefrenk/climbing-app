const API_BASE_URL = 'http://localhost:3000';

export async function authFetch(url, options = {}, getToken) {
  const token = await getToken();

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  // Don't set Content-Type for FormData (browser sets multipart boundary automatically)
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  return fetch(`${API_BASE_URL}${url}`, { ...options, headers });
}
