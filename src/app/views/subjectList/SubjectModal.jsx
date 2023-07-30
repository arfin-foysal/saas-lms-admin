import React from "react";
import Modal from "react-bootstrap/Modal";

import { modalColor } from "../../../utils/Theme";
import CreateClass from "./CreateSubject";
import UpdateClass from "./UpdateSubject";


const SubjectModal = ({ handleClose, show, clickValue, paramValue }) => {
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
                    {clickValue === "Add New Subject" && (
                        <CreateClass handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Subject" && (
                        <UpdateClass handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(SubjectModal);
