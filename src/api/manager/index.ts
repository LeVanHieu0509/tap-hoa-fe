import {
  AddNewCartsInput,
  AddNewCartsOutput,
  AddToCartsInput,
  AddToCartsOutput,
  CheckoutIdInput,
  CheckoutReviewOutput,
  CreateAndUpdateProductsInput,
  CreateProductsOutput,
  DeleteCartsInput,
  GetAllCartOutput,
  GetAllListInput,
  GetBillInput,
  GetBillOutput,
  GetBillsOutput,
  GetCartsOutput,
  GetDetailCartsInput,
  GetProductInput,
  GetProductOutput,
  GetProductsOutput,
  ResponseFormat,
  UpdateCartsInput,
} from "@custom-types/manager";
import request from "api";
import { CancelToken } from "axios";

// ---Product---//
export const getProduct = (cancelToken: CancelToken, body: GetProductInput) => {
  return request.post<ResponseFormat<GetProductOutput>>("/products/get-product", body, { cancelToken });
};

export const getProducts = (cancelToken: CancelToken, body: GetAllListInput) => {
  return request.post<ResponseFormat<GetProductsOutput>>("/products/get-products", body, { cancelToken });
};

export const createProduct = (cancelToken: CancelToken, body: CreateAndUpdateProductsInput) => {
  return request.post<ResponseFormat<CreateProductsOutput>>("/products/create-product", body, { cancelToken });
};

export const updateProduct = (cancelToken: CancelToken, body: CreateAndUpdateProductsInput) => {
  return request.post<ResponseFormat<any>>("/products/update-product", body, { cancelToken });
};

// ---Cart---//
export const addNewCarts = (cancelToken: CancelToken, body: AddNewCartsInput) => {
  return request.post<ResponseFormat<AddNewCartsOutput>>("/carts/add-new-carts", body, { cancelToken });
};

export const addToCarts = (cancelToken: CancelToken, body: AddToCartsInput) => {
  return request.post<ResponseFormat<AddToCartsOutput>>("/carts/add-to-carts", body, { cancelToken });
};

export const updateCarts = (cancelToken: CancelToken, body: UpdateCartsInput) => {
  return request.post<ResponseFormat<any>>("/carts/update-carts", body, { cancelToken });
};

export const getDetailCart = (cancelToken: CancelToken, body: GetDetailCartsInput) => {
  return request.post<ResponseFormat<GetCartsOutput>>("/carts/get-detail-carts", body, { cancelToken });
};

export const getAllCarts = (cancelToken: CancelToken, body: GetAllListInput) => {
  return request.post<ResponseFormat<GetAllCartOutput>>("/carts/get-all-carts", body, { cancelToken });
};

export const deleteCarts = (cancelToken: CancelToken, body: DeleteCartsInput) => {
  return request.post<ResponseFormat<any>>("/carts/delete-carts", body, { cancelToken });
};

// ---Checkout---//
export const checkoutConfirm = (cancelToken: CancelToken, body: CheckoutIdInput) => {
  return request.post<ResponseFormat<any>>("/checkout/confirm", body, { cancelToken });
};

export const checkoutReview = (cancelToken: CancelToken, body: CheckoutIdInput) => {
  return request.post<ResponseFormat<CheckoutReviewOutput>>("/checkout/review", body, { cancelToken });
};

export const checkoutDelete = (cancelToken: CancelToken, body: CheckoutIdInput) => {
  return request.post<ResponseFormat<any>>("/checkout/delete", body, { cancelToken });
};

// --- Bill ---
export const getBill = (cancelToken: CancelToken, body: GetBillInput) => {
  return request.post<ResponseFormat<GetBillOutput>>("/bills/get-bill", body, { cancelToken });
};

export const getBills = (cancelToken: CancelToken, body: GetAllListInput) => {
  return request.post<ResponseFormat<GetBillsOutput>>("/bills/get-bills", body, { cancelToken });
};
