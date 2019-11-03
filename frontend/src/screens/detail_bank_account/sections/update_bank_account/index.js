import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import Select from 'react-select'

import './style.scss'

class UpdateBankAccount extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {

    return (
      <div className="update-bank-account-section">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="fas fa-university" />
                    <span className="ml-2">Update Bank Account</span>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg={12}>
                  <Form>
                    <Row>
                      <Col lg={4}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="account_name">Account Name</Label>
                          <Input
                            type="text"
                            id="account_name"
                            name="account_name"
                            placeholder="Enter Account Name"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={4}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="currency">Currency</Label>
                          <Select
                            id="currency"
                            name="currency"
                            options={[]}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={4}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="opening_balance">Opening Balance</Label>
                          <Input
                            type="text"
                            id="opening_balance"
                            name="opening_balance"
                            placeholder="Your Opening Balance"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <FormGroup className="">
                          <Label htmlFor="account_type">
                            Account Type
                          </Label>
                          <Select
                            id="account_type"
                            name="account_type"
                            options={[]}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col lg={4}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="bank_name">Bank Name</Label>
                          <Input
                            type="text"
                            id="bank_name"
                            name="bank_name"
                            placeholder="Enter Bank Name"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={4}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="account_number">Account Number</Label>
                          <Input
                            type="text"
                            id="account_number"
                            name="account_number"
                            placeholder="Enter Account Number"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={4}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="account_number">Account Number</Label>
                          <Input
                            type="text"
                            id="account_number"
                            name="account_number"
                            placeholder="Enter Account Number"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="IBAN_number">IBAN Number</Label>
                          <Input
                            type="text"
                            id="IBAN_number"
                            name="IBAN_number"
                            placeholder="Enter IBAN Number"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={4}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="swift_code">Swift Code</Label>
                          <Input
                            type="text"
                            id="swift_code"
                            name="swift_code"
                            placeholder="Enter Swift Code"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={4}>
                        <FormGroup className="mb-5">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Enter Country"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    <FormGroup className="text-right">
                      <Button type="submit" color="primary" className="btn-square mr-3">
                        <i className="fa fa-dot-circle-o"></i> Update
                      </Button>
                      <Button color="secondary" className="btn-square" 
                        onClick={() => {this.props.history.push("/admin/bank-account")}}>
                        <i className="fa fa-ban"></i> Cancel
                      </Button>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default UpdateBankAccount


