import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccountSetup from './Pages/AccountSetUp/AccountSetUp';
import Dashboard from './Pages/Dashboard/Layout/Dashboard';

import Home from './Pages/Home';

import SignIn from './Pages/Auth/SignIn/SignIn';
import SignUp from './Pages/Auth/SignUp/SignUp';
import { Provider } from 'react-redux';
import store from './store/store';
import PrivateRoute from './Pages/Auth/privateRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/accountsetup" element={<AccountSetup />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
               <Route path="" element={<Dashboard />} />
               <Route path="*" element={<Dashboard />}/>
               
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
