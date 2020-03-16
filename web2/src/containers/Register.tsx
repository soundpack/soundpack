import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Button, { ButtonTypes } from "./../elements/Button";
import Modal from "./../elements/Modal";
import LabeledInput from "../elements/LabeledInput";
import Link from "../elements/Link";
import REGISTER from "../graphql/mutations/register";
import * as Auth from "../utils/Auth";
import {
  Container,
  Content,
  Row,
  Text,
  Footer
} from "./../styles/containers/auth";
import Joi from "@hapi/joi";
import * as Schema from "../utils/Schema";

function eventHandler(fn: Function) {
  return function(event: React.FormEvent<HTMLInputElement>) {
    fn(event.currentTarget.value as string);
  };
}

const schema = Joi.object({
  email: Schema.email(),
  password: Schema.password()
});

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { data, loading, error }] = useMutation(REGISTER, {
    variables: {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    },
    onCompleted: async ({ register: { token } }) => {
      await Auth.setToken(token);
    }
  });

  const { error: schemaError } = schema.validate({ 
    firstName,
    lastName,
    email, 
    password,
    confirmPassword, 
  });

  const onChangeFirstName = eventHandler((value: string) => setFirstName(value));
  const onChangeLastName = eventHandler((value: string) => setLastname(value));
  const onChangeEmail = eventHandler((value: string) => setEmail(value));
  const onChangePassword = eventHandler((value: string) => setPassword(value));
  const onChangeConfirmPassword = eventHandler((value: string) => setConfirmPassword(value));

  return (
    <Container>
      <Modal title="Login">
        <Content>
          <Row>
            <LabeledInput
              autoFocus
              label="First Name"
              placeholder="Sigismund"
              value={firstName}
              onChange={onChangeFirstName}
            />
            <LabeledInput
              autoFocus
              label="Last Name"
              placeholder="Freud"
              value={lastName}
              onChange={onChangeLastName}
            />
          </Row>
          <Row>
            <LabeledInput
              label="Email"
              placeholder="sigismund@freud.com"
              value={password}
              type="password"
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
          <Row>
            <LabeledInput
              label="Confirm Password"
              placeholder="••••••••••••"
              value={confirmPassword}
              type="password"
              onChange={onChangeConfirmPassword}
            />
          </Row>
          <Button type={ButtonTypes.Submit} text="Register" margin="20px 0 0" />
          <Footer>
            <Row>
              <Text>Already have an account?</Text>&nbsp;
              <Link to="/login">Login</Link>
            </Row>
          </Footer>
        </Content>
      </Modal>
    </Container>
  );
}
