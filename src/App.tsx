import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container } from "react-bootstrap";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";

const App: React.FC = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );

  const handleSelectCustomer = (id: number) => {
    setSelectedCustomerId(id);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e0e0e0",
      }}
    >
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">Customer Details Portal</Navbar.Brand>
        </Container>
      </Navbar>

      <div
        style={{
          display: "flex",
          height: "100%",
          flexGrow: 1,
          paddingLeft: "40px",
          paddingTop: "20px",
        }}
      >
        <CustomerList onSelectCustomer={handleSelectCustomer} />

        {selectedCustomerId ? (
          <CustomerDetails customerId={selectedCustomerId.toString()} />
        ) : (
          <div style={styles.emptyStateContainer}>
            <div style={styles.emptyStateMessage}>
              Select a customer card to view details
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  emptyStateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    height: "80vh",
    textAlign: "center",
  },
  emptyStateMessage: {
    border: "2px dotted #ccc",
    padding: "20px",
    borderRadius: "10px",
    fontSize: "18px",
    color: "#777",
  },
};

export default App;
