import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function AdminDashboard()
{
  return (
    <Container className="mt-5">
      <h1 className="ql">Admin Dashboard</h1>
      <Row className="mt-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>Create Quiz</h5>
              <Link to="/admin/create-quiz">
                <Button variant="primary">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>Create Question</h5>
              <Link to="/admin/create-question">
                <Button variant="primary">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>Manage Quizzes</h5>
              <Link to="/admin/manage-quizzes">
                <Button variant="primary">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>Manage Questions</h5>
              <Link to="/admin/manage-questions">
                <Button variant="primary">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
