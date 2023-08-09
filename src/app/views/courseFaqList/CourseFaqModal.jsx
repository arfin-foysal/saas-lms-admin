import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateQuizQuestion from "./CreateCourseFaq";
import UpdateQuizQuestion from "./UpdateCourseFaq";

const CourseFaqModal = ({ handleClose, show, clickValue, paramValue, size }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} size={ size}>
                <Modal.Header
                    closeButton
                    className="text-white"
                    style={{ backgroundColor: modalColor?modalColor:"#0675F8" }}
                >
                    <Modal.Title>{clickValue}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clickValue === "Add New Course FAQ" && (
                        <CreateQuizQuestion handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                    {clickValue === "Update Course FAQ" && (
                        <UpdateQuizQuestion handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
             
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(CourseFaqModal);
