type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiClientOptions {
  method?: HttpMethod;
  token?: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  body?: any;
}

export const apiClient = async <T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> => {
  const { method = 'GET', token, queryParams, body } = options;

  // Build query string if needed
  const queryString = queryParams
    ? '?' +
      Object.entries(queryParams)
        .filter(([, value]) => value !== undefined)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
        )
        .join('&')
    : '';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${endpoint}${queryString}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
      credentials: "include",
    });

    if (!res.ok) {
      const errorDetails = await res.json();
      console.error(errorDetails);
      throw new Error(JSON.stringify(errorDetails));
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
};
