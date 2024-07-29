import http  from '../utils/http';

    export const getAllProduct = () => {
        return http.get(`/product`);
    }
    export const getProduct = (productId) => {
        return http.get(`/product/${productId}`);
    }
    export const getProductByCategory  = (categoryId) => {
        return http.get(`/category/${categoryId}`);
    }
    export const createProduct  = (productData) => {
        return http.post('/product', productData);
    }
    export const updateProduct = (productId, productData) => {
        return http.put(`/products/${productId}`, productData);
    };
    export const deleteProduct = (productId) => {
        return http.delete(`/products/${productId}`);
    };
    export const getImages = (productId) => {
        return http.get(`/products/${productId}/images`);
    }
    export const createImage = (productId, imageData) => {
        return http.post(`/products/${productId}/images`, imageData);
    }