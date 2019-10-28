import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card, CardHeader, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import Loader from "components/loader"
import moment from 'moment'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './style.scss'

import * as TransactionActions from './actions'


const mapStateToProps = (state) => {
  return ({
    transaction_list: state.transaction.transaction_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    transactionActions: bindActionCreators(TransactionActions, dispatch)
  })
}

class TransactionCategory extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      transactionCategoryList: [],
      openDeleteModal: false,
      loading: true
    }

    // DataTable Optioins
    this.options = {
      hidePageListOnlyOnePage: true,
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: this.props.transaction_list.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      hideSizePerPage: true,
      // alwaysShowAllBtns: true,
      withFirstAndLast: false,
      searchField: this.customSearchField,
      paginationShowsTotal: this.customTotal,
    }

    this.deleteTransaction = this.deleteTransaction.bind(this)
    this.customSearchField = this.customSearchField.bind(this)
    this.success = this.success.bind(this)
    this.customTotal = this.customTotal.bind(this)
    this.getTransactionType = this.getTransactionType.bind(this)
    this.getparentTransactionCategory = this.getparentTransactionCategory.bind(this)
    this.actions = this.actions.bind(this)
  }

  // Table Custom Search Field
  customSearchField(props) {
    return (
      <SearchField
        defaultValue=''
        placeholder='Search ...'/>
    )
  }

  // Table Custom Pagination Label
  customTotal(from, to, size) {
    return (
      <span className="react-bootstrap-table-pagination-total">
        Showing {from} to {to} of {size} Results
      </span >
    )
  }

  // -------------------------
  // Data Table Custom Fields
  //--------------------------

  getTransactionType(cell, row) { 
    return(row.transactionType.transactionTypeName)
  }

  getparentTransactionCategory(cell, row) {
    return(row.parentTransactionCategory.transactionCategoryDescription)
  }

  actions(cell, row) {
    return (
      <div className="table-action text-right">
        <Button
          color="primary"
          className="btn-pill actions ml-1"
          title="Edit Transaction Category"
          onClick={() =>
            this.props.history.push(`/admin/settings/transaction-category/update?id=${row.transactionCategoryId}`)
          }
        >
          <i className="far fa-edit"></i>
        </Button>
        <Button
          color="primary"
          className="btn-pill actions ml-1"
          title="Delete Transaction Ctegory"
          onClick={() =>
            this.setState({ selectedData: row }, () =>
              this.setState({ openDeleteModal: true })
            )
          }
        >
          <i className="fas fa-trash-alt"></i>
        </Button>
      </div>
    )
  }

  // Show Success Toast
  success() {
    return toast.success('Transaction Category Deleted Successfully...', {
      position: toast.POSITION.TOP_RIGHT
    })
  }


  componentDidMount() {
    this.getTransactionListData()
  }

  // Get All Transaction Categories
  getTransactionListData() {
    this.setState({ loading: true })
    this.props.transactionActions.getTransactionList().then(res => {
      if (res.status === 200) {
        this.setState({ loading: false })
      }
    })
  }

  // Delete Transaction By ID
  deleteTransaction() {
    this.setState({ loading: true })
    this.setState({ openDeleteModal: false })
    this.props.transactionActions.deleteTransaction(this.state.selectedData.id).then(res => {
      if (res.status === 200) {
        this.setState({ loading: false })
        this.getTransactionListData()
      }
    })
  }

  // Cloase Confirm Modal
  closeModal() {
    this.setState({ openDeleteModal: false })
  }

  render() {
    const { loading } = this.state;
    const transactionList = this.props.transaction_list
    const containerStyle = {
      zIndex: 1999
    };

    return (
      <div className="transaction-category-screen">
        <div className="animated">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            style={containerStyle}
          />
          <Card>
            <CardHeader>
              <i className="icon-menu" />
              Transaction Category
            </CardHeader>
            <CardBody>
              <Button
                color="primary"
                className="mb-3 btn-square"
                onClick={() => this.props.history.push('/admin/settings/transaction-category/update' )}
              >
                New
              </Button>
            {
              loading ?
                <Loader></Loader>: 
                <BootstrapTable 
                  data={transactionList} 
                  striped
                  hover
                  pagination
                >
                  <TableHeaderColumn isKey dataField="transactionCategoryCode">
                    Category Code
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="transactionCategoryName">
                    Category Name
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="transactionCategoryDescription">
                    Category Description
                  </TableHeaderColumn>
                  <TableHeaderColumn dataFormat={this.getparentTransactionCategory}>
                    Parent Transaction Category Name
                  </TableHeaderColumn>
                  <TableHeaderColumn dataFormat={this.getTransactionType}>
                    Transaction Type
                  </TableHeaderColumn>
                  <TableHeaderColumn className="text-right" dataFormat={this.actions}>
                    Action
                  </TableHeaderColumn>
                </BootstrapTable>
            }
            </CardBody>
          </Card>
          <Modal isOpen={this.state.openDeleteModal}
            className={"modal-danger " + this.props.className}
          >
            <ModalHeader toggle={this.toggleDanger}>Delete</ModalHeader>
            <ModalBody>Are you sure want to delete this record?</ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.deleteTransaction}>Yes</Button>&nbsp;
              <Button color="secondary"onClick={this.closeModal}>No</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionCategory)
