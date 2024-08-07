import axios from "axios";

const api = axios.create({
  baseURL: 'https://localhost:7290/'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = '*/*';
      config.headers["Content-Type"] = 'application/json';
    }
    return config;
  }
);

export async function ClientLogin(mail, password) {
  try {
    const response = await api.post(
      'authentication/login',
      {
        login: mail,
        password: password,
      }
    );

    return localStorage.setItem('token', response.data.tokenJwt);

  } catch (error) {
    console.error("Error in LoginClient", error);
    return;
  }
}

export function ClientRegister(FormData, route) {
  try {
    api.post(
      `${route}/post`,
      FormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  } catch (error) {
    console.error('Register client function error',error);
  }
}

export default api;
