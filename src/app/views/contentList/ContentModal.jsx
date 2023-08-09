import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateClass from "./CreateContent";
import UpdateClass from "./UpdateContent";

const ContentModal = ({ handleClose, show, clickValue, paramValue }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header
                    closeButton
                    className="text-white"
                    style={{ backgroundColor: modalColor?modalColor:"#0675F8" }}
                >
                    <Modal.Title>{clickValue}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clickValue === "Add New Content" && (
                        <CreateClass handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Content" && (
                        <UpdateClass handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(ContentModal);
