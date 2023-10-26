import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateClass from "./CreateCourse";
import UpdateClass from "./UpdateCourse";

const CourseModal = ({ handleClose, show, clickValue, paramValue,size }) => {
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
                    {clickValue === "Add New Course" && (
                        <CreateClass handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Course" && (
                        <UpdateClass handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
          
                </Modal.Body>
            </Modal>
        </>
    );
};
export default React.memo(CourseModal);
