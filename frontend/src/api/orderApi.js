const API_BASE_URL = "http://localhost:3000"

export async function fetchOrders() {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw error;
  }
}

export async function fetchOrderById(orderId) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch order by ID:', error);
    throw error;
  }
}

export async function createOrder(orderData) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
}

export async function updateOrder(orderId, orderData) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to update order:', error);
    throw error;
  }
}
