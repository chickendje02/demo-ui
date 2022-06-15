import {combineReducers} from 'redux';
import ProductReducer from './product.slice';

export const RootReducer = combineReducers({
    product: ProductReducer
});
