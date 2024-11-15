import axios from "axios"

export function setToken(token) {
    localStorage.setItem("token", token)
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
}

export function removeToken() {
    axios.defaults.headers.common['Authorization'] = ""
    localStorage.removeItem("token")
}

export function tokenControl(navigate, pathname) {
    const token = localStorage.getItem("token")
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`
        axios.get('/api/auth/users/me/')
             .then(response => {
                setToken(token)
                if(pathname === '/auth/login') navigate('/')
             })
             .catch(err => {
                removeToken()
                navigate('/auth/login')
             })
    }else {
        removeToken()
        navigate('/auth/login')
    }
}

export function login(userData) {
    return axios.post('/api/auth/token/login/', userData)
}

export function logout(navigate) {
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    axios.post('/api/auth/token/logout/')
         .then(response => {
            removeToken()
            navigate('/auth/login')
         })
         .catch(err => console.log(err.response))
}

export function getMe() {
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get('/api/auth/users/me/')
}