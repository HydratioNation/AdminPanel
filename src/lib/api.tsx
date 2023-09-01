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

export const blockDaysFunction = async (data: { date: string; time: string; number: number }[]) => {
  return await fetch("/api/blockDays", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const getLockedDates = async (date: string) => {
  return await fetch("/api/getDates", {
    method: "POST",
    body: JSON.stringify(date),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const deleteProductFunction = async (id: number) => {
  return await fetch("/api/deleteProduct", {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const createNewProductFunction = async (data: {
  id: number;
  icon: boolean;
  name: string;
  price: number;
  description: string;
  productType: string;
}) => {
  return await fetch("/api/createNewProduct", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
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
