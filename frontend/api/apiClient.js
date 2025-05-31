// src/api/apiClient.js
required('dotenv').config();

import { getToken, removeToken } from '../utils/auth';

/**
 * Base URL for all API requests.
 * You can set REACT_APP_API_BASE_URL in your .env (e.g.:
 *   REACT_APP_API_BASE_URL=https://api.myapp.com/v1
 * If not set, it defaults to http://localhost:5000/api
 */
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

/**
 * Wrapper around fetch() to:
 *  - prepend BASE_URL
 *  - set default headers (JSON)
 *  - attach Authorization header if a token exists
 *  - parse JSON responses
 *  - handle 401 by removing token and redirecting to /login
 *
 * @param {string} path    - the endpoint path (e.g. "/auth/login", "/admin/users")
 * @param {object} options - same as fetch options (method, headers, body, etc.)
 *
 * @returns {Promise<any>} - resolves with parsed JSON data on 2xx,
 *                           rejects with an Error containing server message otherwise.
 */
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // If there's a token, attach it
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Build the final fetch options
  const fetchOptions = {
    ...options,
    headers,
  };

  let response;
  try {
    response = await fetch(url, fetchOptions);
  } catch (networkError) {
    // e.g. server is down or no network
    throw new Error(`Network error: ${networkError.message}`);
  }

  // Attempt to parse JSON (if any)
  let data;
  const contentType = response.headers.get('Content-Type') || '';
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    // If it’s not JSON, you can either return raw text or null
    data = await response.text();
  }

  // Handle 401 Unauthorized globally
  if (response.status === 401) {
    // Remove the invalid/expired token
    removeToken();
    // Redirect to login (you can customize this)
    window.location.href = '/login';
    throw new Error('Unauthorized. Redirecting to login.');
  }

  // If not 2xx, throw an error with message from server (if present)
  if (!response.ok) {
    const errorMessage =
      (data && data.message) || response.statusText || 'Unknown error';
    throw new Error(errorMessage);
  }

  // At this point, response is OK and data is parsed
  return data;
}

/**
 * Convenience methods for common HTTP verbs
 * so you don't have to write:
 *   request('/users', { method: 'GET' })
 * every time.
 */
export async function get(path) {
  return request(path, { method: 'GET' });
}

export async function post(path, body) {
  return request(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function put(path, body) {
  return request(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function del(path) {
  return request(path, { method: 'DELETE' });
}

export async function patch(path, body) {
  return request(path, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}
