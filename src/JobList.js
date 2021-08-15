import { useEffect, useState, useContext } from 'react';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import JobCard from './JobCard';
import JoblyApi from './api';

const Jobs = () => {
  const INITAL_STATE = {
    search: '',
  };
  const [applied, setApplied] = useState([]);
  const storage = JSON.parse(localStorage.getItem('jobly-token'));
  const [jobList, setJobList] = useState([]);
  const [formData, setFormData] = useState(INITAL_STATE);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      const res = await JoblyApi.getAllorFilterJobs();
      const resApps = await JoblyApi.getUserInfo(
        storage.username,
        storage.token
      );
      setApplied(resApps.user.applications);
      setJobList(res.jobs);
      setLoading(false);
    };
    getJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleApply = async (id) => {
    const res = await JoblyApi.ApplyToJob(storage.username, id);
    setApplied((data) => [...data, res.applied]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { search } = formData;
    const res =
      search !== ''
        ? await JoblyApi.getAllorFilterJobs(search)
        : await JoblyApi.getAllorFilterJobs();
    setJobList(res.jobs);
  };

  if (isLoading) {
    return <div className='Loading'>Loading...</div>;
  }

  if (!localStorage.getItem('jobly-token')) {
    return <Redirect to='/login'></Redirect>;
  }

  return (
    <div className='JobList'>
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
      <div className='JobCardList'>
        <Container>
          <Row xs={1} md={2}>
            {jobList.length >= 1 ? (
              jobList.map((job) => (
                <JobCard
                  app={applied}
                  job={job}
                  key={job.id}
                  apply={handleApply}
                />
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

export default Jobs;
