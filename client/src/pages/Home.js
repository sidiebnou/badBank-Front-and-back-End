import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import img from "../bank.png";

export default function Home() {
  return (
    <Container
      className="mt-5"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Card style={{ width: "500px" }}>
        <Card.Body>
          <p class="h4">WELCOME TO THE BANK</p>
          <p class="">For all your banking needs</p>
          <Card.Img
            style={{ width: "400px", padding: "40px" }}
            src={img}
          ></Card.Img>
        </Card.Body>
      </Card>
    </Container>
  );
}
