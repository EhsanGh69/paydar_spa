import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify'

import { login, setToken } from "../../services/authServices"
import CardTitle from "../../components/auth/CardTitle"
import spinnerGif from "../../assets/spinner.gif"
import { errorNotify } from "../../helpers/notifyConfigs"

export default function Login() {

    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)
    
    function getUserData(event) {
        setUserData({ 
            ...userData, 
            [event.target.name]: event.target.value 
        })
    }

    async function userLogin(event) {
        event.preventDefault()
        try {
            setLoading(true)
            const { status, data } = await login(userData)
            if(status === 200) {
                setToken(data.auth_token)
                navigate('/')
            }
            setLoading(false)
        } catch (err) {
            const isUndefined = userData.username === undefined || userData.password === undefined
            const isEmpty = userData.username === '' || userData.password === ''
            if(Object.keys(userData).length === 0) {
                errorNotify("لطفا نام کاربری و رمز عبور خود را وارد نمایید")
            }
            else if(isUndefined || isEmpty) {
                errorNotify("مقدار نام کاربری یا رمز عبور نمی تواند خالی باشد")
            }
            else errorNotify("نام کاربری یا رمز عبور نادرست است")
            console.log(err.response)
            setLoading(false)
        }
    }

    return (
        <div className="card m-auto p-4" style={{borderRadius: "10px", opacity: "0.9"}}>
            <CardTitle title="ورود به سامانه" />
            {loading && (
                <img src={spinnerGif} className="d-block m-auto"
                style={{width: "100px"}} alt="login loading"/>
            )}
            <div className="card-body login-card-body">
                <form method="post" onSubmit={userLogin}>     
                    <div className="input-group mb-3 flex-row-reverse">
                        <input type="text" name="username" dir="rtl" placeholder="نام کاربری" 
                        autocomplete="off" className="form-control rounded" 
                        onChange={getUserData}/>
                        <div className="input-group-append rounded">
                            <div className="input-group-text">
                                <span className="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3 flex-row-reverse">
                        <span className="fa-solid fa-eye fa-eye-slash 
                        pt-2 pl-2 border border-left-0 rounded" id="toggle-icon"></span>
                        <input type="password" name="password" dir="rtl" placeholder="رمز عبور" 
                        autocomplete="off" className="form-control border-left-0" 
                        onChange={getUserData}/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-4 offset-4">
                            <button type="submit" className="btn btn-primary btn-block btn-flat rounded">ورود</button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}