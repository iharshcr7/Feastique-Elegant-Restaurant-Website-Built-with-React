const mysql = require('mysql2/promise');

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '$$$$$H@RSH$$$$$',
  });

  // Create database
  await connection.query('CREATE DATABASE IF NOT EXISTS feastique');
  await connection.query('USE feastique');

  // Drop existing tables
  await connection.query('DROP TABLE IF EXISTS payments');
  await connection.query('DROP TABLE IF EXISTS order_items');
  await connection.query('DROP TABLE IF EXISTS orders');
  await connection.query('DROP TABLE IF EXISTS customers');

  // Create customers table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS customers (
      customer_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create orders table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS orders (
      order_id INT AUTO_INCREMENT PRIMARY KEY,
      customer_id INT NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      gst_amount DECIMAL(10,2) DEFAULT 0,
      delivery_address TEXT NOT NULL,
      order_status ENUM('Pending', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled') DEFAULT 'Pending',
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      payment_mode ENUM('Cash', 'Card', 'UPI', 'Net Banking') NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    )
  `);

  // Create order_items table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      item_id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      item_name VARCHAR(100) NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
    )
  `);

  // Create payments table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS payments (
      payment_id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      payment_status ENUM('Pending', 'Completed', 'Failed', 'Refunded') DEFAULT 'Pending',
      transaction_id VARCHAR(100),
      payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
    )
  `);

  console.log('Database and tables created successfully');
  await connection.end();
}

initializeDatabase().catch(console.error);