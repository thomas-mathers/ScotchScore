async function getJson<T>(
  endpoint: string,
  queryParams: { [key: string]: any } = {}
): Promise<T> {
  var url = new URL(`${process.env.REACT_APP_API_BASE_URL}/${endpoint}`);

  for (const key in queryParams) {
    url.searchParams.append(key, queryParams[key]);
  }

  const response = await fetch(url.href);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
}

async function postJson<T>(
  endpoint: string,
  body: any,
  queryParams: { [key: string]: any } = {}
): Promise<T> {
  var url = new URL(`${process.env.REACT_APP_API_BASE_URL}/${endpoint}`);

  for (const key in queryParams) {
    url.searchParams.append(key, queryParams[key]);
  }

  const response = await fetch(url.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
