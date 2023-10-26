import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateWebsitePage from "./CreateWebsitePage";
import UpdateWebsitePage from "./UpdateWebsitePage";

const WebsitePageModal = ({ handleClose, show, clickValue, paramValue }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg    z">
                <Modal.Header
                    closeButton
                    className="text-white"
                    style={{ backgroundColor: modalColor?modalColor:"#0675F8" }}
                >
                    <Modal.Title>{clickValue}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clickValue === "Add New Page" && (
                        <CreateWebsitePage handleClose={handleClose} id={paramValue}  />
                    )
                    }
                    {clickValue === "Update Page" && (
                        <UpdateWebsitePage handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(WebsitePageModal);
