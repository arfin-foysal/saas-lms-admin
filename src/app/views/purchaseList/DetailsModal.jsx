import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import DetailsVideoContent from "./DetailsPurchase";
const DetailsModal = ({ handleClose, show, clickValue, paramValue ,size}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header
                    closeButton
                    className="text-white"
                    style={{ backgroundColor: modalColor?modalColor:"#0675F8" }}
                >
                    <Modal.Title>{clickValue}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                    {clickValue === "Purchase Details" && (
                        <DetailsVideoContent handleClose={handleClose} values={paramValue} />
                    )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(DetailsModal);
