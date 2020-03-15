import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import client from './../util/client';
import { Page, Flex, Error } from './../styles/App';
import Input from './../components/Input';
import Button from './../components/Button';
import {
  Container,
  Label,
  Form,
  Logo,
  Text,
} from './../styles/containers/Auth';

export default class Login extends Component {
  constructor() {
    super();
    
    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }
  setField(value, field) {
    this.setState({
      [field]: value,
      error: null,
    });
  }
  login() {
    let { email, password } = this.state;

    client.login(email, password)
    .then(res => {
      this.props.history.push('/dashboard');
    })
    .catch(err => {
      this.setState({
        error: err,
      });
    })
  }
  render() {
    return (
      <Page onKeyPress={e => {
        if (e.which === 13) {
          this.login();
        }
      }}>
        <Container>
          <Form>
            <Logo />
            <Label>Email Address</Label>
            <Input 
              fluid
              autoFocus 
              value={this.state.email} 
              placeholder="Enter your email address" 
              onChange={e => this.setField(e.target.value, 'email')} 
              type="email" 
            />
            <Label>Password</Label>
            <Input 
              fluid
              value={this.state.password} 
              placeholder="Enter your password" 
              onChange={e => this.setField(e.target.value, 'password')} 
              type="password" 
            />
            <Flex justify="center">
              <Button
                fluid
                onClick={(() => this.login())}
                width="225px"
                margin="10px 0 0"
              >
                Sign In
              </Button>
            </Flex>
            {this.state.error && <Error>{this.state.error}</Error>}
            <Text>
              Need an account? <Link to="/register">Register</Link>
            </Text>
          </Form>
        </Container>
      </Page>
    );
  }
}
