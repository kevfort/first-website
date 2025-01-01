import { Link } from 'react-router'

function Header() {
    return(
        <>
        <header>
            <Link to='/'>Home </Link>
            <Link to='/about'>About </Link>
            <Link to='/demo'>Demo </Link>
        </header>
        </>
    )
}

export default Header