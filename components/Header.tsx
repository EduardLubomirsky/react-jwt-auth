import Link from 'next/link'
import { NextPage } from 'next'
import { logout } from '../utils/auth';
import cookie from "js-cookie";

const Header = (props) => {
  const isAuthentificated = !!cookie.get('token');
  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper">
          <nav className="navigation">
            <Link href="/" >
              <a className="nav-item">Home</a>
            </Link>
            <Link href="/about">
              <a className="nav-item">About</a>
            </Link>
            {
              isAuthentificated ? null :
                <Link href="/register">
                  <a className="nav-item">Register</a>
                </Link>
            }
            {
              isAuthentificated ? null :
                <Link href="/login">
                  <a className="nav-item">Login</a>
                </Link>
            }
          </nav>
          {
            !isAuthentificated ? null :
              <button className="nav-item" onClick={() => {
                logout()
              }}>Logout</button>
          }
          <Link href="/">
            <img className="logo" src="/static/img/batman-logo.png" alt="Logo" />
          </Link>
        </div>
      </div >
    </header>

  )
}

Header.getInitialProps = async function () {

};
export default Header;