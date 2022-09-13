import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { connect, useDispatch } from 'react-redux'
import { addItem } from '../actions/itemActions'
import { v1 as uuid } from 'uuid'

function ItemModal () {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    modal: false,
    name: ''
  })
  function toggle() {
    setState({
      modal: !state.modal,
    })
  }
  function onChange(e) {
    e.target.name = e.target.value
    setState({
      modal: true,
      name: e.target.name
    })
  }
  function onSubmit(e) {
    e.preventDefault()
    const newItem = {
      name: state.name
    }
    // Add item via addItem action
    dispatch(addItem(newItem))
    toggle()
  }
  return (
    <div>
      <Button
        color="dark"
        style={{marginBottom: '2rem'}}
        onClick={toggle}
      >Add Item</Button>
      <Modal
        isOpen={state.modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={onChange}
              />
              <Button
                color ="dark"
                style={{marginTop: '2rem' }}
                block
              >Add Item</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect( mapStateToProps, { addItem })(ItemModal)