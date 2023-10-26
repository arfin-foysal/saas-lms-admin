import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateEnrollMent from "./CreateEnrollMent";
import UpdateEnrollMent from "./UpdateEnrollMent";

const EnrollMentModal = ({ handleClose, show, clickValue, paramValue }) => {
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
                    {clickValue === "Add New Enrollment" && (
                        <CreateEnrollMent handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Enrollment" && (
                        <UpdateEnrollMent handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                    {/* {clickValue === "Enrollment Details" && (
                        <DetailsVideoContent handleClose={handleClose} values={paramValue} />
                    )
                    } */}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(EnrollMentModal);
