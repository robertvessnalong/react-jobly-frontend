import { useEffect, useState } from 'react';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import JoblyApi from './api';

const CompanyList = () => {
  const INITAL_STATE = {
    search: '',
  };

  const [companyList, setCompanyList] = useState([]);
  const [formData, setFormData] = useState(INITAL_STATE);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getCompanies = async () => {
      const res = await JoblyApi.getAllorFilterCompanies();

      setCompanyList(res.companies);
      setLoading(false);
    };
    getCompanies();
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
    const { search } = formData;
    const res =
      search !== ''
        ? await JoblyApi.getAllorFilterCompanies(search)
        : await JoblyApi.getAllorFilterCompanies();
    setCompanyList(res.companies);
  };

  if (isLoading) {
    return <div className='Loading'>Loading...</div>;
  }

  if (!localStorage.getItem('jobly-token')) {
    return <Redirect to='/login'></Redirect>;
  }

  return (
    <div className='CompanyList'>
      <Container>
        <Form onSubmit={handleSubmit} className='m-3'>
          <Row>
            <Col>
              <Form.Control
                onChange={handleChange}
                type='text'
                name='search'
                placeholder='Search...'
              ></Form.Control>
            </Col>
            <Col xs='auto'>
              <Button type='submit' className='mb-2'>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <div className='CompanyCardList'>
        <Container>
          <Row xs={1} md={2}>
            {companyList.length >= 1 ? (
              companyList.map((company) => (
                <CompanyCard company={company} key={company.handle} />
              ))
            ) : (
              <Container>
                <div className='NoResults'>Sorry, no results were found!</div>
              </Container>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default CompanyList;
