import { Container, ButtonGroup, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div className='justify-content-center'>
      <Container className='center'>
        <h1 className='text-center'>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {!user.username ? (
          <ButtonGroup aria-label='Basic'>
            <Button as={Link} to='/login' variant='secondary'>
              Login In
            </Button>
            <Button as={Link} to='/signup' variant='secondary'>
              Sign up
            </Button>
          </ButtonGroup>
        ) : (
          <h3>Welcome Back, {user.username}!</h3>
        )}
      </Container>
    </div>
  );
};

export default Home;
