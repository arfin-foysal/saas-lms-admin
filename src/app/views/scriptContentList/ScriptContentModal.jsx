import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateScriptContent from "./CreateScriptContent";
import UpdateScriptContent from "./UpdateScriptContent";
import DetailsScriptContent from "./DetailsScriptContent";


const ScriptContentModal = ({ handleClose, show, clickValue, paramValue }) => {
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
                    {clickValue === "Add New Script" && (
                        <CreateScriptContent handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Script" && (
                        <UpdateScriptContent handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                    {clickValue === "Script Details" && (
                        <DetailsScriptContent
                         handleClose={handleClose} values={paramValue} />
                    )
                    }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(ScriptContentModal);
