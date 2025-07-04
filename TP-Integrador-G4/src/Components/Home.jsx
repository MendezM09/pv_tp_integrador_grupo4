import Footer from "./Footer"
import NavBar from "./NavBar"
import { Outlet } from "react-router-dom";
const Home = () => {

    return (
        <>
            <NavBar></NavBar>
             <div>
                <Outlet />
            </div>
            <Footer></Footer>
        </>
    )
}
export default Home