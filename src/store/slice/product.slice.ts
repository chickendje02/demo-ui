import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';


const initialState = {
  listProduct: [],
  loading: false,
  isCallAPISuccess: false,
  isDisabledAfterSubmitted:false,
  productDetails:{},
};

export const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    loadListProduct: (state, payloadAction: PayloadAction<any>) => {
      state.loading = true;
      state.isDisabledAfterSubmitted = true;
    },
    loadListProductSuccess: (state, payloadAction: PayloadAction<any>) => {
      state.listProduct = payloadAction.payload.data;
      state.loading = false;
      state.isDisabledAfterSubmitted = false;
    },
    loadListProductError: (state, payloadAction: PayloadAction<any>) => {
      state.loading = false;
      state.isDisabledAfterSubmitted = false;
      toast.error('Get product failed. Please contact admin!');
    },
    addProduct: (state, payloadAction: PayloadAction<any>) => {
      state.loading = true;
      state.isCallAPISuccess = false;
      state.isDisabledAfterSubmitted = true;
    },
    addProductSuccess: (state, payloadAction: PayloadAction<any>) => {
      state.loading = false;
      state.isCallAPISuccess = true;
      state.isDisabledAfterSubmitted = false;
      toast.success('Add product successfully');
    },
    addProductError: (state) => {
      state.loading = false;
      state.isCallAPISuccess = false;
      state.isDisabledAfterSubmitted = false;
      toast.error('Add product failed. Please contact admin!');
    },
    updateProduct: (state, payloadAction: PayloadAction<any>) => {
      state.loading = true;
      state.isCallAPISuccess = false;
      state.isDisabledAfterSubmitted = true;
    },
    updateProductSuccess: (state, payloadAction: PayloadAction<any>) => {
      state.loading = false;
      state.isCallAPISuccess = true;
      state.isDisabledAfterSubmitted = false;
      toast.success('Update product successfully');
    },
    updateProductError: (state) => {
      state.loading = false;
      state.isCallAPISuccess = false;
      state.isDisabledAfterSubmitted = false;
      toast.error('Update product failed. Please contact admin!');
    },
    deleteProduct: (state, payloadAction: PayloadAction<any>) => {
      state.loading = true;
      state.isCallAPISuccess = false;
      state.isDisabledAfterSubmitted = true;
    },
    deleteProductSuccess: (state, payloadAction: PayloadAction<any>) => {
      state.loading = false;
      state.isCallAPISuccess = true;
      state.isDisabledAfterSubmitted = false;
      toast.success('Delete product successfully');
    },
    deleteProductError: (state) => {
      state.loading = false;
      state.isCallAPISuccess = false;
      state.isDisabledAfterSubmitted = false;
      toast.error('Delete product failed. Please contact admin!');
    },

    getProductDetails: (state, payloadAction: PayloadAction<any>) => {
      state.loading = true;
    },
    getProductDetailsSuccess: (state, payloadAction: PayloadAction<any>) => {
      state.loading = false;
      state.productDetails = payloadAction.payload.data;
    },
    getProductDetailsError: (state) => {
      state.loading = false;
      toast.error('Get product details failed. Please contact admin!');
    },

    resetSlice: (state) => {
      state.loading = false;
      state.isCallAPISuccess = false;
    }
  }
});

export const {
  loadListProduct,
  loadListProductSuccess,
  loadListProductError,
  addProduct,
  addProductSuccess,
  addProductError,

  updateProduct,
  updateProductSuccess,
  updateProductError,

  deleteProduct,
  deleteProductSuccess,
  deleteProductError,

  getProductDetails,
  getProductDetailsSuccess,
  getProductDetailsError,

  resetSlice,
} = ProductSlice.actions;

export default ProductSlice.reducer;
