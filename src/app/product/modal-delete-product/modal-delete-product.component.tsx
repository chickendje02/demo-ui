import React from 'react';
import {ModalDeleteProductProps} from './modal-delete-product.props';
import {Button, Col, Modal, Row} from 'react-bootstrap';
import {useSelector} from 'react-redux';


const ModalDeleteProductComponent = (props: ModalDeleteProductProps) => {

  const {
    isShow,
    onHandleClose,
    onSubmit,
    selectedData,
  } = props;

  const {
    isDisabledAfterSubmitted,
  } = useSelector((state: any) => state.product);


  return (
    <Modal className={'add-language-modal'}
           show={isShow}
           onHide={onHandleClose}
           backdrop="static"
    >
      <Modal.Header closeButton>
        <div>Delete Product</div>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            Are you sure you want to delete product "<b>{selectedData?.name}</b>" ?
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
                onClick={() => onSubmit()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteProductComponent;
