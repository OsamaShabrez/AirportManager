import React from "react";
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap';

export default class DeleteModal extends React.Component {
  static propTypes = {
    deleteMethod: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }
  constructor() {
    super();
    this.state = {
      showDeleteModal: false,
    }
    this.confirmDeleteAction = this.confirmDeleteAction.bind(this);
    this.deleteAction = this.deleteAction.bind(this);
  }

  confirmDeleteAction() {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal
    })
  }

  deleteAction(id) {
    this.props.deleteMethod(id);
    this.setState({
      showDeleteModal: false
    });
  }

  render() {
    const { showDeleteModal } = this.state;
    const { id, title } = this.props;
    const deleteToggle = this.confirmDeleteAction;

    return (
      <Modal isOpen={showDeleteModal} toggle={deleteToggle} className={"DeleteModal-" + id}>
          <ModalHeader toggle={deleteToggle}>Delete</ModalHeader>
          <ModalBody>
              Are you sure you want to delete "{title}"?
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={() => this.deleteAction(id)}>Ok</Button>{' '}
              <Button color="secondary" onClick={deleteToggle}>Cancel</Button>
          </ModalFooter>
      </Modal>
    );
  }
}
