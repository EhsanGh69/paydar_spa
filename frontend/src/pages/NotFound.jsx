import { Link } from "react-router-dom"
import "../assets/NotFound.css"

export default function NotFound() {
  return (
    <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>4<span>0</span>4</h1>
			</div>
			<p style={{marginTop: "5rem", fontFamily: "Vazirmatn", fontSize: "1rem"}}>
                صفحه‌ایی که به دنبال آن هستید موجود نیست یا در دسترس نمی‌باشد     
            </p>
			<Link to={"/"} className="mt-5">
                <i className="fa-solid fa-house ml-1"></i>
                <span style={{fontFamily: "Vazirmatn", fontSize: "1rem"}}>خانه</span>
            </Link>
		</div>
	</div>
  )
}
