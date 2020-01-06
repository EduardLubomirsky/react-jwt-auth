import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from "js-cookie";
import { Component } from 'react'

export const login = ({ token }) => {
    cookie.set('token', token)
    Router.push('/')
}

export const auth = ctx => {
    const { token } = nextCookie(ctx);
    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
        return
    }

    if (!token) {
        Router.push('/login')
    }
    return token
}

export const withAuthSync = WrappedComponent =>
    class extends Component {

        constructor(props) {
            super(props)

            this.syncLogout = this.syncLogout.bind(this)
        }

        componentDidMount() {
            window.addEventListener('storage', this.syncLogout)
        }

        componentWillUnmount() {
            window.removeEventListener('storage', this.syncLogout)
            window.localStorage.removeItem('logout')
        }

        syncLogout(event) {
            if (event.key === 'logout') {
                console.log('logged out from storage!')
                Router.push('/login')
            }
        }

        static async getInitialProps(ctx) {
            const token = auth(ctx)

            const componentProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx))

            return { ...componentProps, token }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

export const logout = () => {
    cookie.remove("token");
    window.localStorage.setItem("logout", Date.now().toString());
    Router.push("/");
}