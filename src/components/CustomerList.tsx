import React, { useState, useEffect } from "react";
import { Card, ListGroup, FormControl, InputGroup } from "react-bootstrap";

interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}

interface CustomerListProps {
  onSelectCustomer: (id: number) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        const formattedCustomers = data.users.map((user: any) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          title: user.company.title,
          address: `${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.country}`,
        }));
        setCustomers(formattedCustomers);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const handleSelectCustomer = (id: number) => {
    setSelectedCustomerId(id);
    onSelectCustomer(id);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-list-container">
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#e0e0e0",
        }}
      >
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search Customers"
            aria-label="Search Customers"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <hr style={{ visibility: "hidden" }} />
      </div>

      <ListGroup>
        {filteredCustomers.map((customer) => (
          <ListGroup.Item
            key={customer.id}
            style={{
              padding: "0",
              border: "none",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <Card
              onClick={() => handleSelectCustomer(customer.id)}
              style={{
                cursor: "pointer",

                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor:
                  selectedCustomerId === customer.id
                    ? "rgba(170,0,0)"
                    : "white",
                color: selectedCustomerId === customer.id ? "white" : "black",
                padding: "10px",
              }}
              className={`customer-card ${
                selectedCustomerId === customer.id ? "selected-card" : ""
              }`}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor:
                    selectedCustomerId === customer.id
                      ? "black"
                      : "rgba(170,0,0)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  marginRight: "15px",
                  flexShrink: 0,
                }}
              >
                {customer.name.charAt(0)}
              </div>
              <div style={{ flexGrow: 1 }}>
                <Card.Title
                  style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}
                >
                  {customer.name}
                </Card.Title>
                <Card.Text style={{ fontSize: "1rem", margin: 0 }}>
                  {customer.title}
                </Card.Text>
              </div>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CustomerList;
