/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function NotSignedInNav() {
  const { currentUser } = useAuth();
  let navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };
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
          <div class="mr-2">
            <button
              style={{ marginRight: "20px" }}
              class="btn btn-light mr-2"
              aria-current="page"
              onClick={() => navigate("/accounts")}
            >
              Account
            </button>
            <button
              style={{ marginRight: "20px" }}
              class="btn btn-light mr-2"
              aria-current="page"
              onClick={() => navigate("/deposit")}
            >
              Deposit
            </button>
            <button
              style={{ marginRight: "20px" }}
              class="btn btn-light mr-2"
              aria-current="page"
              onClick={() => navigate("/withdraw")}
            >
              Withdraw
            </button>
          </div>
          <button
            class="btn btn-outline-success"
            onClick={() => handleSignOut()}
          >
            Sign Out
          </button>
          <button
            style={{ marginRight: "20px" }}
            class="btn btn-light mr-2 disabled"
          >
            {currentUser.displayName}
          </button>
        </div>
      </div>
    </nav>
  );
}
