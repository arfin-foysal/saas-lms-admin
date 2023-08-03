import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateQuizQuestion from "./CreateContentOutline";
import UpdateQuizQuestion from "./UpdateContentOutline";




const ContentOutlineModal = ({ handleClose, show, clickValue, paramValue, size }) => {
    
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
                    {clickValue === "Add New Content Outline" && (
                        <CreateQuizQuestion handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                    {clickValue === "Update Content Outline" && (
                        <UpdateQuizQuestion handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
             
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(ContentOutlineModal);
