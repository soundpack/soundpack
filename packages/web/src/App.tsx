import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/Login.page';
import Register from "./pages/Register.page";
import ForgotPassword from "./pages/ForgotPassword.page";
import Loader, { LoaderSizes } from './elements/Loader';
import { Colors } from './styles/Colors';

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

type PageLoaderProps = {
  fade: boolean;
};

const PageLoaderContainer = styled.div<PageLoaderProps>`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.White};
  z-index: 1000;
  visibility: ${props => (props.fade ? "hidden" : null)};
  opacity: ${props => (props.fade ? 0 : null)};
  transition: ${props =>
    props.fade ? "visibility 0.2s 0.2s, opacity 0.2s ease-out" : null};
`;

function PageLoader() {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setTimeout(() => setFade(true), 1000);
  }, []);


  return (
    <PageLoaderContainer fade={fade}>
      <Loader size={LoaderSizes.Large} color={Colors.Purple} />
    </PageLoaderContainer>
  );
}

// function DashboardContainer({ match }: any) {
//   return (
//     <DashboardLayout>
//       <Switch>
//         <Route exact path={`${match.path}`} component={DashboardOverview} />
//         <Route exact path={`${match.path}/events`} component={EventList} />
//         <Route path={`${match.path}/events`} component={EventDetailsContainer} />
//         <Route path={`${match.path}/orders`} component={OrdersContainer} />
//         <Route path={`${match.path}/settings`} component={SettingsContainer} />
//       </Switch>
//     </DashboardLayout>
//   );
// }

// function AuthContainer({ match }: any) {
//  return (
//    <AccountLayout>
//      <Switch>
//        <div>This is the account</div>
//      </Switch>
//    </AccountLayout>
//  );
// }

export default function App() {
  useEffect(() => {
    // Checkout.initialize();
  }, []);
  
  return (
    <Fragment>
      {/* <PageLoader /> */}
      <Container>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </Container>
    </Fragment>
  );
};
