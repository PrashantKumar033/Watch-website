// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';

// Auth state management
let currentUser = JSON.parse(localStorage.getItem('user')) || null;
let authToken = localStorage.getItem('token') || null;

// API Helper functions
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { 'Authorization': `Bearer ${authToken}` })
    },
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    showNotification(error.message, 'error');
    throw error;
  }
};

// Authentication functions
const login = async (email, password) => {
  const data = await apiCall('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  
  currentUser = data;
  authToken = data.token;
  localStorage.setItem('user', JSON.stringify(data));
  localStorage.setItem('token', data.token);
  
  showNotification('Login successful!', 'success');
  updateUserUI();
  return data;
};

const register = async (name, email, password) => {
  const data = await apiCall('/users/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  });
  
  currentUser = data;
  authToken = data.token;
  localStorage.setItem('user', JSON.stringify(data));
  localStorage.setItem('token', data.token);
  
  showNotification('Registration successful!', 'success');
  updateUserUI();
  return data;
};

const logout = () => {
  currentUser = null;
  authToken = null;
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  showNotification('Logged out successfully!', 'success');
  updateCartUI();
  updateUserUI();
};

// Update user interface
const updateUserUI = () => {
  const userSection = document.getElementById('nav-user');
  const loginSection = document.getElementById('nav-login');
  const userName = document.getElementById('user-name');
  
  if (currentUser && authToken) {
    if (userSection) {
      userSection.style.display = 'block';
      userSection.style.position = 'relative';
    }
    if (loginSection) loginSection.style.display = 'none';
    if (userName) userName.textContent = currentUser.name;
  } else {
    if (userSection) userSection.style.display = 'none';
    if (loginSection) loginSection.style.display = 'block';
  }
};

// Product functions
const getProducts = async (category = '') => {
  const endpoint = category ? `/products?category=${category}` : '/products';
  return await apiCall(endpoint);
};

// Cart functions
const addToCart = async (productId, quantity = 1) => {
  if (!authToken) {
    showAuthModal();
    return;
  }
  
  const data = await apiCall('/cart/add', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity })
  });
  
  showNotification('Item added to cart!', 'success');
  updateCartUI();
  return data;
};

const getCart = async () => {
  if (!authToken) return { items: [], totalAmount: 0 };
  return await apiCall('/cart');
};

const updateCartItem = async (productId, quantity) => {
  return await apiCall('/cart/update', {
    method: 'PUT',
    body: JSON.stringify({ productId, quantity })
  });
};

const removeFromCart = async (productId) => {
  return await apiCall(`/cart/remove/${productId}`, {
    method: 'DELETE'
  });
};

// Newsletter function
const subscribeNewsletter = async (email) => {
  const data = await apiCall('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
  
  showNotification('Successfully subscribed to newsletter!', 'success');
  return data;
};

// Order function
const createOrder = async (shippingAddress, paymentMethod = 'cod') => {
  if (!authToken) {
    showAuthModal();
    return;
  }
  
  return await apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify({ shippingAddress, paymentMethod })
  });
};

// UI Helper functions
const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    z-index: 10000;
    font-weight: 500;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const showAuthModal = () => {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;">
      <div style="background: white; padding: 30px; border-radius: 10px; max-width: 400px; width: 90%;">
        <h3 style="margin-bottom: 20px; text-align: center;">Login Required</h3>
        <form id="authForm">
          <input type="text" id="authName" placeholder="Name" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px; display: none;">
          <input type="email" id="authEmail" placeholder="Email" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px;">
          <input type="password" id="authPassword" placeholder="Password" required style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 5px;">
          <button type="submit" id="authSubmit" style="width: 100%; padding: 12px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 10px;">Login</button>
          <button type="button" id="authToggle" style="width: 100%; padding: 10px; background: transparent; color: #333; border: 1px solid #333; border-radius: 5px; cursor: pointer; margin-bottom: 10px;">Switch to Register</button>
          <button type="button" id="authClose" style="width: 100%; padding: 10px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
        </form>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  let isLogin = true;
  const nameField = modal.querySelector('#authName');
  const submitBtn = modal.querySelector('#authSubmit');
  const toggleBtn = modal.querySelector('#authToggle');
  
  toggleBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    nameField.style.display = isLogin ? 'none' : 'block';
    nameField.required = !isLogin;
    submitBtn.textContent = isLogin ? 'Login' : 'Register';
    toggleBtn.textContent = isLogin ? 'Switch to Register' : 'Switch to Login';
  });
  
  modal.querySelector('#authForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = modal.querySelector('#authEmail').value;
    const password = modal.querySelector('#authPassword').value;
    const name = modal.querySelector('#authName').value;
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      modal.remove();
    } catch (error) {
      // Error already handled in apiCall
    }
  });
  
  modal.querySelector('#authClose').addEventListener('click', () => {
    modal.remove();
  });
};

const updateCartUI = async () => {
  if (!authToken) return;
  
  try {
    const cart = await getCart();
    const cartContainer = document.querySelector('.cart__container');
    const cartPrices = document.querySelector('.cart__prices');
    
    if (cartContainer) {
      cartContainer.innerHTML = cart.items.map(item => `
        <article class="cart__card">
          <div class="cart__box">
            <img src="${item.product.image}" alt="" class="cart__img">
          </div>
          <div class="cart__details">
            <h3 class="cart__title">${item.product.name}</h3>
            <span class="cart__price">$${item.product.price}</span>
            <div class="cart__amount">
              <div class="cart__amount-content">
                <span class="cart__amount-box" onclick="updateQuantity('${item.product._id}', ${item.quantity - 1})">
                  <i class='bx bx-minus'></i>
                </span>
                <span class="cart__amount-number">${item.quantity}</span>
                <span class="cart__amount-box" onclick="updateQuantity('${item.product._id}', ${item.quantity + 1})">
                  <i class='bx bx-plus'></i>
                </span>
              </div>
              <i class='bx bx-trash-alt cart__amount-trash' onclick="removeItem('${item.product._id}')"></i>
            </div>
          </div>
        </article>
      `).join('');
    }
    
    if (cartPrices) {
      cartPrices.innerHTML = `
        <span class="cart__prices-item">${cart.items.length} items</span>
        <span class="cart__prices-total">$${cart.totalAmount}</span>
      `;
    }
  } catch (error) {
    console.error('Error updating cart UI:', error);
  }
};

const updateQuantity = async (productId, quantity) => {
  try {
    if (quantity <= 0) {
      await removeFromCart(productId);
    } else {
      await updateCartItem(productId, quantity);
    }
    updateCartUI();
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};

const removeItem = async (productId) => {
  try {
    await removeFromCart(productId);
    updateCartUI();
    showNotification('Item removed from cart!', 'success');
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

// Checkout functionality
const showCheckoutModal = () => {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center; overflow-y: auto;">
      <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto;">
        <h3 style="margin-bottom: 20px; text-align: center;">Checkout</h3>
        <form id="checkoutForm">
          <h4 style="margin-bottom: 15px;">Shipping Address</h4>
          <input type="text" id="street" placeholder="Street Address" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px;">
          <input type="text" id="city" placeholder="City" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px;">
          <input type="text" id="state" placeholder="State" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px;">
          <input type="text" id="zipCode" placeholder="Zip Code" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px;">
          <input type="text" id="country" placeholder="Country" required style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 5px;">
          
          <h4 style="margin-bottom: 15px;">Payment Method</h4>
          <select id="paymentMethod" style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
          
          <button type="submit" style="width: 100%; padding: 12px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 10px;">Place Order</button>
          <button type="button" id="checkoutClose" style="width: 100%; padding: 10px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
        </form>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  modal.querySelector('#checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const shippingAddress = {
      street: modal.querySelector('#street').value,
      city: modal.querySelector('#city').value,
      state: modal.querySelector('#state').value,
      zipCode: modal.querySelector('#zipCode').value,
      country: modal.querySelector('#country').value
    };
    
    const paymentMethod = modal.querySelector('#paymentMethod').value;
    
    try {
      await createOrder(shippingAddress, paymentMethod);
      modal.remove();
      showNotification('Order placed successfully!', 'success');
      updateCartUI();
      
      // Close cart
      const cart = document.getElementById('cart');
      if (cart) cart.classList.remove('show-cart');
    } catch (error) {
      console.error('Checkout error:', error);
    }
  });
  
  modal.querySelector('#checkoutClose').addEventListener('click', () => {
    modal.remove();
  });
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  updateUserUI();
  
  // Add checkout button event listener
  const checkoutBtn = document.getElementById('cart-checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (!authToken) {
        showAuthModal();
        return;
      }
      showCheckoutModal();
    });
  }
  
  // Login button event listener
  const loginBtn = document.getElementById('nav-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      showAuthModal();
    });
  }
  
  // User dropdown functionality
  const userSection = document.getElementById('nav-user');
  const userDropdown = userSection?.querySelector('.user__dropdown');
  const logoutBtn = document.getElementById('logout-btn');
  
  if (userSection) {
    userSection.addEventListener('click', (e) => {
      e.stopPropagation();
      if (userDropdown) {
        userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
      }
    });
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      logout();
      if (userDropdown) userDropdown.style.display = 'none';
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    if (userDropdown) userDropdown.style.display = 'none';
  });
});