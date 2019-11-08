import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  ButtonGroup,
  Form,
  FormGroup,
  Input
} from 'reactstrap'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import DatePicker from 'react-datepicker'

import Loader from 'components/loader'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as UserActions from './actions'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    user_list: state.user.user_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    UserActions: bindActionCreators(UserActions, dispatch)
  })
}

class User extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }

    this.initializeData = this.initializeData.bind(this)
    this.onRowSelect = this.onRowSelect.bind(this)
    this.onSelectAll = this.onSelectAll.bind(this)
    this.goToDetail = this.goToDetail.bind(this)

    this.options = {
      onRowClick: this.goToDetail
    }

    this.selectRowProp = {
      mode: 'checkbox',
      bgColor: 'rgba(0,0,0, 0.05)',
      clickToSelect: false,
      onSelect: this.onRowSelect,
      onSelectAll: this.onSelectAll
    }

  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.props.UserActions.getUserList()
  }

  goToDetail(row) {
    this.props.history.push('/admin/master/user/detail')
  }

  onRowSelect (row, isSelected, e) {
    console.log('one row checked ++++++++', row)
  }
  onSelectAll (isSelected, rows) {
    console.log('current page all row checked ++++++++', rows)
  }

  render() {

    const { loading } = this.state
    const { user_list } = this.props
    const containerStyle = {
      zIndex: 1999
    }

    return (
      <div className="user-screen">
        <div className="animated fadeIn">
          <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
          <Card>
            <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="nav-icon fas fa-users" />
                    <span className="ml-2">Users</span>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                :
                  <Row>
                    <Col lg={12}>
                      <div className="mb-2">
                        <ButtonGroup size="sm">
                          <Button
                            color="success"
                            className="btn-square"
                          >
                            <i className="fa glyphicon glyphicon-export fa-download mr-1" />
                            Export to CSV
                          </Button>
                          <Button
                            color="info"
                            className="btn-square"
                          >
                            <i className="fa glyphicon glyphicon-export fa-upload mr-1" />
                            Import from CSV
                          </Button>
                          <Button
                            color="primary"
                            className="btn-square"
                            onClick={() => this.props.history.push(`/admin/master/user/create`)}
                          >
                            <i className="fas fa-plus mr-1" />
                            New User
                          </Button>
                          <Button
                            color="warning"
                            className="btn-square"
                          >
                            <i className="fa glyphicon glyphicon-trash fa-trash mr-1" />
                            Bulk Delete
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div className="filter-panel my-3 py-3">
                        <Form inline>
                          <FormGroup className="pr-3">
                            <Input type="text" placeholder="User Name" />
                          </FormGroup>
                          <FormGroup className="pr-3">
                            <DatePicker
                              className="form-control"
                              placeholderText="DOB"
                            />
                          </FormGroup>
                          <FormGroup className="pr-3">
                            <Select
                              className="select-min-width"
                              options={[]}
                              placeholder="Role Name"
                            />
                          </FormGroup>
                          <FormGroup className="pr-3">
                            <Input type="text" placeholder="Active" />
                          </FormGroup>
                          <FormGroup className="pr-3">
                            <Input type="text" placeholder="Company" />
                          </FormGroup>
                          
                          <Button
                            type="submit"
                            color="primary"
                            className="btn-square"
                          >
                            <i className="fas fa-search mr-1"></i>Filter
                          </Button>
                        </Form>
                      </div>
                      <div>
                        <BootstrapTable
                          selectRow={ this.selectRowProp }
                          search={true}
                          options={ this.options }
                          data={user_list}
                          version="4"
                          hover
                          pagination
                          totalSize={user_list ? user_list.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="transactionCategoryName"
                          >
                            User Name
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryCode"
                          >
                            DOB
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="parentTransactionCategory"
                          >
                            Role Name
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryCode"
                          >
                            Active
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryCode"
                          >
                            Company
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </Col>
                  </Row>
              }
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
