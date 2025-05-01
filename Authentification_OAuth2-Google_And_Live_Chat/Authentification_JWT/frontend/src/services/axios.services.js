import axios from "axios";

const axiosAgent = axios.create({
  baseURL: "http://localhost:3000/",
});

function handleError(serviceName, err) {
  if (err.response) {
    console.log(
      "ERROR while calling SERVICE " +
        serviceName +
        ": " +
        JSON.stringify(err.response)
    );
    return {
      data: {
        error: 1,
        data: err.response.data,
      },
    };
  } else if (err.request) {
    // la requete a été envoyée mais aucune réponse reçue.
    console.log(
      "NETWORK ERROR while calling SERVICE " +
        serviceName +
        ": " +
        JSON.stringify(err.request)
    );
    // on retourne un objet qui a la même structure qu'une réponse normale sans erreur.
    // mais avec un champ data contenant un message
    return {
      data: {
        error: 1,
        data: "Le serveur est injoignable ou l'URL demandée n'existe pas",
      },
    };
  } else {
    // tout autre cas
    console.log("UNKNOWN ERROR while calling SERVICE " + serviceName);
    // on retourne un objet qui a la même structure qu'une réponse normale sans erreur.
    // mais avec un champ data contenant un message
    return {
      data: {
        error: 1,
        data: "Erreur inconnue",
      },
    };
  }
}

async function getRequest(uri, name, config = {}) {
  let response = null;
  try {
    response = await axiosAgent.get(uri, config);
  } catch (err) {
    response = handleError(name, err);
  }
  return response.data;
}

async function postRequest(uri, data, name, config = {}) {
  let response = null;
  try {
    response = await axiosAgent.post(uri, data, config);
  } catch (err) {
    response = handleError(name, err);
  }
  return response.data;
}

async function patchRequest(uri, data, name, config = {}) {
  let response = null;
  try {
    response = await axiosAgent.patch(uri, data, config);
  } catch (err) {
    response = handleError(name, err);
  }
  return response.data;
}

async function putRequest(uri, data, name, config = {}) {
  let response = null;
  try {
    response = await axiosAgent.put(uri, data, config);
  } catch (err) {
    response = handleError(name, err);
  }
  return response.data;
}

async function deleteRequest(uri, name, config = {}) {
  let response = null;
  try {
    response = await axiosAgent.delete(uri, config);
  } catch (err) {
    response = handleError(name, err);
  }
  return response.data;
}

export { getRequest, postRequest, patchRequest, putRequest, deleteRequest };
