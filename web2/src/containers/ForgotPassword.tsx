import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Joi from "@hapi/joi";
import Button, { ButtonTypes } from "./../elements/Button";
import Modal from "./../elements/Modal";
import LabeledInput from "../elements/LabeledInput";
import Link from "../elements/Link";
import FORGOT_PASSWORD from "../graphql/mutations/forgotPassword";
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
});

export default function Login() {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrorsInternal] = useState({
    email: null,
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


  const [forgotPasswordMutation, { loading }] = useMutation(FORGOT_PASSWORD, {
    variables: {
      email,
    },
    onCompleted: async ({ forgotPassword: { token } }) => {
      await Auth.setToken(token);
    },
    onError: async error => {
      const errorMsg = ErrorUtil.getErrorMessage(error);
      setError(errorMsg);
    }
  });

  const forgotPassword = () => {
    const params = schema.validate({
      email,
    });

    const { error: schemaError } = params;

    if (schemaError) {
      const { field, message } = JSON.parse(schemaError.message);
      setFieldErrors(field, message);
      return;
    }

    forgotPasswordMutation();
  };

  return (
    <Container>
      <Header />
      <Modal title="Forgot Password">
        <Content>
          <Row>
            <LabeledInput
              autoFocus
              label="Email"
              placeholder="sigismund@freud.com"
              value={email}
              onChange={onChangeEmail}
              error={fieldErrors["email"]}
            />
          </Row>
          {error && <ErrorText>{error}</ErrorText>}
          <Button
            type={ButtonTypes.Submit}
            onClick={() => forgotPassword()}
            loading={loading}
            text="Send Reset Email"
            margin="20px 0 0"
          />
          <Footer>
            <Row>
              <Text>Remembered?</Text>&nbsp;
              <Link to="/login">Login</Link>
            </Row>
          </Footer>
        </Content>
      </Modal>
    </Container>
  );
}
