import { getAuth } from "firebase/auth";

export const getAllAccounts = async () => {
  const { currentUser } = getAuth();
  try {
    const token = await currentUser.getIdToken();
    const response = await fetch("/api/getAllAccounts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error getting the user token:", error);
  }
};

export const updateAccount = async (id, balance) => {
  const { currentUser } = getAuth();
  try {
    const token = await currentUser.getIdToken();
    const response = await fetch("/api/updateAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, balance }),
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw new Error("Error getting the user token:", error);
  }
};

export const createAccount = async (name) => {
  const { currentUser } = getAuth();
  try {
    const token = await currentUser.getIdToken();
    const response = await fetch("/api/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error getting the user token:", error);
  }
};

export const deleteAccount = async (id) => {
  const { currentUser } = getAuth();
  try {
    const token = await currentUser.getIdToken();
    const response = await fetch("/api/deleteAccount/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error("Error getting the user token:", error);
  }
};
