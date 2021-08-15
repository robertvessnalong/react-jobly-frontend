import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  const logoUrl = company.logoUrl !== null ? company.logoUrl : '';

  return (
    <Col>
      <Card as={Link} to={`companies/${company.handle}`} className='m-3 p-3'>
        <Card.Img variant='top' src={logoUrl} />
        <Card.Body>
          <Card.Title>{company.name}</Card.Title>
          <Card.Text>{company.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CompanyCard;
