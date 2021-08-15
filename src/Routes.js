import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './Navbar';
import Home from './Home';
import Companies from './CompanyList';
import CompanyDetail from './CompanyDetail';
import Jobs from './JobList';
import Login from './Login';
import SignUpForm from './Signup';
import Profile from './Profile';
import ErrorPage from './404';

const Routes = () => {
  return (
    <>
      <NavBar />
      <main>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/companies'>
            <Companies />
          </Route>
          <Route path='/companies/:id'>
            <CompanyDetail />
          </Route>
          <Route exact path='/jobs'>
            <Jobs />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <SignUpForm />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
          <Route exact path='/logout'>
            <Redirect to='/' />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default Routes;
