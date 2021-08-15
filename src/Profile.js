import { useState, useEffect } from 'react';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import JoblyApi from './api';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();

  let initalState = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initalState);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const getUserInfo = async (storage) => {
      const { username, token } = storage;
      const res = await JoblyApi.getUserInfo(username, token);
      const user = res.user;
      setFormData({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
      });
    };
    if (initalState['username'] === '') {
      getUserInfo(JSON.parse(localStorage.getItem('jobly-token')));
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, firstName, lastName, email, password } = formData;
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    const res = await JoblyApi.update(data, username);
    if (res.error) {
      setError(true);
      setErrorMsg(...res.error);
    } else {
      const { username, firstName, lastName, email } = res.user;
      setFormData({
        username,
        firstName,
        lastName,
        email,
        password: '',
      });
    }
  };

  if (isLoading) {
    return <div className='Loading'>Loading...</div>;
  }

  return (
    <Container className='mt-4'>
      <h2>Profile</h2>
      <Form className='w-50 m-auto bg-light p-3' onSubmit={handleSubmit}>
        {error && <Alert variant='danger'>{errorMsg}</Alert>}
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label className='m-auto'>Username</Form.Label>
          <Form.Text as={'h3'} className='text-muted'>
            {formData.username}
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='firstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
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
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Confirm password to make changes:</Form.Label>
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

export default Profile;
