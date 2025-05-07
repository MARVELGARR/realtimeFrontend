type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type headers = "Application/Json" | "Application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | "text/html" | "text/css" | "text/javascript" | "image/png" | "image/jpeg" | "image/gif" | "image/svg+xml" | "application/xml" | "application/pdf" | "application/zip" | "application/octet-stream";
interface ApiClientOptions {
  method?: HttpMethod;
  token?: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  body?: any;
  headers?:headers
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
    let fetchOptions: RequestInit = {
      method,
      headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: "include",
    };

    if (options.headers === 'multipart/form-data' && body instanceof FormData) {
      fetchOptions.body = body;
      // Do not set 'Content-Type' header; fetch will automatically set it for FormData
    } else {
      fetchOptions.headers = {
      ...fetchOptions.headers,
      ...(options.headers !== 'multipart/form-data' && { 'Content-Type': options.headers || 'application/json' }),
      };
      if (body) {
      fetchOptions.body = JSON.stringify(body);
      }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1${endpoint}${queryString}`, fetchOptions);

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
