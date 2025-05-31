import React from "react";

const CheckoutNew = () => {
  const { cart, clearCart } = useCart();

  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Checkout Page</h1>
      <p className="text-lg">This is the new checkout page.</p>
    </div>
  );
}