import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, Modal, ModalHeader, ModalBody, ModalFooter }  from "reactstrap";

export default class AddEditAirlineModal extends React.Component {
  static propTypes = {
    flightSchedule: PropTypes.object.isRequired,
    callbackMethod: PropTypes.func.isRequired,
    airlines_list: PropTypes.array.isRequired,
    airports_list: PropTypes.array.isRequired,
    requestType: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.state = {
      StrId: 0,
      airline_id: 0,
      depart_airport_id: 0,
      arrive_airport_id: 0,
      oldURL: "",

      showModal: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.flightSchedule.airline_id > 0 && this.props.requestType !== "POST") {
      const fs = this.props.flightSchedule;
      const id = `${fs.airline_id}${fs.depart_airport_id}${fs.arrive_airport_id}`;
      const oldURL = `${fs.airline_id}/${fs.depart_airport_id}/${fs.arrive_airport_id}`;
      this.setState({
        strId: id,
        airline_id: this.props.flightSchedule.airline_id,
        depart_airport_id: this.props.flightSchedule.depart_airport_id,
        arrive_airport_id: this.props.flightSchedule.arrive_airport_id,
        oldURL: oldURL,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showModal === false && this.state.showModal === true) {
      const id = this.state.strId;
      if (id > 0) {
        this.refs["ref-airlineId-edit-" + id].value = this.props.flightSchedule.airline_id;
        this.refs["ref-departAir-edit-" + id].value = this.props.flightSchedule.depart_airport_id;
        this.refs["ref-arriveAir-edit-" + id].value = this.props.flightSchedule.arrive_airport_id;
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
    const flightSchedule = {
      airline_id: data.get("airline_id"),
      depart_airport_id: data.get("depart_airport_id"),
      arrive_airport_id: data.get("arrive_airport_id"),
      oldURL: this.state.oldURL,
    }
    this.props.callbackMethod(flightSchedule);
    this.setState({
      showModal: false
    });
  }

  render() {
    const { strId, showModal } = this.state;
    const { airlines_list, airports_list, requestType } = this.props;

    const isEdit = requestType !== "POST" ? true : false;
    const toggleModal = this.toggleModal;

    return (
      <Modal isOpen={showModal} toggle={toggleModal} className={isEdit ? "EditFlightScheduleModal-" + strId : "AddFlightScheduleModal" }>
        <Form onSubmit={this.handleModalSubmit}>
          <ModalHeader toggle={toggleModal}>{isEdit? "Edit Flight Details" : "Add New Flight Schedule"}</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="depart_airport_id">Departing Airport</label>
              <select className="form-control" name="depart_airport_id" ref={strId > 0? "ref-departAir-edit-"+strId : "ref-departAir-add"} required={true}>
                {
                  airports_list.map(function(airport, index, airports_list) {
                    return (
                      <option key={index} value={airport.id}>{`${airport.IATA_code}-${airport.name}`}</option>
                    )
                  }, this)
                }
              </select>
              <small className="form-text text-muted">Select departing airport from the drop-down</small>
            </div>
            <div className="form-group">
              <label htmlFor="arrive_airport_id">Arriving Airport</label>
              <select className="form-control" name="arrive_airport_id" ref={strId > 0? "ref-arriveAir-edit-"+strId : "ref-arriveAir-add"} required={true}>
                {
                  airports_list.map(function(airport, index, airports_list) {
                    return (
                      <option key={index} value={airport.id}>{`${airport.IATA_code}-${airport.name}`}</option>
                    )
                  }, this)
                }
              </select>
              <small className="form-text text-muted">Select destination from the drop-down</small>
            </div>
            <div className="form-group">
              <label htmlFor="airline_id">Arriving Airport</label>
              <select className="form-control" name="airline_id" ref={strId > 0? "ref-airlineId-edit-"+strId : "ref-airlineId-add"} required={true}>
                {
                  airlines_list.map(function(airline, index, airlines_list) {
                    return (
                      <option key={index} value={airline.id}>{airline.name}</option>
                    )
                  }, this)
                }
              </select>
              <small className="form-text text-muted">Select airlines for this flight from the drop-down</small>
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
