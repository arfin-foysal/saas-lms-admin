import React from "react";
import Modal from "react-bootstrap/Modal";
import CreateMenu from "./CreateMenu";
import { modalColor } from "../../../utils/Themes";
import UpdateMenu from "./UpdateMenu";

const MenuModal = ({ handleClose, show, clickValue, paramValue }) => {
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
                    {clickValue === "Add New Menu" && (
                        <CreateMenu handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Menu" && (
                        <UpdateMenu handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(MenuModal);
