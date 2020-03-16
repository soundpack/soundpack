import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Button, { ButtonTypes } from './../elements/Button';
import Modal from './../elements/Modal';
import LabeledInput from "../elements/LabeledInput";
import Link from "../elements/Link";
import LOGIN from "../graphql/mutations/login";
import * as Auth from "../utils/Auth";
import {
  Container,
  Content,
  Row,
  Text,
  Footer,
} from "./../styles/containers/auth";
import Joi from "@hapi/joi";
import * as Schema from '../utils/Schema';

function eventHandler(fn: Function) {
  return function(event: React.FormEvent<HTMLInputElement>) {
    fn(event.currentTarget.value as string);
  };
}

const schema = Joi.object({
  email: Schema.email(),
  password: Schema.password(),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    variables: {
      email,
      password
    },
    onCompleted: async ({ login: { token } }) => {
      await Auth.setToken(token);
    }
  });

  const { error: schemaError } = schema.validate({ email, password });

  const onChangeEmail = eventHandler((value: string) => setEmail(value));
  const onChangePassword = eventHandler((value: string) => setPassword(value));

  return (
    <Container>
      <Modal title="Login">
        <Content>
          <Row>
            <LabeledInput
              autoFocus
              label="Email"
              placeholder="sigismund@freud.com"
              value={email}
              onChange={onChangeEmail}
            />
          </Row>
          <Row>
            <LabeledInput
              label="Password"
              placeholder="••••••••••••"
              value={password}
              type="password"
              onChange={onChangePassword}
            />
          </Row>
          <Button type={ButtonTypes.Submit} text="Login" margin="20px 0 0" />
          <Footer>
            <Row>
              <Text>Need an account?</Text>&nbsp;
              <Link to="/register">Register</Link>
            </Row>
            <Row>
              <Link to="/forgot-password">Forgot Password</Link>
            </Row>
          </Footer>
        </Content>
      </Modal>
    </Container>
  );
}
