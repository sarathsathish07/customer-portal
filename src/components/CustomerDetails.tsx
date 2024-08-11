import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import CustomerPhotos from "./CustomerPhotos";

interface CustomerDetailsProps {
  customerId: string;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customerId }) => {
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/users/${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        setCustomer(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
        setLoading(false);
      });
  }, [customerId]);

  return (
    <div className="details-container">
      <Card className="details-card">
        <Card.Body>
          <div className="content">
            <div className="details-title">
              {loading ? (
                <div className="placeholder title-placeholder"></div>
              ) : (
                <h2>
                  {customer.firstName} {customer.lastName}
                </h2>
              )}
            </div>

            <div className="details-company">
              {loading ? (
                <div className="placeholder company-placeholder"></div>
              ) : (
                <p style={{ marginBottom: "2px" }}>{customer.company.title}</p>
              )}
            </div>

            <div className="details-address">
              {loading ? (
                <div className="placeholder address-placeholder"></div>
              ) : (
                <p>
                  {customer.address.address}, {customer.address.city},{" "}
                  {customer.address.state}, {customer.address.country}
                </p>
              )}
            </div>

            <div className="photos-section">
              <CustomerPhotos customerId={customerId} />
            </div>
          </div>
          {loading && (
            <div className="overlay">
              <div className="overlay-text">Loading...</div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomerDetails;
