import React from 'react';
import { 
  Navbar, Nav, Container, Carousel, Row, Col, Card, Button 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const products = [
    {
      id: 1,
      name: "Organic Product 1",
      price: 1200,
      image: "/products1.jpg" // Make sure this file exists in public/
    },
    {
      id: 2,
      name: "Organic Product 2",
      price: 1500,
      image: "/product2.jpg"
    },
    {
      id: 3,
      name: "Organic Product 3",
      price: 900,
      image: "/product3.jpg"
    },
    {
      id: 4,
      name: "Organic Product 4",
      price: 1100,
      image: "/spices1.jpg"
    },
    // ...add more products as needed
  ];

  return (
    <>
      {/* Advanced Navbar with Hover Dropdown */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold">🌿 Organic Raga</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
              <Nav.Link as={Link} to="/products" className="mx-2">Shop</Nav.Link>
              <Nav.Link className="mx-2 dropdown-hover">
                Categories
                <Nav className="dropdown-menu-dark dropdown-menu pt-0">
                  <Nav.Link as={Link} to="/category/herbal-teas" className="dropdown-item">Herbal Teas</Nav.Link>
                  <Nav.Link as={Link} to="/category/oils" className="dropdown-item">Ayurvedic Oils</Nav.Link>
                  <Nav.Link as={Link} to="/category/spices" className="dropdown-item">Organic Spices</Nav.Link>
                </Nav>
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="mx-2">About</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="mx-2">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Carousel Section */}
      <section className="mt-5 pt-4">
        <Carousel fade interval={3000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/background1.jpg"
              alt="First slide"
            />
            <Carousel.Caption className="text-start mb-5">
              <h2 className="display-5 fw-bold">Discover Nature's Best</h2>
              <Button variant="success" size="lg" className="mt-3 rounded-pill px-4">
                Shop Now
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Add more carousel items */}
        </Carousel>
      </section>

      {/* Featured Products Section */}
      <section className="py-5 bg-light">
        <Container>
          <h3 className="text-center mb-4 display-6">Featured Products</h3>
          <div className="d-flex flex-nowrap overflow-x-auto pb-4">
            <Row className="flex-nowrap flex-md-wrap">
              {products.map(product => (
                <Col key={product.id} xs={8} md={4} lg={3} className="py-2">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="text-success">₹{product.price}</h5>
                        <Button variant="outline-success" size="sm">
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>

      {/* Featured Categories Section */}
      <section className="py-5">
        <Container>
          <h3 className="text-center mb-5 display-6">Shop by Category</h3>
          <Row className="g-4">
            {['Herbal Teas', 'Organic Spices', 'Ayurvedic Oils'].map((cat, i) => (
              <Col md={4} key={i}>
                <Card className="text-white border-0 overflow-hidden">
                  <Card.Img 
                    src="/spices.jpg"
                    alt="organic spices"
                  />
                  <Card.ImgOverlay className="d-flex align-items-center bg-dark bg-opacity-50">
                    <h4 className="text-center w-100">{cat}</h4>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-light py-5">
        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <h4>Organic Raga</h4>
              <p className="text-muted">Nurturing Wellness Through Nature's Bounty</p>
            </Col>
            <Col md={4} className="mb-4">
              <h5>Quick Links</h5>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/about" className="text-light">About Us</Nav.Link>
                <Nav.Link as={Link} to="/contact" className="text-light">Contact</Nav.Link>
                <Nav.Link as={Link} to="/faq" className="text-light">FAQs</Nav.Link>
              </Nav>
            </Col>
            <Col md={4}>
              <h5>Connect With Us</h5>
              <div className="d-flex gap-3 mt-3">
                <Button variant="outline-light" size="sm"><i className="fab fa-facebook"></i></Button>
                <Button variant="outline-light" size="sm"><i className="fab fa-instagram"></i></Button>
                <Button variant="outline-light" size="sm"><i className="fab fa-twitter"></i></Button>
              </div>
            </Col>
          </Row>
          <hr className="mt-5" />
          <p className="text-center text-muted mb-0">&copy; 2023 Organic Raga. All rights reserved.</p>
        </Container>
      </footer>
    </>
  );
};

export default HomePage;