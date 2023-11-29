import Nav from "./Nav"
import Footer from "./Footer"


export default function Home() {




    return(
        <div className="Homediv">
            <div className="navhomediv">
                <Nav/>
            </div>
            <div className="homecontentdiv">
                <h1>this is home </h1>
                
            </div>
            <div className="footerhomediv">
                <Footer/>
            </div>
        </div>
    )
}