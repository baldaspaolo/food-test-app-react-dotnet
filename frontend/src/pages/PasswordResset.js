import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetRequest = () => {
    // Simulate loading state for 2 seconds
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRequestSent(true);
    }, 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <h1>Password Reset</h1>
        {!requestSent ? (
          <form>
            <div className="p-field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              label="Reset Password"
              icon="pi pi-refresh"
              onClick={handleResetRequest}
              disabled={loading || !email}
            />
            {loading && (
              <ProgressSpinner
                style={{ width: "30px", height: "30px", marginLeft: "10px" }}
              />
            )}
          </form>
        ) : (
          <div>
            <p>Request sent.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
