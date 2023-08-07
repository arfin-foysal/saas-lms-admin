import React from "react";
import Modal from "react-bootstrap/Modal";

import { modalColor } from "../../../utils/Theme";
import CreateStudent from "./CreateStudent";
import UpdateStudent from "./UpdateStudent";




const StudentModal = ({ handleClose, show, clickValue, paramValue,size }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} size={size}>
                <Modal.Header
                    closeButton
                    className="text-white"
                    style={{ backgroundColor: modalColor?modalColor:"#0675F8" }}
                >
                    <Modal.Title>{clickValue}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clickValue === "Add New Student" && (
                        <CreateStudent handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Student" && (
                        <UpdateStudent handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
          
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(StudentModal);
