import axios from "axios"

const api = axios.create({
  baseURL: "https://admin.itces.in/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong"

    return Promise.reject(new Error(message))
  }
)

export default api