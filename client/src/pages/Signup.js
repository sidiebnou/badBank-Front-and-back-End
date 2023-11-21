import { auth } from "../firebase"; // Adjust the path as needed
import { signOut, updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Container, Card, Form, Button, Row, Col, Nav } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignOut = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Handle signup
  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent form submission

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // After successful account creation, update the user's profile
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      setSuccessMsg("Account created successfully.");
      // ...
    } catch (error) {
      // Handle errors here
      console.error("Error during account creation:", error.message);
      // setErrorMsg(error.message); // if using a state to handle error messages
    }
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              {successMsg ? (
                <>
                  <div className="alert alert-success">{successMsg}</div>
                  <Button variant="primary" onClick={() => navigate("/signin")}>
                    Sign In
                  </Button>
                </>
              ) : (
                <>
                  <Card.Title>Sign Up</Card.Title>
                  <Form onSubmit={handleSignUp}>
                    <Form.Group controlId="fullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="fullName"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Button variant="primary mt-2" type="submit">
                      Sign up
                    </Button>
                  </Form>
                  <Nav className="mt-3">
                    <Nav.Item>
                      <Nav.Link onClick={() => navigate("/signin")}>
                        Already have an account? Login
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>{" "}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
