import { Navbar, NavbarBrand, NavItem, Nav, NavbarToggler, Collapse } from "reactstrap"
import { FaHome, FaCheck, FaCheckSquare, FaCalendar } from 'react-icons/fa'
import { NavLink } from "react-router-dom"
import { useState } from "react"

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
  return (
    <Navbar dark sticky="top" expand='md'>
        {/* <NavbarBrand className='ms-3' href='/'>
            <NavLink to='/'>
                <FaHome /> HOME
            </NavLink>
        </NavbarBrand> */}
        <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
        <Collapse isOpen={menuOpen} navbar>
            
            <Nav navbar className="ms-auto">
                <NavItem>
                    <NavLink className='nav-link' to='/checkin'>
                        <FaCheck /> Check In
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' to='/calendar'>
                        <FaCalendar /> Calendar
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' to='/tasks'>
                        <FaCheckSquare /> Tasks
                    </NavLink>
                </NavItem>
            </Nav>
        </Collapse>
        
        
    </Navbar>
  )
}
export default Header