import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  Collapse
} from "reactstrap";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import _ from "lodash";
import "react-toastify/dist/ReactToastify.css";
import Autosuggest from 'react-autosuggest';

class CreateOrEditProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      suggestions: [],
      projectList: [],
      vatCategoryList: [],
      transactionData: {},
      collapse: true,
      loading: false,
      large: false
    };
    this.toggleLarge = this.toggleLarge.bind(this);
  }

  toggleLarge() {
    this.setState({
      large: !this.state.large
    });
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      :this.state.projectList.filter(
          lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  getSuggestionValue = suggestion => suggestion.name;
  renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  handleChange = (e, name) => {
    this.setState({
      transactionData: _.set(
        { ...this.state.transactionData },
        e.target.name && e.target.name !== "" ? e.target.name : name,
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      )
    });
  };

 

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange
    };
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>New Project</CardHeader>
          <div className="create-bank-wrapper">
            <Row>
              <Col xs="12">
                <Form
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <Card>
                    <CardHeader>Project Details</CardHeader>
                    <CardBody>
                      <Row className="row-wrapper">
                        <Col md="4">
                          <FormGroup>
                            <Label htmlFor="text-input">Project Name</Label>
                            <Input
                              type="text"
                              id="text-input"
                              name="text-input"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label htmlFor="select">Contact</Label>
                            <Autosuggest
                              suggestions={suggestions}
                              onSuggestionsFetchRequested={
                                this.onSuggestionsFetchRequested
                              }
                              onSuggestionsClearRequested={
                                this.onSuggestionsClearRequested
                              }
                              getSuggestionValue={this.getSuggestionValue}
                              renderSuggestion={this.renderSuggestion}
                              inputProps={inputProps}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Button
                            size="sm"
                            color="primary"
                            onClick={this.toggleLarge}
                            className="mr-1 add-btn"
                          >
                            <i className="fas fa-plus"></i> Add
                          </Button>
                        </Col>
                      </Row>
                      <Modal
                        isOpen={this.state.large}
                        toggle={this.toggleLarge}
                        className={"modal-lg " + this.props.className}
                      >
                        <ModalHeader toggle={this.toggleLarge}>
                          New Contact
                        </ModalHeader>
                        <ModalBody>
                          <Row className="row-wrapper">
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">Title</Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="row-wrapper">
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">First Name</Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">
                                  Middle Number
                                </Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">Last Name</Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="row-wrapper">
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">Email</Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">Address1</Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">Address2</Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="row-wrapper">
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">State Region</Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">City</Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">Country</Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="row-wrapper">
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">
                                  Currency Code
                                </Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label htmlFor="text-input">
                                  Billing Email
                                </Label>
                                <Input
                                  type="text"
                                  id="text-input"
                                  name="text-input"
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.toggleLarge}>
                            Save
                          </Button>{" "}
                          <Button color="secondary" onClick={this.toggleLarge}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </CardBody>
                  </Card>
                
                  <Card>
                    <CardHeader>
                    Project Details
                      <div className="card-header-actions">
                        <Button
                          color="link"
                          className="card-header-action btn-minimize"
                          data-target="#collapseExample"
                          onClick={this.toggle}
                        >
                          <i className="icon-arrow-up"></i>
                        </Button>
                      </div>
                    </CardHeader>
                    <Collapse isOpen={this.state.collapse} id="collapseExample">
                      <CardBody>
                        <Row className="row-wrapper">
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="text-input">Contract PO Number</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="text-input">Vat Registration Number</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="text-input">Currency</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="row-wrapper">
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="text-input">Expense Budget</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="text-input">Revenue Budget</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="text-input">Invoice Language</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Row className="bank-btn-wrapper">
                    <FormGroup>
                      <Button type="submit" className="submit-invoice" size="sm" color="primary">
                        <i className="fa fa-dot-circle-o "></i> Submit
                      </Button>
                      <Button type="submit" size="sm" color="primary">
                        <i className="fa fa-dot-circle-o"></i> Submit
                      </Button>
                    </FormGroup>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

export default CreateOrEditProject;
