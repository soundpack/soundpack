import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Joi from "@hapi/joi";
import Button, { ButtonTypes } from "./../elements/Button";
import Modal from "./../elements/Modal";
import LabeledInput from "../elements/LabeledInput";
import Link from "../elements/Link";
import LOGIN from "../graphql/mutations/login";
import * as Auth from "../utils/Auth";
import * as Schema from "../utils/Schema";
import * as ErrorUtil from "../utils/ErrorUtil";
import {
  Container,
  Header,
  Content,
  Row,
  Text,
  Footer,
  ErrorText
} from "./../styles/containers/auth";

function makeEventHandler(executeOnEvent: Function) {
  return function(eventHandler: Function) {
    return function(event: React.FormEvent<HTMLInputElement>) {
      executeOnEvent();
      eventHandler(event.currentTarget.value as string);
    };
  };
}

const schema = Joi.object({
  email: Schema.email().error(([error]) => {
    const message = "Email is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message
      })
    );
  }),
  password: Schema.password().error(([error]) => {
    const message = "Password is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message
      })
    );
  }),
});

export default function Login() {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrorsInternal] = useState({
    email: null,
    password: null,
  });

  const eventHandler = makeEventHandler(() => setError(""));

  const setFieldErrors = (field: string, message: string | null) => {
    const newFieldErrors: any = {
      [field]: message
    };
    setFieldErrorsInternal(newFieldErrors);
  };

  const onChangeEmail = eventHandler((value: string) => {
    setFieldErrors("email", null);
    setEmail(value);
  });

  const onChangePassword = eventHandler((value: string) => {
    setFieldErrors("password", null);
    setPassword(value);
  });

  const [loginMutation, { loading }] = useMutation(LOGIN, {
    variables: {
      email,
      password,
    },
    onCompleted: async ({ login: { token } }) => {
      await Auth.setToken(token);
    },
    onError: async error => {
      const errorMsg = ErrorUtil.getErrorMessage(error);
      setError(errorMsg);
    }
  });

  const login = () => {
    const params = schema.validate({
      email,
      password,
    });

    const { error: schemaError } = params;

    if (schemaError) {
      const { field, message } = JSON.parse(schemaError.message);
      setFieldErrors(field, message);
      return;
    }

    loginMutation();
  };

  return (
    <Container>
      <Header />
      <Modal title="Login">
        <Content>
          <Row>
            <LabeledInput
              label="Email"
              placeholder="sigismund@freud.com"
              value={email}
              onChange={onChangeEmail}
              error={fieldErrors["email"]}
            />
          </Row>
          <Row>
            <LabeledInput
              label="Password"
              placeholder="••••••••••••"
              value={password}
              type="password"
              onChange={onChangePassword}
              error={fieldErrors["password"]}
            />
          </Row>
          {error && <ErrorText>{error}</ErrorText>}
          <Button
            type={ButtonTypes.Submit}
            onClick={() => login()}
            loading={loading}
            text="Login"
            margin="20px 0 0"
          />
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
