import axios from "axios";

const api = axios.create({
  baseURL: 'https://localhost:7290/'
});

export async function getProfilePicture() {
  const clientRole = localStorage.getItem('role');

  const response = await api.get(`${clientRole}/get-photo`, {responseType: 'arraybuffer'});

  if(response && response.data) {
    return new Promise((resolve, reject) => {
      if(response && response.data) {
        const bytesPhoto = new Uint8Array(response.data);
        const blob = new Blob([bytesPhoto], {type: 'image/jpg'});
        const urlImage = URL.createObjectURL(blob);
        resolve(urlImage);
      } else {
        reject('Error in loading profile image');
      }
    })

  }
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = '*/*';
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

    localStorage.setItem('token', response.data.token.tokenJwt);
    localStorage.setItem('role', response.data.role);
    localStorage.setItem('id', response.data.id);

    return true;
  } catch (error) {
    console.error("Error in LoginClient", error);
    return;
  }
}

export function ClientRegister(FormData, route) {
  try {
    api.post(
      `${route}`,
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
