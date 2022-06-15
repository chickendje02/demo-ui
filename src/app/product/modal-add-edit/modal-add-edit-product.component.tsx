import React, {useEffect, useState} from 'react';
import {ModalAddEditProductProps} from './modal-add-edit-product.props';
import {Button, Col, FormGroup, Modal, Row} from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import {STATUS} from '../../../common/constants/CommonConst';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, resetSlice, updateProduct} from '../../../store/slice/product.slice';

interface dataSubmit{
  name:string,
  price:number,
  status:string,
}

const initialDataSubmit ={
  name:'',
  price:0,
  status:STATUS.ACTIVE
}

const ModalAddEditProductComponent = (props: ModalAddEditProductProps) => {

  const dispatch = useDispatch();

  const {
    isShow,
    onHandleClose,
    isEdit,
  } = props;

  const {
    isDisabledAfterSubmitted,
    productDetails,
  } = useSelector((state: any) => state.product);

  const [dataSubmit, setDataSubmit] = useState<dataSubmit>(initialDataSubmit);

  useEffect(() => {
    return () =>{
      dispatch(resetSlice());
    }
  },[])

  useEffect(()=>{
    if(isEdit){
      const data = {
        ...productDetails,
        status: productDetails.status ? STATUS.ACTIVE : STATUS.INACTIVE,
      }
      setDataSubmit({...data})
    }
  },[productDetails])

  const onSubmit = () => {
    if (isEdit) {
      dispatch(updateProduct({...dataSubmit}));
    } else {
      dispatch(addProduct({...dataSubmit}));
    }
  };

  const onHandleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });

  };

  const onChangeRadio = (e: any) => {
    const value = e.target.value;
    setDataSubmit({
      ...dataSubmit,
      status: value,
    });
  };


  return (
    <Modal className={'add-language-modal'}
           show={isShow}
           onHide={onHandleClose}
           backdrop="static"
    >
      <Modal.Header closeButton>
        <div>{isEdit ? `Edit` : `Add`} New Product</div>
      </Modal.Header>
      <Modal.Body>
        { isEdit &&
          <>
            <Row>
              <Col><b>ID</b><font color="red" className="require-field">*</font></Col>
            </Row>
            <Row className={'language-name mt-2 mb-3'}>
              <Col className={'pb-1'}>
                <FormGroup className={'mt-0 mb-0'}>
                  <span><b>{dataSubmit?.id}</b></span>
                </FormGroup>
                {/*{errors.languageName && touched.languageName &&*/}
                {/*<div className="existed-err mt-2">*/}
                {/*  <span>{values['languageName']} {errors.languageName}</span>*/}
                {/*</div>*/}
                {/*}*/}
              </Col>
            </Row>
          </>
        }
        <Row>
          <Col><b>Product name</b><font color="red" className="require-field">*</font></Col>
        </Row>
        <Row className={'language-name mt-2 mb-3'}>
          <Col className={'pb-1'}>
            <FormGroup className={'mt-0 mb-0'}>
              <input type={'text'}
                     name="name"
                     className={`form-control`}
                     placeholder={'Enter Product Name'}
                     value={dataSubmit?.name || ''}
                     maxLength={20}
                     onChange={onHandleChange}/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col><b>Product Price</b><font color="red" className="require-field">*</font></Col>
        </Row>
        <Row className={'language-name mt-2 mb-3'}>
          <Col className={'pb-1'}>
            <FormGroup className={'mt-0 mb-0'}>
              <NumberFormat
                className={`form-control`}
                value={dataSubmit?.price}
                allowLeadingZeros={false}
                allowNegative={false}
                thousandSeparator={true}
                placeholder={`Enter Product Price`}
                onValueChange={(values) => {
                  const {formattedValue, value} = values;
                  setDataSubmit({
                    ...dataSubmit,
                    price: parseInt(value),
                  });
                }}
                // prefix={'$'}
              />
            </FormGroup>
            {/*{errors.languageName && touched.languageName &&*/}
            {/*<div className="existed-err mt-2">*/}
            {/*  <span>{values['languageName']} {errors.languageName}</span>*/}
            {/*</div>*/}
            {/*}*/}
          </Col>
        </Row>
        <Row>
          <Col><b>Product Status</b><font color="red" className="require-field">*</font></Col>
        </Row>
        <Row className={'language-name mt-2 mb-3'}>
          <Col className={'pb-1'}>
            <FormGroup className={'mt-0 mb-0'}>
              <input type="radio"
                     id="status-active"
                     name="contentType"
                     value={STATUS.ACTIVE}
                     checked={dataSubmit?.status == STATUS.ACTIVE}
                     onChange={e => onChangeRadio(e)}
                     className="mr-1 ml-2"/>
              <label htmlFor="status-active">Active</label>
              <input type="radio"
                     id="status-inactive"
                     name="contentType"
                     value={STATUS.INACTIVE}
                     checked={dataSubmit?.status == STATUS.INACTIVE}
                     onChange={e => onChangeRadio(e)}
                     className="mr-1 ml-2"/>
              <label htmlFor="status-inactive">Inactive</label>
            </FormGroup>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-transparent font-weight-600 text-capitalize" variant="secondary"
                disabled={isDisabledAfterSubmitted}
                onClick={() => onHandleClose()}>
          CANCEL
        </Button>
        <Button className="btn-transparent font-weight-600 text-capitalize" variant="primary" type="submit"
                disabled={isDisabledAfterSubmitted}
                onClick={onSubmit}>
          SAVE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEditProductComponent;
