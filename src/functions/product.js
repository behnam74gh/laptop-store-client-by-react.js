import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByCount = (count) =>
  axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const removeProduct = (slug, authtoken) =>
  axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: { authtoken },
  });

export const getProduct = (slug) =>
  axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = () =>
  axios.get(`${process.env.REACT_APP_API}/products/total`);

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getRelated = (productId) =>
  axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const fetchProductsByFilter = (arg) =>
  axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
