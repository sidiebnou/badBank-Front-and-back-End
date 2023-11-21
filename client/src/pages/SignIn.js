import { auth, githubAuthProvider } from "../firebase"; // Adjust the path as needed
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Container, Card, Form, Button, Row, Col, Nav } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        navigate("/accounts");
      })
      .catch((error) => setError("User not found"));
  };

  // Handle GitHub login
  const handleSignInWithGitHub = () => {
    signInWithPopup(auth, githubAuthProvider)
      .then(() => {
        navigate("/accounts");
      })
      .catch((error) => {
        // Handle errors
        setError("Ops: Error signing in with GitHub");
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              {error && <div className="alert alert-danger">{error}</div>}
              {/* Email and Password Fields */}
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary  mt-2" type="submit">
                  Login
                </Button>
              </Form>

              {/* GitHub Login */}
              <Button
                variant="dark"
                className="mt-3"
                onClick={handleSignInWithGitHub}
              >
                Login with GitHub
              </Button>

              {/* Sign Up Link */}
              <Nav className="mt-3">
                <Nav.Item>
                  <Nav.Link onClick={() => navigate("/signup")}>
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
