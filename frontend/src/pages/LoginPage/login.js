import React from 'react'
import { Redirect } from 'react-router-dom'
import styles from './login.module.css'
import LoginComponent from '../../components/LoginComponent/login'
import { loginService } from '../../services/accountServices'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            loginSuccess: true,
            redirectToDashboard: false,
            data: []
        }
    }

    loginHandler = async (e) => {
        e.preventDefault()

        const {
            username,
            password
        } = this.state
        
        let response = await loginService({ username, password })

        if (response.data) {
            this.setState({ loginSuccess: true, redirectToDashboard: true, data: response.data })
        } else {
            this.setState({ loginSuccess: false })
        }
    }

    usernameOnChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    passwordOnChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    render() {
        const {
            username,
            password,
            redirectToDashboard,
            loginSuccess,
            data
        } = this.state

        if (redirectToDashboard && loginSuccess) {
            return <Redirect to={{ pathname: '/mainpage', state: { data: data, currentView: 'Dashboard' } }} />
        }

        return (
            <div className={`${styles.LoginPage} d-flex align-items-center justify-content-end`}>
                <LoginComponent
                    username={username}
                    password={password}
                    loginHandler={this.loginHandler} 
                    loginSuccess={loginSuccess} 
                    usernameOnChangeHandler={this.usernameOnChangeHandler}
                    passwordOnChangeHandler={this.passwordOnChangeHandler}
                />
            </div>
        )
    }
}

export default LoginPage