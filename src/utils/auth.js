import { baseUrl } from "../utils/constants";
import checkResponse from "../utils/checkResponse";

export const signup = (user) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => checkResponse(res))
    .then((res) => res);
};

export const signin = (email, password) => {
  console.log(baseUrl);
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res))
    .then((res) => res);
};

export const updateCurrentUser = (token, { name, avatar }) => {
  console.log("Request Payload:", { name, avatar });

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  })
    .then((res) => checkResponse(res))
    .then((res) => res);
};

export const checkTokenValidity = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      return data;
    });
};
