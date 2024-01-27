async function getJson<T>(
  endpoint: string,
  queryParameters: { [key: string]: any } = {},
  headers: { [key: string]: any } = {},
): Promise<T> {
  var url = new URL(`${process.env.REACT_APP_API_BASE_URL}/${endpoint}`);

  for (const key in queryParameters) {
    url.searchParams.append(key, queryParameters[key]);
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
  body: any,
  queryParameters: { [key: string]: any } = {},
  headers: { [key: string]: any } = {},
): Promise<T> {
  var url = new URL(`${process.env.REACT_APP_API_BASE_URL}/${endpoint}`);

  for (const key in queryParameters) {
    url.searchParams.append(key, queryParameters[key]);
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

export { getJson, postJson };
