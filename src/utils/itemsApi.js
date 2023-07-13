import checkResponse from "./checkResponse";
import { baseUrl } from "./constants";

export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item;
  } catch (error) {
    console.error("Error retrieving item from local storage:", error);
    return null;
  }
};

const itemsApi = {
  get: () => {
    return fetch(`${baseUrl}/items`).then(checkResponse);
  },

  add: ({ name, imageUrl, weather }, token) => {
    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        imageUrl,
        weather,
      }),
    }).then(checkResponse);
  },

  remove: (token, _id) => {
    return fetch(`${baseUrl}/items/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(checkResponse);
  },

  addCardLike: ({ _id, user }, token) => {
    return fetch(`${baseUrl}/items/${_id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ _id, user }),
    }).then(checkResponse);
  },

  removeCardLike: ({ _id }, token) => {
    return fetch(`${baseUrl}/items/${_id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ _id }),
    }).then(checkResponse);
  },
};

export default itemsApi;
