import axios from "axios";

const api = axios.create({
  baseURL: 'https://localhost:7290/'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }
);

export async function ClientLogin(mail, password) {
  try {
    const response = await axios.post(
      'https://localhost:7290/Authentication/Login',
      {
        login: mail,
        password: password,
      }
    ).then(resp => console.log(resp.data));

    console.log(response)

    //return localStorage.setItem('token', );
  } catch (error) {
    console.error("Error in LoginClient", error);
    return null;
  }
}

export function ClientRegister(FormData, route) {
  try {
    axios.post(
      `https://localhost:7290/post/${route}`,
      FormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': '*/*'
        }
      }
    )
  } catch (error) {
    console.error('Register client function error',error);
  }
}

export default api;
