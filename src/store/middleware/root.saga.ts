import {all} from 'redux-saga/effects';

import {ProductSaga} from './product.saga';

export function* RootSaga() {
    yield all([
        ProductSaga(),
    ]);
}
