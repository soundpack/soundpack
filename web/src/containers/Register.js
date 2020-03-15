import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import client from './../util/client';
import { Page, Flex, FlexSpace, Error } from './../styles/App';
import Input from './../components/Input';
import Button from './../components/Button';
import {
  Container,
  Logo,
  Label,
  Form,
  FormItem,
  Text,
} from './../styles/containers/Auth';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
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
  register() {
    let { firstName, lastName, email, password } = this.state;

    client.register(firstName, lastName, email, password)
      .then(res => {
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: err,
        });
      })
  }
  render() {
    return (
      <Page onKeyPress={e => {
        if(e.which === 13) {
          this.register();
        }
      }}>
        <Container>
          
          <Form>
            <Logo />
            <Flex>
             <FormItem>
               <Label>First name</Label>
                <Input 
                  autoFocus
                  fluid 
                  value={this.state.firstName} 
                  placeholder="Max" onChange={e => this.setField(e.target.value, 'firstName')} 
                  type="text" 
                />
              </FormItem>
              <FlexSpace />
              <FormItem>
                <Label>Last name</Label>
                <Input
                  fluid 
                  value={this.state.lastName} 
                  placeholder="Moneybags" onChange={e => this.setField(e.target.value, 'lastName')} 
                  type="text" 
                />
              </FormItem>
            </Flex>
            <Label>Email</Label>
            <Input
              fluid 
              value={this.state.email} 
              placeholder="sam@soundpack.io" 
              onChange={e => this.setField(e.target.value, 'email')} 
              type="text" 
            />
            <Label>Password</Label>
            <Input
              fluid 
              value={this.state.password} 
              placeholder="A password containing at least 7 characters" 
              onChange={e => this.setField(e.target.value, 'password')} 
              type="password" 
            />
            <Flex justify="center">
              <Button
                fluid
                onClick={(() => this.register())}
                width="225px"
                margin="10px 0 0"
              >
                Get Started
              </Button>
            </Flex>
            {this.state.error && <Error>{this.state.error}</Error>}
            <Text>
              Already have an account? <Link to="/login">Login</Link>
            </Text>
          </Form>
        </Container>
      </Page>
    );
  }
}
