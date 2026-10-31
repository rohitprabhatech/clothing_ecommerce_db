import apiClient from './api_client';

/**
 * Catalog API Service
 * Encapsulates all backend HTTP interactions for products, categories, and inventory.
 */

/**
 * Fetch paginated list of catalog products with optional filters.
 *
 * @param {Object} [params] - Query parameters (e.g. page, limit, category, sort).
 * @returns {Promise<Object>} API response data.
 */
export async function getProducts(params = {}) {
  const response = await apiClient.get('/catalog', { params });
  return response.data;
}

/**
 * Fetch detailed product data by ID.
 *
 * @param {string|number} id - Product identifier.
 * @returns {Promise<Object>} API response data.
 */
export async function getProductById(id) {
  const response = await apiClient.get(`/catalog/${id}`);
  return response.data;
}

/**
 * Fetch category tree or list for navigation and filtering.
 *
 * @returns {Promise<Object>} API response data.
 */
export async function getCategories() {
  const response = await apiClient.get('/categories');
  return response.data;
}

/**
 * Fetch service health status from FastAPI backend.
 *
 * @returns {Promise<Object>} Health check status.
 */
export async function getHealthStatus() {
  const response = await apiClient.get('/health');
  return response.data;
}

export default {
  getProducts,
  getProductById,
  getCategories,
  getHealthStatus,
};

