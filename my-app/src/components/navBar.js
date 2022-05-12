import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavBar(props){
    return(
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Grateful Gardens</a>

                <div className="search collapse navbar-collapse" id="navbarSupportedContent">
                    <form className=" bar d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>

                <a className="profile-pic" href="#">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"/> 
                </a>
            </div>
        </nav>  
    </div>
    );
}

  export default NavBar