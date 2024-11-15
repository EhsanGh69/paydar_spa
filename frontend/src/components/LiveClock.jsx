import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function LiveClock() {

    const [time, setTime] = useState("")
    const [jDate, setJDate] = useState("")
    const [jDay, setJDay] = useState("")
    const location = useLocation()

    useEffect(() => {
        showTime()
    }, [])

    function showTime(){
        const date = new Date()
        let h = date.getHours(); // 0 - 23
        let m = date.getMinutes(); // 0 - 59
        let s = date.getSeconds(); // 0 - 59
        const d = date.getDay();
        const j_days = { 0:"یکشنبه", 1:"دوشنبه", 2:"سه‌شنبه", 3:"چهارشنبه", 4:"پنج‌شنبه", 5:"جمعه", 6:"شنبه" }
        if(h == 0){ h = 12 }
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        const j_date = new Intl.DateTimeFormat('fa-IR').format(date);
        const time = h + ":" + m + ":" + s;
        setTime(time)
        setJDate(j_date)
        setJDay(j_days[d])
        setTimeout(showTime, 1000);
    }

    return (
        <div className="col-12 col-lg-4 clock my-3 py-2 bg-primary text-light rounded text-center">
            {location.pathname === '/' ? (
                <>
                    <p className="font-weight-bold" style={{letterSpacing: 0, fontSize: '1.5rem'}}>{jDay}</p>
                    <p>{jDate}</p>
                    <p>{time}</p>
                </>
            ) : (
                <p classNameName="d-flex justify-content-between">
                    <span>{jDate}</span>
                    <span>{jDate}</span>
                </p>
            )}
            
        </div>
    )
}