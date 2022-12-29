import { Navbar } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/Authprovider';

const Header = () => {
  const { user, LogOut } = useContext(AuthContext);

  const handleLogOut = () => {
    LogOut()
      .then(() => {
        localStorage.clear();
      })
      .catch((err) => console.error(err));
  };


    return (
        <Navbar
  fluid={true}
  rounded={true}
  className="pt-4 pb-4"
>
  <Navbar.Brand>
  
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Tasks Manager
    </span>
  </Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse>
    <Navbar.Link
    >
      <Link to="/">My Tasks</Link>
    </Navbar.Link>
    <Navbar.Link
    >
      <Link to="/addtask">Add Tasks</Link>
    </Navbar.Link>
    {
      user?.uid ?
      <>
        <Navbar.Link>
        <button onClick={handleLogOut}>Logout</button>
        </Navbar.Link>
      </>
      :
      <>
        <Navbar.Link
    >
      <Link to="/login">Login</Link>
    </Navbar.Link>
    <Navbar.Link
    >
      <Link to="/signup">Sign Up</Link>
    </Navbar.Link>
      </>
    }
    
  </Navbar.Collapse>
</Navbar>
    );
};

export default Header;