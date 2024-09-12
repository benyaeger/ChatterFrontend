import React, { useState } from 'react';
import LoginPage, { Username, Password, Submit, Title, Logo, Reset, Footer, Block } from '@react-login-page/base';
const styles = {
    container: { height: 460 },
    username: { /* Add styles here */ },
    password: { /* Add styles here */ },
    submit: { /* Add styles here */ },
    reset: { /* Add styles here */ },
    title: { /* Add styles here */ },
    block: { /* Add styles here */ },
};

function Login(props) {
    return (
        <div style={styles.container}>
            <LoginPage>
                <Username style={styles.username} placeholder="Username" name="userUserName" />
                <Password style={styles.password} placeholder="Password" name="userPassword" />
                <Submit style={styles.submit}>Login</Submit>
                <Reset style={styles.reset} disabled={true}>Reset</Reset>
                <Title style={styles.title} />
                <Block style={styles.block} keyname='title'>Chatter</Block>
                <Footer style={styles.footer}>
                    Not a member? <a href="#">Sign up now</a>
                </Footer>
            </LoginPage>
        </div>
    );
}
export default Login;
