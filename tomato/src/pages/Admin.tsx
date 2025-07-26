import React, { useState } from 'react';
import './Admin.css';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');

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
          <div className="order-card">
            <div className="order-info">
              <div className="order-icon">
                <img src="/assets/order-icon.png" alt="Order" />
              </div>
              <div>
                <div className="order-items">Greek salad x 2, Peri Peri Rolls x 3</div>
                <div className="order-customer">
                  <strong>Avinash Kumar</strong><br />
                  GreatStack, Whitefield,<br />
                  Bangalore, Karnataka, 560066, 560066<br />
                  9876543210
                </div>
              </div>
            </div>
            <div className="order-meta">
              <div>Items: 2</div>
              <div>$65</div>
              <select defaultValue="Out for delivery">
                <option>Food Processing</option>
                <option>Out for delivery</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>
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

export default Admin;