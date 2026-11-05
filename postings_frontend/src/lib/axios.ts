import axios from "axios";
// clients to use
// logged out client

export const apiPublic = axios.create({
  baseURL: `http://${process.env.NODE_ENV == 'development' ? `${process.env.BACKEND_HOST ?? 'localhost'}` : `${process.env.BACKEND_HOST ?? 'postings_backend'}`}:${process.env.BACKEND_PORT ?? 3000}`
})
// logged in client
export const api = axios.create({
  baseURL: "http://localhost:3000",
})
api.interceptors.request.use(config => {
  const token: string | null = localStorage.getItem("token")
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`)
  }
  return config;
})

