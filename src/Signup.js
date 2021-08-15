import { useState, useContext } from 'react';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import UserContext from './UserContext';
import { useHistory } from 'react-router-dom';

const SignUpForm = () => {
  const initalState = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
  };
  const history = useHistory();
  const { signUp } = useContext(UserContext);
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
    const { username, password, first_name, last_name, email } = formData;
    const data = {
      username,
      password,
      firstName: first_name,
      lastName: last_name,
      email,
    };
    const res = await signUp(data);
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
      <h2>Sign Up</h2>
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
            required
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='first_name'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='First Name'
            name='first_name'
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='last_name'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Last Name'
            name='last_name'
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignUpForm;
