import { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  InputGroup,
  FormControl,
  Table,
  Button,
} from "react-bootstrap";
import { createAccount, deleteAccount } from "../api";
import { useAuth } from "../AuthContext";

export default function Accounts({ accounts, getAllAccounts }) {
  const { currentUser } = useAuth();
  const [value, setValue] = useState();
  const handleCreateAccount = async () => {
    await createAccount(value);
    getAllAccounts();
    setValue("");
  };

  const handleDelete = (id) => {
    deleteAccount(id);
    getAllAccounts();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Accounts</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Account Name</th>
                    <th>Balance</th>
                    <th>Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts?.map((account, index) => (
                    <tr key={index}>
                      <td>{account.accountname}</td>
                      <td>{account.balance}</td>
                      <td>{currentUser.displayName}</td>
                      <Button
                        variant="info"
                        style={{
                          padding: "5px",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                        onClick={() => handleDelete(account.id)}
                      >
                        Delete
                      </Button>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  placeholder="New account name"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </InputGroup>
              <Button
                disabled={!value}
                type="submit"
                onClick={() => handleCreateAccount()}
              >
                Create Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
