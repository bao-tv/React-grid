import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';

function Example({ show, setShow, handleAdd }) {
    const { register, handleSubmit, getValues, setValue } = useForm({ defaultValues: { i: "" ,name: "", width: 0, height: 0 } });

    const handleAddModal = (data) => {
        handleAdd(data);
        handleClose();
    };

    const handleClose = () => {
        setValue("i", "");
        setValue("name", "");
        setValue("width", 0);
        setValue("height", 0);
        setShow(false);
    };
    console.log('bao show: ', show);
    useEffect(() => {
        if (show.i) {
            setValue("i", show.i);
            setValue("name", show.name);
            setValue("width", show.width);
            setValue("height", show.height);
        }
    }, [show])

    return (
        <Form>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD BALE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
                        <Form.Control {...register('name')} aria-label="Name" aria-describedby="inputGroup-sizing-default" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Width</InputGroup.Text>
                        <Form.Control {...register('width')} aria-label="Width" aria-describedby="inputGroup-sizing-default" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Height</InputGroup.Text>
                        <Form.Control {...register('height')} aria-label="Height" aria-describedby="inputGroup-sizing-default" />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" title="Submit" onClick={handleSubmit(handleAddModal)}>
                        {show.name ? 'EDIT' : 'ADD'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
}

export default Example;
