import {all, call, put, takeEvery} from 'redux-saga/effects';
import {
  addProduct,
  addProductError,
  addProductSuccess,
  deleteProduct,
  deleteProductError,
  deleteProductSuccess, getProductDetails, getProductDetailsError, getProductDetailsSuccess,
  loadListProduct,
  loadListProductError,
  loadListProductSuccess,
  updateProduct,
  updateProductError,
  updateProductSuccess
} from '../slice/product.slice';
import {addProductService, deleteProductService, getListProductService, getProductDetailService, updateProductService} from '../../services/product.service';


// Get List Product
function* loadListProductAsync(param: any): IterableIterator<any> {
  try {
    const data = yield call(getListProductService, param.payload);
    yield put(loadListProductSuccess(data));
  } catch (err) {
    yield put(loadListProductError(err));
  }
}

export function* watchLoadingListProduct() {
  yield takeEvery(loadListProduct, loadListProductAsync);
}

// Add Product
function* addProductAsync(param: any): IterableIterator<any> {
  try {
    const data = yield call(addProductService, param.payload);
    yield put(addProductSuccess(data));
  } catch (err) {
    yield put(addProductError());
  }
}

export function* watchAddProduct() {
  yield takeEvery(addProduct, addProductAsync);
}

//Update Product
function* updateProductAsync(param: any): IterableIterator<any> {
  try {
    const data = yield call(updateProductService, param.payload);
    yield put(updateProductSuccess(data));
  } catch (err) {
    yield put(updateProductError());
  }
}

export function* watchUpdateProduct() {
  yield takeEvery(updateProduct, updateProductAsync);
}

//Delete Product
function* deleteProductAsync(param: any): IterableIterator<any> {
  try {
    const data = yield call(deleteProductService, param.payload);
    yield put(deleteProductSuccess(data));
  } catch (err) {
    yield put(deleteProductError());
  }
}

export function* watchDeleteProduct() {
  yield takeEvery(deleteProduct, deleteProductAsync);
}

//Get Product details
function* getProductDetailsAsync(param: any): IterableIterator<any> {
  try {
    const data = yield call(getProductDetailService, param.payload);
    yield put(getProductDetailsSuccess(data));
  } catch (err) {
    yield put(getProductDetailsError());
  }
}

export function* watchGetProductDetail() {
  yield takeEvery(getProductDetails, getProductDetailsAsync);
}


export function* ProductSaga() {
  yield all([
    watchLoadingListProduct(),
    watchAddProduct(),
    watchUpdateProduct(),
    watchDeleteProduct(),
    watchGetProductDetail(),
  ]);
}
