import {PATH} from '../common/constants/ApiPath';
import axios from 'axios';
import {STATUS} from '../common/constants/CommonConst';

export const getListProductService = (param: any) => {
    const response = axios.get(PATH.PRODUCT, {});
    return response;
};

export const getProductDetailService = (param:any) => {
    const id = param?.id;
    const response = axios.get(`${PATH.PRODUCT}/${id}`, {});
    return response;
}

export const addProductService = (param:any) =>{
    const newParam = {
        ...param,
        status: param?.status == STATUS.ACTIVE,
    }
    const response = axios.post(PATH.PRODUCT,newParam);
    return response;
}

export const updateProductService = (param:any) =>{
    const id = param?.id;
    const newParam = {
        ...param,
        status: param?.status == STATUS.ACTIVE,
    }
    const response = axios.put(`${PATH.PRODUCT}/${id}`,newParam);
    return response;
}

export const deleteProductService = (param:any) =>{
    const id = param?.id;
    const response = axios.delete(`${PATH.PRODUCT}/${id}`);
    return response;
}
