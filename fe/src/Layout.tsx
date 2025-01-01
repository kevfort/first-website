import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router"

function Layout() {
    return(
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default Layout