export const getProductsList = async () => {
  return await fetch("/api/getProducts", {
    method: "POST",
  });
};

export const getCustomersList = async () => {
  return await fetch("/api/getCustomers", {
    method: "POST",
  });
};

export const getNumberCustomersNSales = async () => {
  return await fetch("/api/getCustomersNSales", {
    method: "POST",
  });
};

export const getStatsList = async () => {
  return await fetch("/api/getStatistic", {
    method: "POST",
  });
};

export const updateProductFunction = async (data: {
  id: number;
  icon: boolean;
  name: string;
  price: number;
  description: string;
  productType: string;
}) => {
  return await fetch("/api/updateProduct", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const updatePasswordFunction = async (data: {
  newpassword: string;
  confirm: string;
  id: string | null | undefined;
}) => {
  return await fetch("/api/changePass", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
