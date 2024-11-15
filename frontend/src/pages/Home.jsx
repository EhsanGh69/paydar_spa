import LiveClock from "../components/LiveClock"

export default function Home() {
    return (
        <div className="container">
            <div className="row pl-3">
                <div className="col-12 col-lg-3 mt-2 text-center text-lg-left pr-0">
                    <img src="/logo192.png" alt="Logo" className="mr-5 mr-lg-0" width="130" />
                </div>
                <div className="col-12 col-lg-5 mt-2 mt-lg-5 text-center">
                    <h1 className="pr-2 font-weight-bold ml-3">سامانه مدیریت پروژه ها</h1>
                </div>
                <LiveClock />
            </div>
        </div>
    )
}