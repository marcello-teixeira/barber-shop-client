import axios from "axios";

const api = axios.create({
  baseURL: 'https://api:8080/v1/'
});

//
// Get the image of profile picture and return a image's URL
//
export async function getProfilePicture() {
  const clientRole = localStorage.getItem('role');

  const response = await api.get(`${clientRole}/get-photo`, {responseType: 'arraybuffer'});

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

//
// Set Bearer-Token in header's authorization
//
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

//
// Check login successful, if true set token and role in LocalStorage
//
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

    return true;
  } catch (error) {
    console.error("Error in LoginClient", error);
    return;
  }
}

//
// Send register data to API
//
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
