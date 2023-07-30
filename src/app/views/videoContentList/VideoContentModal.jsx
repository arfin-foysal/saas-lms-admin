import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateVideoContent from "./CreateVideoContent";
import UpdateVideoContent from "./UpdateVideoContent";
import DetailsVideoContent from "./DetailsVideoContent";

const VideoContentModal = ({ handleClose, show, clickValue, paramValue }) => {
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
                    {clickValue === "Add New Video" && (
                        <CreateVideoContent handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Video" && (
                        <UpdateVideoContent handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                    {clickValue === "Video Details" && (
                        <DetailsVideoContent handleClose={handleClose} values={paramValue} />
                    )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(VideoContentModal);
