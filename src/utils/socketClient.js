import io from 'socket.io-client';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/client';
import errorHandler from 'utils/error';
import cookieStorage from 'utils/cookie';

const socket = io(process.env.REACT_APP_API_URL);
let app = null;

function initClient() {
  try {
    app = feathers()
      .configure(socketio(socket))
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

export default async function feathersClient() {
  if (app === null) {
    await initClient();
  }
  return app;
}

export async function getService(serviceName) {
  const client = await feathersClient();
  return client.service(serviceName);
}
