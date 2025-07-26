import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import axios from 'axios';

interface Order {
  order_id: number;
  user_name: string;
  total_amount: number;
  gst_amount: number;
  delivery_address: string;
  order_status: string;
  order_date: string;
  payment_mode: string;
  items: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src="/assets/logo-dark.png" alt="Feastique Logo" />
          <span className="admin-panel-label">Admin Panel</span>
        </div>
        <nav>
          <ul>
            <li className={activeTab === 'add' ? 'active' : ''}>
              <button onClick={() => setActiveTab('add')}>+ Add Items</button>
            </li>
            <li className={activeTab === 'list' ? 'active' : ''}>
              <button onClick={() => setActiveTab('list')}>✔ List Items</button>
            </li>
            <li className={activeTab === 'orders' ? 'active' : ''}>
              <button onClick={() => setActiveTab('orders')}>✔ Orders</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main">
        <header>
          <h2 className="admin-heading">
            {activeTab === 'add' && 'Add Items'}
            {activeTab === 'list' && 'List Items'}
            {activeTab === 'orders' && 'Order Page'}
          </h2>
        </header>
        {activeTab === 'orders' && (
          <>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map(order => {
                // Count items
                const itemCount = order.items.split(',').length;
                // Calculate total
                const total = (Number(order.total_amount) + Number(order.gst_amount)).toFixed(2);
                return (
                  <div className="order-card" key={order.order_id}>
                    <div className="order-info">
                      <div className="order-icon">
                        <img src="/assets/shopping-bag.png" alt="Order" />
                      </div>
                      <div>
                        <div className="order-items">{order.items}</div>
                        <div className="order-customer">
                          <strong>{order.user_name}</strong><br />
                          {order.delivery_address}
                        </div>
                      </div>
                    </div>
                    <div className="order-meta">
                      <div>Items: {itemCount}</div>
                      <div>₹{total}</div>
                      <select value={order.order_status} onChange={e => handleStatusChange(order.order_id, e.target.value)} className={`status-dropdown status-${order.order_status.replace(/\s/g, '').toLowerCase()}`}>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
        {activeTab === 'list' && (
          <div className="list-items-content">
            <p>Here you can list all items. (Implement your list here.)</p>
          </div>
        )}
        {activeTab === 'add' && (
          <div className="add-items-content">
            <p>Here you can add new items. (Implement your add form here.)</p>
          </div>
        )}
      </main>
      <div className="admin-avatar">
        <img src="/assets/admin.png" alt="Admin" />
      </div>
    </div>
  );
};

export default AdminDashboard;