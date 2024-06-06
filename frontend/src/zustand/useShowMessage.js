import { create } from "zustand";

const useShowMessage = create((set) =>({
showMessage:false,
setShowMessage:(showMessage) =>set({showMessage})
}))

export default useShowMessage