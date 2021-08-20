import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
const Navbar = () => {
    const logo= "user1.png"
    const isauth=useSelector(state=>state.isAuth)
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const history = useHistory()
    const handleRoute=()=>{
        // localStorage.setItem("MedTtoken", false);
        //  setIsAuth(false)
        dispatch({type:"LOGOUT"})
        history.push("/login")

      }
    return ( 
        <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          {console.log("navbar", userData)}
        <li class="navbar-brand" ><Link to="/"><img src={logo} alt="logo"  width="50px"  />
        {/* <li class="nav-item  ml-5  "> */}
      <span className="text-light" ><b>{userData?.firstName}</b></span>
      {/* </li> */}
         </Link></li>
  {/* <li class="navbar-nav" ><Link to="/"><span className="nav-link" >Medlife</span></Link></li> */}
 

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item  ml-5">
      <Link to="/">
         <span className="nav-link" >Home</span>
        {/* <a class="nav-link " href="#">Login</a> */}
        </Link>      </li>
      <li class="nav-item  ml-5">
      <Link to="/add">
         <span className="nav-link" >Add Product</span>
        {/* <a class="nav-link " href="#">Login</a> */}
        </Link>
      </li>
      
      { !isauth && <li class="nav-item  ml-5">
      <Link to="/signup">
         <span className="nav-link" > SignUp</span>
        {/* <a class="nav-link " href="#">Login</a> */}
        </Link>
      </li>}
      { !isauth && <li class="nav-item ml-5">
      <Link to="/login">
         <span className="nav-link" > Login</span>
        {/* <a class="nav-link " href="#">Login</a> */}
        </Link>
      </li>}
      { isauth && <li class="nav-item ml-5">
      
      <button className="btn btnbg1  btn-lg " onClick={handleRoute}   >Logout<img src={"logout.png"} alt="logo"  width="15px"  /></button>
      </li>}
      
    </ul>
  </div>
</nav>
        </>
     );
}
 
export default Navbar;