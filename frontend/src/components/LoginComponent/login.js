import React from 'react'
import styles from './login.module.css'
import loginLogo from '../../assets/images/logo/login-logo.gif'
import loginbg from '../../assets/images/logo/login-bg.gif'

class Login extends React.Component {
    render() {
        const {
            loginSuccess,
            username,
            password,
            loginHandler,
            usernameOnChangeHandler,
            passwordOnChangeHandler
        } = this.props

        return (

            <div className="" >
                <img className={`${styles.LoginBg}`} src={loginbg} alt="bg"></img>
                <form onSubmit={loginHandler} className={`${styles.LoginBox} px-5 my-auto py-5`}>
                    <div className="d-flex flex-column">
                        <div className={`row d-flex flex-column mb-2`} >
                            <img className={`${styles.LoginLogo}`} src={loginLogo} alt="logo"></img>
                        </div>

                        <div className="row d-flex flex-column mb-2">
                            <label>Username </label>
                            <input placeholder="Email" className="rounded" type="text" id="username" value={username} onChange={usernameOnChangeHandler} />
                        </div>

                        <div className="row d-flex flex-column mb-3">
                            <label>Password </label>
                            <input placeholder="Password" className="rounded" type="password" id="password" value={password} onChange={passwordOnChangeHandler} />
                        </div>
                        {
                            !loginSuccess &&
                            <div className="row d-flex flex-column mb-3">
                                <span className={`${styles.error}`}>The username and password you entered does not match any account.</span>
                            </div>
                        }
                        <div className="row">
                            <input className="w-100 btn btn-primary" type="submit" />
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

export default Login