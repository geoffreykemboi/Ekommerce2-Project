export const getPriceQueryParams = (searchParams, key, value) => {
  const hasValueInParam = searchParams.has(key);

  if (value && hasValueInParam) {
    searchParams.set(key, value);
  } else if (value) {
    searchParams.append(key, value);
  } else if (hasValueInParam) {
    searchParams.delete(key);
  }

  return searchParams;
};

export const calculateOrderCost = (cartItems) => {
  const itemsPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice > 20000 ? 0 : 500; // Free shipping over KSH 20,000, otherwise KSH 500
  const taxPrice = (0.16 * itemsPrice).toFixed(2); // 16% VAT (Kenya's standard VAT rate)
  const totalPrice = (itemsPrice + shippingPrice + parseFloat(taxPrice)).toFixed(2);

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

export const formatPrice = (price) => {
  if (price == null || isNaN(price)) return "KSH 0.00";
  // Add thousand separators for better readability
  return `KSH ${Number(price).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
