import Card from "react-bootstrap/Card";
import img from "../bank.png";

export default function Home() {
  return (
    <Card style={{ width: "500px", height: "600px", margin: 100 }} className="">
      <Card.Body>
        <p class="h4">WELCOME TO THE BANK</p>
        <p class="">For all your banking needs</p>
        <Card.Img
          style={{ width: "400px", padding: "40px" }}
          src={img}
        ></Card.Img>
      </Card.Body>
    </Card>
  );
}
