import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Form,
  InputGroup,
  Row,
  Col,
  FormControl,
  Button,
  CardText,
  FormLabel,
} from "react-bootstrap";

function formatToCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function Account({
  onSubmit,
  inputLabel,
  title,
  error,
  allAccounts = [],
  buttonText,
}) {
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const handleDeposit = (e) => {
    e.preventDefault();
    const balance =
      allAccounts.find((account) => account.id == selectedValue)?.balance ||
      "0.0";
    onSubmit(value, balance, selectedValue);
    setValue("");
  };

  const selectedAccountBalance = allAccounts.find(
    (account) => account.id == selectedValue
  )?.balance;

  useEffect(() => {
    if (allAccounts.length && !selectedValue)
      setSelectedValue(allAccounts[0]?.id);
  }, [allAccounts]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Option</Form.Label>
                <Form.Select
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  {allAccounts?.map((account) => (
                    <option value={account.id}>{account.accountname}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              {!!allAccounts.length ? (
                <>
                  <Row className="g-10 mt-3 mb-5">
                    <Col className="col-sm-6">
                      <CardText className="h6 ">Balance:</CardText>
                    </Col>
                    <Col className="col-sm-4">
                      <CardText className="h6">
                        {formatToCurrency(
                          parseFloat(selectedAccountBalance || "0.0")
                        )}
                      </CardText>
                    </Col>
                  </Row>
                  <Form onSubmit={handleDeposit} error>
                    <FormLabel> {inputLabel}</FormLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>$</InputGroup.Text>
                      <FormControl
                        type="number"
                        placeholder="Enter amount"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        isInvalid={!!error}
                      />
                      {error && (
                        <Form.Control.Feedback type="invalid">
                          {error}
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>
                    <Button disabled={!value} type="submit">
                      {buttonText}
                    </Button>
                  </Form>
                </>
              ) : (
                "Please Create an account first"
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
