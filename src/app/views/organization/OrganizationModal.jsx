import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateOrganization from "./CreateOrganization";
import UpdateOrganization from "./UpdateOrganization";
import UpdateSettings from "./UpdateSettings";
const OrganizationModal = ({ handleClose, show, clickValue, paramValue }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header
                    closeButton
                    className="text-white"
                    style={{ backgroundColor: modalColor ? modalColor : "#0675F8" }}
                >
                    <Modal.Title>{clickValue}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clickValue === "Add New Organization" && (
                        <CreateOrganization handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Organization" && (
                        <UpdateOrganization handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                    {clickValue === "Update Settings" && (
                        <UpdateSettings handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(OrganizationModal);
