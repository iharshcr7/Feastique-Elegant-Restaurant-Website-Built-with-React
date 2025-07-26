const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pool = require('./db')

const app = express()
const port = 5000

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Create tables if they don't exist
const initializeDatabase = async () => {
  const connection = await pool.getConnection();
  try {
    // Drop tables in correct order (respecting foreign key constraints)
    await connection.query('DROP TABLE IF EXISTS order_items');
    await connection.query('DROP TABLE IF EXISTS payments');
    await connection.query('DROP TABLE IF EXISTS orders');
    await connection.query('DROP TABLE IF EXISTS users');

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('customer', 'restaurant_owner', 'admin') NOT NULL DEFAULT 'customer'
      )
    `);

    // Create orders table with correct structure
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        order_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        gst_amount DECIMAL(10,2) NOT NULL,
        delivery_address TEXT NOT NULL,
        payment_mode VARCHAR(50) NOT NULL,
        order_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Create order items table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        item_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
      )
    `);

    // Create payments table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS payments (
        payment_id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
        payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
      )
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    connection.release();
  }
};

// Initialize database
initializeDatabase();

// Place a new order
app.post('/api/orders', async (req, res) => {
  console.log('Received order request:', req.body);
  const { user_id, items, total_amount, gst_amount, delivery_address, payment_mode, order_status } = req.body;
  
  // Validate required fields
  if (!user_id || !items || !total_amount || !delivery_address || !payment_mode) {
    console.log('Missing required fields:', { user_id, items, total_amount, delivery_address, payment_mode });
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields',
      received: { user_id, items, total_amount, delivery_address, payment_mode }
    });
  }

  const connection = await pool.getConnection();
  
  try {
    // First verify if user exists
    const [users] = await connection.query('SELECT id FROM users WHERE id = ?', [user_id]);
    if (users.length === 0) {
      console.log('User not found:', user_id);
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    await connection.beginTransaction();

    // Insert order
    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id, total_amount, gst_amount, delivery_address, payment_mode, order_status) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, total_amount, gst_amount, delivery_address, payment_mode, order_status || 'Pending']
    );

    const order_id = orderResult.insertId;
    console.log('Order created with ID:', order_id);

    // Insert order items
    for (const item of items) {
      await connection.query(
        'INSERT INTO order_items (order_id, item_name, quantity, price) VALUES (?, ?, ?, ?)',
        [order_id, item.item_name, item.quantity, item.price]
      );
    }

    await connection.commit();
    console.log('Order placed successfully');
    
    res.json({ 
      success: true, 
      order_id,
      message: 'Order placed successfully'
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error placing order:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to place order',
      details: error.message
    });
  } finally {
    connection.release();
  }
});

// Register Route
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log('Register Request:', req.body);

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const connection = await pool.getConnection();
  try {
    // First check if email exists
    const [existingUsers] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // If email doesn't exist, insert new user
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );

    console.log('User registered successfully:', result);
    return res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: result.insertId,
        name,
        email,
        role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Registration failed' });
  } finally {
    connection.release();
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login Request:', req.body);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const connection = await pool.getConnection();
  try {
    const [users] = await connection.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    return res.status(200).json({ 
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    connection.release();
  }
});

// Get all menu items
app.get('/api/menu-items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM menu_items WHERE is_available = 1')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching menu items' })
  }
})

// Add item to cart
app.post('/api/cart', async (req, res) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const { menu_item_id, quantity, user_id } = req.body

    // Check if item already exists in cart
    const [existingItem] = await connection.query(
      'SELECT * FROM cart WHERE menu_item_id = ? AND user_id = ?',
      [menu_item_id, user_id]
    )

    if (existingItem.length > 0) {
      // Update quantity if item exists
      await connection.query(
        'UPDATE cart SET quantity = quantity + ? WHERE menu_item_id = ? AND user_id = ?',
        [quantity, menu_item_id, user_id]
      )
    } else {
      // Insert new item if it doesn't exist
      await connection.query(
        'INSERT INTO cart (menu_item_id, quantity, user_id) VALUES (?, ?, ?)',
        [menu_item_id, quantity, user_id]
      )
    }

    await connection.commit()
    res.json({ success: true, message: 'Item added to cart' })
  } catch (error) {
    await connection.rollback()
    console.error(error)
    res.status(500).json({ error: 'Error adding item to cart' })
  } finally {
    connection.release()
  }
})

// Get cart items
app.get('/api/cart/:user_id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.*, mi.name, mi.price, mi.image_url 
       FROM cart c 
       JOIN menu_items mi ON c.menu_item_id = mi.id 
       WHERE c.user_id = ?`,
      [req.params.user_id]
    )
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching cart items' })
  }
})

// Get all orders (for admin)
app.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT o.*, u.name as user_name,
        GROUP_CONCAT(CONCAT(oi.item_name, ' (', oi.quantity, ')') SEPARATOR ', ') as items
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN order_items oi ON o.order_id = oi.order_id
      GROUP BY o.order_id
      ORDER BY o.order_date DESC
    `);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order history for a user
app.get('/api/orders/history/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const [orders] = await pool.query(`
      SELECT 
        o.order_id,
        o.order_date,
        o.total_amount,
        o.gst_amount,
        o.order_status,
        o.delivery_address,
        o.payment_mode,
        u.name as user_name,
        GROUP_CONCAT(CONCAT(oi.item_name, ' (', oi.quantity, ')') SEPARATOR ', ') as items
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN order_items oi ON o.order_id = oi.order_id
      WHERE o.user_id = ?
      GROUP BY o.order_id
      ORDER BY o.order_date DESC
    `, [userId]);

    res.json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
});

// Get all restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM restaurants')
    res.json(rows)
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    res.status(500).json({ error: 'Error fetching restaurants' })
  }
})

// Get restaurants by cuisine type
app.get('/api/restaurants/cuisine/:type', async (req, res) => {
  try {
    const cuisineType = req.params.type;
    console.log('Fetching restaurants for cuisine:', cuisineType);

    const [rows] = await pool.query(
      'SELECT * FROM restaurants WHERE type_of_cuisine = ?',
      [cuisineType]
    );

    console.log('Found restaurants:', rows);

    if (rows.length === 0) {
      return res.status(404).json({
        message: `No restaurants found for cuisine type: ${cuisineType}`
      });
    }

    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Error fetching restaurants',
      details: error.message
    });
  }
});

// Get menu items for a specific restaurant
app.get('/api/restaurants/:id/menu', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM menu_items WHERE restaurant_id = ?',
      [req.params.id]
    )
    res.json(rows)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    res.status(500).json({ error: 'Error fetching menu items' })
  }
})

// Get a specific restaurant
app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM restaurants WHERE restaurant_id = ?',
      [req.params.id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' })
    }
    res.json(rows[0])
  } catch (error) {
    console.error('Error fetching restaurant:', error)
    res.status(500).json({ error: 'Error fetching restaurant' })
  }
})

// Update order status
app.put('/api/orders/:orderId/status', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    await pool.query(
      'UPDATE orders SET order_status = ? WHERE order_id = ?',
      [status, orderId]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Get order details by orderId
app.get('/api/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const [orders] = await pool.query(
      `SELECT o.*, u.name as user_name,
        GROUP_CONCAT(CONCAT(oi.item_name, ' (', oi.quantity, ')') SEPARATOR ', ') as items
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN order_items oi ON o.order_id = oi.order_id
      WHERE o.order_id = ?
      GROUP BY o.order_id`,
      [orderId]
    );
    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(orders[0]);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
