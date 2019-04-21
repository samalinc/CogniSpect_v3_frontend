import { toast } from 'react-toastify';

export function success(text) {
  return toast.success(text, {
    position: toast.POSITION.TOP_RIGHT,
  });
}

export function error(text) {
  return toast.error(`Error... ${text}`, {
    position: toast.POSITION.TOP_RIGHT,
  });
}

export function warning(text) {
  return toast.warn(`${text}`, {
    position: toast.POSITION.TOP_RIGHT,
  });
}
