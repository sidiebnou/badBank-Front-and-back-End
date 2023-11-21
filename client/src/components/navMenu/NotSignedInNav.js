/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";

export default function NotSignedInNav() {
  let navigate = useNavigate();
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="" onClick={() => navigate("/")}>
          Bad Bank
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          <button
            style={{ marginRight: "20px" }}
            class="btn btn-primary"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
          <button
            class="btn btn-outline-success"
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
