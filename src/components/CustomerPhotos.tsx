import React, { useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";

interface CustomerPhotosProps {
  customerId: string;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomPhotos = (photos: any[], count: number) => {
  const shuffled = shuffleArray([...photos]);
  return shuffled.slice(0, count);
};

const CustomerPhotos: React.FC<CustomerPhotosProps> = ({ customerId }) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [displayedPhotos, setDisplayedPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = () => {
    setLoading(true);
    fetch(`https://api.pexels.com/v1/search?query=nature&per_page=30`, {
      headers: {
        Authorization:
          "HXmHu3D4Rg92a9gIdnu67ia2tcX2X999qSnw1N0WqIS5ev1MYq45ma9B",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.photos) {
          const randomPhotos = getRandomPhotos(data.photos, 9);
          setPhotos(data.photos);
          setDisplayedPhotos(randomPhotos);
          setLoading(false);
        } else {
          setError("No photos found");
          setLoading(false);
        }
      })
      .catch((error) => {
        setError("Error fetching photos");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, [customerId]);

  useEffect(() => {
    if (photos.length > 0) {
      const interval = setInterval(() => {
        setDisplayedPhotos(getRandomPhotos(photos, 9));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [photos, customerId]);

  return (
    <div style={{ marginTop: "20px" }}>
      <Row style={{ padding: "0px 50px" }}>
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <Col
                key={index}
                xs={4}
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "80%",
                    height: "220px",
                    overflow: "hidden",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: "10px",
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#c0c0c0",
                      borderRadius: "50%",
                    }}
                  ></div>
                </div>
              </Col>
            ))
          : displayedPhotos.map((photo) => (
              <Col
                key={photo.id}
                xs={4}
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "80%",
                    height: "220px",
                    overflow: "hidden",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: "10px",
                    transition: "opacity 0.5s ease-in-out",
                  }}
                >
                  <Image
                    src={photo.src.small}
                    alt={photo.alt}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    thumbnail
                  />
                </div>
              </Col>
            ))}
      </Row>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </div>
  );
};

export default CustomerPhotos;
