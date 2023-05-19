import checkResponse from "./checkResponse";
const baseUrl =
  "https://my-json-server.typicode.com/Bogdan11p/se_project_react/";

const itemsApi = {
  get: () => {
    return fetch(`${baseUrl}/items`).then(checkResponse);
  },
  add: (name, imageUrl, weather) => {
    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        imageUrl,
        weather,
      }),
    }).then(checkResponse);
  },
  remove: (id) => {
    return fetch(`${baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(checkResponse);
  },
};

export default itemsApi;