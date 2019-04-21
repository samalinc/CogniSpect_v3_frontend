import feathers from '@feathersjs/client';
import axios from 'axios';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';
import errorHandler from 'utils/error';
import cookieStorage from 'utils/cookie';

const client = rest(process.env.REACT_APP_API_URL);
let app = null;

function initClient() {
  try {
    app = feathers()
      .configure(client.axios(axios))
      .configure(auth({
        storageKey: 'feathers-jwt-admin',
        storage: cookieStorage(),
      }));
  } catch (error) {
    errorHandler(error);
    return initClient();
  }
  return app;
}

export default async function restClient() {
  if (app === null) {
    await initClient();
  }
  return app;
}

