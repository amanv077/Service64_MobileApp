import Axios from "axios";

const base_url = "https://service64.herokuapp.com/app/";
const axios = Axios;

export default {
  patch: ({ body, url }) =>
    new Promise((resolve, reject) => {
      axios
        .patch(`${base_url}${url}`, body)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }),

  post: ({ body, url }) =>
    new Promise((resolve, reject) => {
      axios
        .post(`${base_url}${url}`, body)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }),

  get: ({ body, url }) =>
    new Promise((resolve, reject) => {
      axios
        .get(`${base_url}${url}`)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }),
};
