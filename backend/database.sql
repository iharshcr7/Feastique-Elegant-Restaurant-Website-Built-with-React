-- Create database
CREATE DATABASE IF NOT EXISTS mcdonalds_db;
USE mcdonalds_db;

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(50),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(20) UNIQUE NOT NULL,
    customer_name VARCHAR(100),
    customer_phone VARCHAR(20),
    customer_email VARCHAR(100),
    delivery_address TEXT,
    payment_method ENUM('COD', 'ONLINE') DEFAULT 'COD',
    order_status ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'ON_THE_WAY', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    total_amount DECIMAL(10,2) NOT NULL,
    gst_amount DECIMAL(10,2) NOT NULL,
    final_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Order Items Table (for multiple items in one order)
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_time DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, image_url, category) VALUES
('Aloo Tikki Burger', 'Crispy potato patty with fresh vegetables and special sauce', 99.00, '/assets/McAloo-tikki.png', 'Burgers'),
('Paneer Burger', 'Grilled paneer patty with fresh vegetables and mint chutney', 129.00, '/assets/mcspicy-paneer.png', 'Burgers'),
('French Fries (Regular)', 'Crispy golden fries with a hint of salt', 79.00, '/assets/fries.png', 'Sides'),
('McSpicy Paneer', 'Spicy paneer patty with fresh vegetables and special sauce', 149.00, '/assets/mcspicy.jpg', 'Burgers'),
('McVeggie', 'Vegetable patty with fresh vegetables and special sauce', 119.00, '/assets/mcveggie-burger.png', 'Burgers'),
('McFlurry Oreo', 'Creamy vanilla soft serve with crushed Oreo cookies', 99.00, '/assets/mcflurry.jpg', 'Desserts'); 