import { useState, useContext } from 'react';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import UserContext from './UserContext';

const LoginForm = () => {
  const history = useHistory();
  const { login } = useContext(UserContext);
  const initalState = {
    username: '',
    password: '',
  };
  const [formData, setFormData] = useState(initalState);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    const data = {
      username,
      password,
    };
    const res = await login(data);
    if (res.error) {
      setError(true);
      setErrorMsg(...res.error);
    } else if (res.login) {
      setFormData(initalState);
      history.push('/companies');
    }
  };
  return (
    <Container className='mt-4'>
      <h2>Login</h2>
      <Form className='w-50 m-auto bg-light p-3' onSubmit={handleSubmit}>
        {error && <Alert variant='danger'>{errorMsg}</Alert>}
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
