import { CookieStorage } from 'cookie-storage';
import moment from 'moment';

let storage = null;
const today = moment();


function initCookieStorage() {
  try {
    storage = new CookieStorage({
      path: '/',
      expires: new Date(moment(today).add(1, 'days')),
    });
  } catch (error) {
    throw error;
  }
  return storage;
}

export default function cookieStorage() {
  if (storage === null) {
    initCookieStorage();
  }
  return storage;
}
