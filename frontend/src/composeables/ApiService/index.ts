class ApiService {}

export function useApiService() {
  const apiService = new ApiService()

  return { apiService }
}
