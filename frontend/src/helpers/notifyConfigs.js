import { Bounce, toast } from 'react-toastify'

export const notifyOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
}

export const successNotify = (text) => toast.success(text, notifyOptions);
export const warnNotify = (text) => toast.warn(text, notifyOptions);
export const infoNotify = (text) => toast.info(text, notifyOptions);
export const errorNotify = (text) => toast.error(text, notifyOptions);