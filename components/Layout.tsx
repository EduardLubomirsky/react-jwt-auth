import Header from './Header'
import { Fragment } from 'react'
import "../styles/index.scss";
export default function Layout(props) {
  return (
    <Fragment>
      <Header />
      <div className="container">
        {props.children}
      </div>
    </Fragment>
  )
}
