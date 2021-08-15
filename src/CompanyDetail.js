import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';
import JoblyApi from './api';

const CompanyDetail = () => {
  const [applied, setApplied] = useState([]);
  const storage = JSON.parse(localStorage.getItem('jobly-token'));
  const [companyDetails, setCompanyDetails] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getCompany = async () => {
      try {
        const handle = window.location.href.split('/').pop();
        const res = await JoblyApi.getCompany(handle);
        const resApps = await JoblyApi.getUserInfo(
          storage.username,
          storage.token
        );
        setApplied(resApps.user.applications);
        setCompanyDetails(res);
        setLoading(false);
      } catch (e) {
        console.error(e);
        history.push('/');
      }
    };
    getCompany();
  }, [history]);

  const handleApply = async (id) => {
    const res = await JoblyApi.ApplyToJob(storage.username, id);
    setApplied((data) => [...data, res.applied]);
  };

  if (isLoading) {
    return <div className='Loading'>Loading...</div>;
  }

  if (!localStorage.getItem('jobly-token')) {
    return <Redirect to='/login'></Redirect>;
  }

  return (
    <div className='Company'>
      <Container>
        <h2>{companyDetails.name}</h2>
        <p>{companyDetails.description}</p>
        <div className='Company-jobs'>
          <Row xs={1} md={2}>
            {companyDetails.jobs.map((job) => (
              <Col key={job.title}>
                <Card className='m-3 p-3'>
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    {job.salary && <Card.Text>Salary: {job.salary}</Card.Text>}
                    <Card.Text>Equity: {job.equity}</Card.Text>
                    {applied.includes(job.id) ? (
                      <Button disabled variant='primary light'>
                        Applied
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleApply(job.id)}
                        variant='primary'
                      >
                        Apply
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default CompanyDetail;
