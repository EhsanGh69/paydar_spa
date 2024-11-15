import { Bounce, ToastContainer, toast } from 'react-toastify'

export default function Toastify({text, }) {
    const notify = () => toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
    })

    return (
        <>
            <ToastContainer 
                position='top-right'
                
            />
        </>
    )
}
