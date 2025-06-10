import React, { useState } from 'react';
import { 
  Container, Navbar, Nav, Form, FormControl, Button, 
  Row, Col, Card, Accordion, ListGroup, Badge
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    category: [],
    priceRange: null,
    rating: null
  });

  const categories = [
    'Herbal Teas', 'Organic Spices', 'Ayurvedic Oils', 
    'Natural Cosmetics', 'Superfoods', 'Wellness Kits'
  ];

  const priceRanges = [
    'Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Over ₹2000'
  ];

  const ratings = [5, 4, 3, 2];

  const toggleCategory = (category) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  return (
    <>
      {/* Navbar remains unchanged */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#" className="fw-bold">Organic Raga</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#products">Products</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
            {/* Curved Search Design */}
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search products..."
                className="me-2 rounded-pill"
                aria-label="Search"
              />
              <Button variant="outline-light" className="rounded-pill">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Products Overview Section */}
      <section className="py-4 bg-light">
        <Container>
          <h2 className="text-center mb-3">Our Organic Collection</h2>
          <p className="text-center text-muted mb-4">
            Discover our premium selection of organic products
          </p>
        </Container>
      </section>

      {/* Main Content with Filters */}
      <Container className="py-4">
        <Row>
          {/* Filters Sidebar */}
          <Col md={3} className="mb-4">
            <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
              <Card.Body>
                <h5 className="mb-3">Filters</h5>
                
                {/* Categories Filter */}
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Categories</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        {categories.map((cat, i) => (
                          <ListGroup.Item 
                            key={i}
                            action 
                            active={filters.category.includes(cat)}
                            onClick={() => toggleCategory(cat)}
                          >
                            {cat}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Price Range Filter */}
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Price Range</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        {priceRanges.map((range, i) => (
                          <ListGroup.Item 
                            key={i}
                            action 
                            active={filters.priceRange === range}
                            onClick={() => setFilters(prev => ({
                              ...prev,
                              priceRange: prev.priceRange === range ? null : range
                            }))}
                          >
                            {range}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Rating Filter */}
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Rating</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        {ratings.map((rating, i) => (
                          <ListGroup.Item 
                            key={i}
                            action 
                            active={filters.rating === rating}
                            onClick={() => setFilters(prev => ({
                              ...prev,
                              rating: prev.rating === rating ? null : rating
                            }))}
                          >
                            {'★'.repeat(rating).padEnd(5, '☆')} & above
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>

          {/* Products Grid */}
          <Col md={9}>
            <div className="d-flex justify-content-between mb-4">
              <h5>Showing {6} products</h5>
              <Form.Select style={{ width: '200px' }}>
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
              </Form.Select>
            </div>

            <Row xs={1} md={2} lg={3} className="g-4">
              {[...Array(6)].map((_, i) => (
                <Col key={i}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Img 
                      variant="top" 
                      src={`https://via.placeholder.com/300x200?text=Product+${i+1}`}
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <div className="mb-2">
                        <Badge bg="success" className="me-1">Organic</Badge>
                        <Badge bg="warning" text="dark">Ayurvedic</Badge>
                      </div>
                      <Card.Title>Organic Product {i+1}</Card.Title>
                      <Card.Text className="text-muted">
                        Premium quality organic product with natural ingredients.
                      </Card.Text>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0 text-success">₹{Math.floor(Math.random() * 2000) + 500}</h5>
                          <div className="text-warning">★★★★☆</div>
                        </div>
                        <Button 
                          variant="outline-success" 
                          className="w-100 mt-2 rounded-pill"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductsPage;