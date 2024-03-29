const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function getJson<T>(
  endpoint: string,
  queryParameters: object = {},
  headers: { [key: string]: string } = {},
): Promise<T> {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);

  for (const [key, value] of Object.entries(queryParameters)) {
    if (value) {
      url.searchParams.append(key, value);
    }
  }

  const response = await fetch(url.href, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
}

async function postJson<T>(
  endpoint: string,
  body: unknown,
  queryParameters: object = {},
  headers: { [key: string]: string } = {},
): Promise<T> {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);

  for (const [key, value] of Object.entries(queryParameters)) {
    if (value) {
      url.searchParams.append(key, value);
    }
  }

  const response = await fetch(url.href, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
}

async function putJson<T>(
  endpoint: string,
  body: unknown,
  queryParameters: object = {},
  headers: { [key: string]: string } = {},
): Promise<T> {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);

  for (const [key, value] of Object.entries(queryParameters)) {
    if (value) {
      url.searchParams.append(key, value);
    }
  }

  const response = await fetch(url.href, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
}

async function deleteJson<T>(
  endpoint: string,
  queryParameters: object = {},
  headers: { [key: string]: string } = {},
): Promise<T> {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);

  for (const [key, value] of Object.entries(queryParameters)) {
    if (value) {
      url.searchParams.append(key, value);
    }
  }

  const response = await fetch(url.href, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
}

export { deleteJson, getJson, postJson, putJson };
