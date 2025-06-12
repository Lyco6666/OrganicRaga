import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import './admin.css';  // Add this with other imports

const AdminDashboard = () => {
  
  const [activeTab, setActiveTab] = useState('products');
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categories: [], // Add categories to initial state
    images: []
  });
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  // Define categories array
  const categories = ['Chilli', 'Oils', 'Rice', 'Turmeric', 'Pulses'];

  // Check admin authentication
  const [isLoggedIn] = useState(true); // Replace with actual auth check

  // ImageKit configuration
  const publicKey = "public_/uHIZBdABUIAS2ltaAsQMUw2ucY=";
  const urlEndpoint = "https://ik.imagekit.io/i9akffcs8";

  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth"); // Updated to port 5000
      if (!response.ok) throw new Error("Auth request failed");
      return await response.json();
    } catch (error) {
      console.error("Auth failed:", error);
      throw error;
    }
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

    const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    setDragOver(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // First get authentication from server
      const authData = await authenticator();
      if (!authData) {
        alert('Authentication failed');
        return;
      }
  
      // Upload files to ImageKit first
      const uploadPromises = files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('publicKey', publicKey);
        formData.append('signature', authData.signature);
        formData.append('expire', authData.expire.toString()); // Convert to string
        formData.append('token', authData.token);
  
        return fetch('https://upload.imagekit.io/api/v1/files/upload', {
          method: 'POST',
          body: formData // Remove headers as FormData sets them automatically
        })
        .then(response => response.json())
        .then(data => data.url)
        .catch(() => null);
      });
  
      const imageUrls = await Promise.all(uploadPromises);
      const validImageUrls = imageUrls.filter(url => url !== null);
  
      if (files.length > 0 && validImageUrls.length === 0) {
        alert('Failed to upload images. Please try again.');
        return;
      }
  
      // Submit product data with image URLs
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...productData,
          images: validImageUrls
        })
      });
  
      if (response.ok) {
        alert('Product saved successfully!');
        setProductData({
          name: '',
          description: '',
          price: '',
          stock: '',
          categories: [],
          images: []
        });
        setFiles([]);
      } else {
        alert('Error saving product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the product');
    }
  };
  
  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <Container fluid className="mt-4">
      {/* Add Admin Navigation Bar */}
      <Nav variant="tabs" className="admin-nav mb-4" activeKey={activeTab} onSelect={setActiveTab}>
        <Nav.Item>
          <Nav.Link eventKey="products">Products Management</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="homepage">Home Page Editor</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="cart">Shopping Cart Settings</Nav.Link>
        </Nav.Item>
      </Nav>

      <Row>
        {/* Products Upload Section - Only show when active tab is products */}
        {activeTab === 'products' && (
          <>
            <Col md={3} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="mb-4">Image Upload</h5>
                  <div 
                    className={`border-2 border-dashed p-4 text-center ${
                      dragOver ? 'border-primary bg-light' : 'border-secondary'
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                  >
                    <div className="mb-3">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          const selectedFiles = Array.from(e.target.files);
                          setFiles(selectedFiles);
                        }}
                        className="d-none"
                        id="fileInput"
                        accept="image/*"
                      />
                      <label htmlFor="fileInput" className="btn btn-outline-primary mb-3">
                        Select Files
                      </label>
                      <p className="text-muted">or drag and drop files here</p>
                    </div>
                    
                    {files.length > 0 && (
                      <div className="text-start">
                        <h6>Selected Files:</h6>
                        {files.map((file, i) => (
                          <div key={i} className="small text-truncate">
                            {file.name} ({Math.round(file.size / 1024)}KB)
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={9}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h4 className="mb-4">Product Management</h4>
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group controlId="productName">
                          <Form.Label>Product Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group controlId="productPrice">
                          <Form.Label>Price (₹)</Form.Label>
                          <Form.Control
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group controlId="productDescription">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="productStock">
                          <Form.Label>Stock Quantity</Form.Label>
                          <Form.Control
                            type="number"
                            name="stock"
                            value={productData.stock}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="productCategories">
                          <Form.Label>Categories</Form.Label>
                          <Form.Select 
                            multiple
                            value={productData.categories}
                            onChange={(e) => {
                              const options = [...e.target.options];
                              const selected = options
                                .filter(option => option.selected)
                                .map(option => option.value);
                              setProductData({...productData, categories: selected});
                            }}
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={12} className="mt-4">
                        <Button className="admin-btn-primary" variant="primary" type="submit" size="lg">
                          Save Product
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}

        {/* Home Page Editor Section */}
        {activeTab === 'homepage' && (
          <Col md={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4>Home Page Editor</h4>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Hero Carousel Images</Form.Label>
                    <Form.Control type="file" multiple />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Featured Products Selection</Form.Label>
                    <Form.Control as="select" multiple>
                      <option>Product 1</option>
                      <option>Product 2</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary">Save Changes</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}

        {/* Shopping Cart Editor Section */}
        {activeTab === 'cart' && (
          <Col md={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4>Cart Settings</h4>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Shipping Rates</Form.Label>
                    <Form.Control type="number" placeholder="Enter shipping cost" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="switch"
                      label="Enable Guest Checkout"
                    />
                  </Form.Group>
                  <Button variant="primary">Save Settings</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default AdminDashboard;