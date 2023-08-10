import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateStudentMapping from "./CreateStudentMapping";
import UpdateStudentMapping from "./UpdateStudentMapping";
const StudentMappingModal = ({ handleClose, show, clickValue, paramValue, size, data }) => {

    
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
                    {clickValue === "Add New Student Mapping" && (
                        <CreateStudentMapping handleClose={handleClose} paramValue={paramValue} assData={data} />
                    )
                    }
                    {clickValue === "Update Student Mapping" && (
                        <UpdateStudentMapping handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(StudentMappingModal);
