const generateOrderLinks = (orderId, customerId, status) => {
  const baseLinks = {
    self: { href: `/api/v2/orders/${orderId}`, method: "GET" },
    customer: { href: `/api/v2/users/${customerId}`, method: "GET" },
  };

  const statusLinks = {
    pending: {
      cancel: {
        href: `/api/v2/orders/${orderId}/cancellation`,
        method: "POST",
      },
    },
    cancelled: {},
  };

  return {
    ...baseLinks,
    ...(statusLinks[status] || {}),
  };
};

module.exports = { generateOrderLinks };
