import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateChapter from "./CreateChapter";
import UpdateChapter from "./UpdateChapter";

const ChapterModal = ({ handleClose, show, clickValue, paramValue }) => {
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
                    {clickValue === "Add New Chapter" && (
                        <CreateChapter handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Chapter" && (
                        <UpdateChapter handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(ChapterModal);
