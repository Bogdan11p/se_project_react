import { baseUrl } from "../utils/constants";
import checkResponse from "../utils/checkResponse";

export const signup = (data) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  })
    .then((res) => checkResponse(res))
    .then((res) => res);
};

export const signin = (email, passowrd) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, passowrd }),
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
    .then((data) => data);
};
