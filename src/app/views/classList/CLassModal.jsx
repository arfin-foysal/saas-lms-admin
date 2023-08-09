import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateClass from "./CreateClass";
import UpdateClass from "./UpdateClass";

const CLassModal = ({ handleClose, show, clickValue, paramValue }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} size="md">
                <Modal.Header
                    closeButton
                    className="text-white"
                    style={{ backgroundColor: modalColor?modalColor:"#0675F8" }}
                >
                    <Modal.Title>{clickValue}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clickValue === "Add New Class" && (
                        <CreateClass handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Class" && (
                        <UpdateClass handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(CLassModal);
