import React, {useEffect, useMemo, useState} from 'react';
import './product.scss';
import 'react-table/react-table.css';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col, FormControl, FormGroup, Row} from 'react-bootstrap';
import {MAX_LENGTH_SEARCH, STATUS} from '../../common/constants/CommonConst';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import ReactTable from 'react-table';
import TooltipCustom from '../shared/tooltip/Tooltip-Custom';
import {lowerCase,isEmpty} from 'lodash';
import {deleteProduct, getProductDetails, loadListProduct} from '../../store/slice/product.slice';
import ModalAddEditProductComponent from './modal-add-edit/modal-add-edit-product.component';
import ModalDeleteProductComponent from './modal-delete-product/modal-delete-product.component';


function ProductComponent() {

  const dispatch = useDispatch();

  const {
    listProduct,
    isCallAPISuccess,
    isDisabledAfterSubmitted,
    loading,
  } = useSelector((state: any) => state.product);

  const [isOpenModalAddEdit, setIsOpenModalAddEdit] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [listData, setListData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    onGetListProduct();
  }, []);

  useEffect(() => {
    setListData([...listProduct]);
  }, [listProduct]);


  useEffect(() => {
    if (isCallAPISuccess) {
      onHandleCloseModalAddEdit();
      onHandleCloseModalDelete();
      onGetListProduct();
    }
  }, [isCallAPISuccess]);


  const searchProduct = () => {
    if(isEmpty(searchValue)){
      onGetListProduct();
    }else{
      let tempList = [...listProduct];
      tempList = tempList.filter((product:any) => lowerCase(product?.name).includes(lowerCase(searchValue)));
      setListData([...tempList]);
    }
  };

  const onChangeSearchValue = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const onHandleKeyPress = (e:any) => {
    e.key == 'Enter' && searchProduct();
  };


  const onToggleModalAddEdit = (isOpen: boolean, isEditAction: boolean, rowInfo?: any) => {
    setIsOpenModalAddEdit(isOpen);
    setIsEdit(isEditAction);
    if (isEditAction) {
      dispatch(getProductDetails({
        id: rowInfo.id,
      }));
    }
  };

  const onOpenModalAdd = () => {
    onToggleModalAddEdit(true, false);
  };

  const onOpenModalDelete = (rowInfo: any) => {
    setIsOpenModalDelete(true);
    setSelectedProduct({...rowInfo});
  };

  const onGetListProduct = () => {
    dispatch(loadListProduct({}));
  };

  const onHandleCloseModalAddEdit = () => {
    setIsOpenModalAddEdit(false);
  };

  const onHandleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
    setSelectedProduct({});
  };

  const onHandleDelete = () => {
    dispatch(deleteProduct({id: selectedProduct?.id}));
  };

  const onRenderModalAddEditProduct = () => {
    return (
      isOpenModalAddEdit &&
      <ModalAddEditProductComponent
        isShow={isOpenModalAddEdit}
        onHandleClose={onHandleCloseModalAddEdit}
        isEdit={isEdit}
      />
    );
  };

  const onRenderModalDeleteProduct = () => {
    return (
      isOpenModalDelete &&
      <ModalDeleteProductComponent
        isShow={isOpenModalDelete}
        onHandleClose={onHandleCloseModalDelete}
        onSubmit={onHandleDelete}
        selectedData={selectedProduct}
      />
    );
  };


  const renderFilterSearch = (): JSX.Element => {
    return (
      <Row className="filter mt-3 ml-3 mr-3">
        <Col xs={'auto'}>
          <div className="search w-col">
            <div className="font-weight-600">Search</div>
            <div>
              <FormGroup className="mb-0">
                <FormControl
                  onChange={onChangeSearchValue}
                  value={searchValue}
                  maxLength={MAX_LENGTH_SEARCH}
                  onKeyPress={onHandleKeyPress}
                  className={'search-text-field'}
                  placeholder={'Enter search text'}
                />
              </FormGroup>
            </div>
          </div>
        </Col>
        <div className="search">
          <div/>
          <div>
            <Button
              onClick={searchProduct}>
              Search
            </Button>
          </div>
        </div>
      </Row>
    );
  };

  const renderList = useMemo(() => {
    const columns: any[] = [
      {
        Header: <span className={'font-weight-600'}>ID</span>,
        id: 'id',
        className: 'id',
        filterable: false,
        resizable: false,
        width: 100,
        Cell: (row: any) => (
          <div className={'british'}>
            <TooltipCustom>
                <span className="font-weight-normal">
                    {row?.original?.id}
                </span>
            </TooltipCustom>
          </div>
        )
      },
      {
        Header: <span className={'font-weight-600'}>Name</span>,
        id: 'name',
        className: 'name',
        filterable: false,
        resizable: false,
        Cell: (row: any) => (
          <div className={'british'}>
            <TooltipCustom>
              <span className="font-weight-normal">
                  {row?.original?.name}
              </span>
            </TooltipCustom>
          </div>
        )
      },
      {
        Header: <span className={'font-weight-600'}>Price</span>,
        id: 'price',
        className: 'price',
        filterable: false,
        resizable: false,
        Cell: (row: any) => (
          <div className={'british'}>
            <TooltipCustom>
                <span className="font-weight-normal">
                    {row?.original?.price}
                </span>
            </TooltipCustom>
          </div>
        )
      },
      {
        Header: <span className={'font-weight-600'}>Status</span>,
        id: 'status',
        className: 'status',
        filterable: false,
        resizable: false,
        Cell: (row: any) => (
          <div className={'british'}>
            <TooltipCustom>
                <span className="font-weight-normal">
                    {row?.original?.status ? STATUS.ACTIVE : STATUS.INACTIVE}
                </span>
            </TooltipCustom>
          </div>
        )
      },
      {
        Header: <span className={'font-weight-600'}>Action</span>,
        id: 'Action',
        className: 'Action',
        filterable: false,
        resizable: false,
        Cell: (row: any) => (
          <div>
            <Button className="btn-multi-replace mr-3"
                    onClick={(e) => onToggleModalAddEdit(true, true, row?.original)}>
              Edit
            </Button>
            <Button className="btn-multi-replace"
                    onClick={(e) => onOpenModalDelete(row?.original)}>
              Delete
            </Button>
          </div>
        )
      },
    ];
    return (
      <div className={`mr-3 ml-3 mt-3`}>
        <div>
          <Button className="btn-multi-replace"
                  onClick={onOpenModalAdd}>
            <FontAwesomeIcon className="mr-2" icon={faPlusSquare} size="sm"/> Add Product
          </Button>
        </div>
        <div className="table-results">
          <ReactTable
            data={listData}
            columns={columns}
            minRows={0}
            className="-striped -highlight"
            NoDataComponent={() => <div className={`text-center mt-1`}>No records found.</div>}
            getTdProps={() => {
              return {
                style: {
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alighItems: 'center'
                }
              };
            }}
          />
        </div>
      </div>
    );
  }, [listData]);

  return (
    <div className="product">
      {renderFilterSearch()}
      {renderList}
      {onRenderModalAddEditProduct()}
      {onRenderModalDeleteProduct()}
    </div>
  );
}

export default ProductComponent;
