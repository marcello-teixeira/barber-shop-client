import axios from "axios";

export async function LoginClient(mail, password) {
  try {
    const response = await axios.post(
      `https://localhost:7290/Authentication/Login`,
      {
        login: mail,
        password: password,
      }
    );
    return response.data.secretToken;
  } catch (error) {
    console.error("Error in LoginClient", error);
    return null;
  }
}

export function GetClients(token) {
  try {
    axios
      .get(`https://localhost:7290/get/customer`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((promisse) => console.log(promisse.data));
  } catch (error) {
    console.error(error);
  }
}
