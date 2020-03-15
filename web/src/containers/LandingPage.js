import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import client from './../util/client';
import { Page, Error } from './../styles/App';
import Input from './../components/Input';
import Button from './../components/Button';
import {
  Container,
  Label,
  Form,
  Logo,
  Text,
} from './../styles/containers/Auth';

export default class LandingPage extends Component {  
  render() {
    return (
      <Page>
        <Container>
          <Form small>
            <Logo />
            <Link to="/login">
              <Button
                
                fluid
                margin="50px 0 25px"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                invert
                fluid
              >
                Sign Up
              </Button>
            </Link>
          </Form>
        </Container>
      </Page>
    );
  }
}
