import React from "react";
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap';

import GMapsContainer from "../GoogleMaps/GMapsContainer";

export default class AddEditAirportModal extends React.Component {
  static propTypes = {
    airport: PropTypes.object.isRequired,
    callbackMethod: PropTypes.func.isRequired,
    countries_list: PropTypes.array.isRequired,
    requestType: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.state = {
      country_id: "",
      IATA_code: "",
      id: 0,
      latitude: 0,
      longitude: 0,
      name: "",

      showModal: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.mapCallbackMethod = this.mapCallbackMethod.bind(this);
  }

  componentDidMount() {
    if (this.props.airport.id > 0 && this.props.requestType !== "POST") {
      this.setState({
        country_id: this.props.airport.country_id,
        IATA_code: this.props.airport.IATA_code,
        id: this.props.airport.id,
        latitude: this.props.airport.latitude,
        longitude: this.props.airport.longitude,
        name: this.props.airport.name,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showModal === false && this.state.showModal === true) {
      const id = this.props.airport.id;
      if (id > 0) {
        this.refs["ref-name-edit-" + id].value = this.props.airport.name;
        this.refs["ref-iata-edit-" + id].value = this.props.airport.IATA_code;
        this.refs["ref-country-edit-" + id].value = this.props.airport.country_id;
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
    const airport = {
      country_id: data.get("country_id"),
      IATA_code: data.get("IATA_code").toUpperCase(),
      id: this.state.id,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      name: data.get("name"),
    }
    this.props.callbackMethod(airport);
    this.setState({
      showModal: false
    });
  }

  mapCallbackMethod(coord) {
    this.setState({
      latitude: coord.lat,
      longitude: coord.lng,
    });
  }

  render() {
    const { id, latitude, longitude, name, showModal } = this.state;
    const { centerAroundCurrentLocation, countries_list, requestType } = this.props;

    const isEdit = requestType !== "POST" ? true : false;
    const toggleModal = this.toggleModal;
    const mapCallbackMethod = this.mapCallbackMethod;

    return (
      <Modal isOpen={showModal} toggle={toggleModal} className={isEdit ? "EditAirportModal-" + id : "AddAirportModal" }>
        <Form onSubmit={this.handleModalSubmit}>
          <ModalHeader toggle={toggleModal}>{isEdit? "Edit: " + name : "Add New Airport"}</ModalHeader>
          <ModalBody>
            <div className="row gmaps-object">
              <GMapsContainer callbackMapClick={mapCallbackMethod} centerAroundCurrentLocation={centerAroundCurrentLocation} gMapData={{
                lat: latitude,
                lng: longitude,
                name: name,
              }} />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" ref={id > 0? "ref-name-edit-"+id : "ref-name-add"} required={true} />
              <small className="form-text text-muted">Enter name of the airport</small>
            </div>
            <div className="form-group">
              <label htmlFor="IATA_code">IATA Location Identifier</label>
              <input type="text" className="form-control" name="IATA_code" ref={id > 0? "ref-iata-edit-"+id : "ref-iata-add"} required={true} pattern="[A-Za-z]{3}" />
              <small className="form-text text-muted">Enter three-letter code designation of the airport. Example: ABC</small>
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
