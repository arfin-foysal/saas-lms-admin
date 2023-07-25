import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Themes";
import CreateQuiz from "./CreateQuiz";
import UpdateQuiz from "./UpdateQuiz";
import DetailsQuiz from "./DetailsQuiz";


const QuizModal = ({ handleClose, show, clickValue, paramValue }) => {
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
                    {clickValue === "Add New Quiz" && (
                        <CreateQuiz handleClose={handleClose} />
                    )
                    }
                    {clickValue === "Update Quiz" && (
                        <UpdateQuiz handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                    {/* {clickValue === "Quiz Details" && (
                        <DetailsQuiz
                         handleClose={handleClose} values={paramValue} />
                    )
                    } */}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(QuizModal);
