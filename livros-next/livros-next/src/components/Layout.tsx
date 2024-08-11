import { Outlet } from "react-router-dom";

const Layout = () => {

    return (
        <>
            <nav className= 'd-flex flex-row mb-3 p-1 bg-dark text-light'>
                <a href='/' className="btn p-2 bd-highlight text-light">Home</a>
                <a href='/books' className="btn p-2 bd-highlight text-light">Book List</a>
                <a href='/addbook' className="btn p-2 bd-highlight text-light">Add Book</a>
            </nav>
            <Outlet/>
        </>     
    );
}

export default Layout;