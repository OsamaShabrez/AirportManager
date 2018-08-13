import React from "react";
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap';

export default class AddEditAirlineModal extends React.Component {
  static propTypes = {
    airline: PropTypes.object.isRequired,
    callbackMethod: PropTypes.func.isRequired,
    countries_list: PropTypes.array.isRequired,
    requestType: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.state = {
      country_id: "",
      id: 0,
      name: "",

      showModal: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.airline.id > 0 && this.props.requestType !== "POST") {
      this.setState({
        country_id: this.props.airline.country_id,
        id: this.props.airline.id,
        name: this.props.airline.name,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.showModal === false && this.state.showModal === true) {
      const id = this.props.airline.id;
      if (id > 0) {
        this.refs["ref-name-edit-" + id].value = this.props.airline.name;
        this.refs["ref-country-edit-" + id].value = this.props.airline.country_id;
      }
    }
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleModalSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const airline = {
      country_id: data.get("country_id"),
      id: this.state.id,
      name: data.get("name"),
    }
    this.props.callbackMethod(airline);
    this.setState({
      showModal: false
    });
  }

  render() {
    const { id, name, showModal } = this.state;
    const { countries_list, requestType } = this.props;

    const isEdit = requestType !== "POST" ? true : false;
    const toggleModal = this.toggleModal;

    return (
      <Modal isOpen={showModal} toggle={toggleModal} className={isEdit ? "EditAirlineModal-" + id : "AddAirlineModal" }>
        <Form onSubmit={this.handleModalSubmit}>
          <ModalHeader toggle={toggleModal}>{isEdit? "Edit: " + name : "Add New Airline"}</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" ref={id > 0? "ref-name-edit-"+id : "ref-name-add"} required={true} />
              <small className="form-text text-muted">Enter name of the airline</small>
            </div>
            <div className="form-group">
              <label htmlFor="country_id">Country</label>
              <select className="form-control" name="country_id" ref={id > 0? "ref-country-edit-"+id : "ref-country-add"} required={true}>
                {
                  countries_list.map(function(country, index, countries) {
                    return (
                      <option key={index} value={country.id}>{country.name}</option>
                    )
                  }, this)
                }
              </select>
              <small className="form-text text-muted">Select country from drop-down</small>
            </div>
          </ModalBody>
          <ModalFooter>
            <Input type="submit" color="primary" />
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}
