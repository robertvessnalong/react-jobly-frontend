import { Col, Card, Button } from 'react-bootstrap';

const JobCard = ({ job, app, apply }) => {
  return (
    <Col>
      <Card className='m-3 p-3'>
        <Card.Body>
          <Card.Title>{job.title}</Card.Title>
          <Card.Text>{job.companyName}</Card.Text>
          {job.salary && <Card.Text>Salary: {job.salary}</Card.Text>}
          {job.equity && <Card.Text>Equity: {job.equity}</Card.Text>}
          {app.includes(job.id) ? (
            <Button disabled variant='primary light'>
              Applied
            </Button>
          ) : (
            <Button onClick={() => apply(job.id)} variant='primary'>
              Apply
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default JobCard;
