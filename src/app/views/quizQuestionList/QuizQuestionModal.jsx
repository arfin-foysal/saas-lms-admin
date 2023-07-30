import React from "react";
import Modal from "react-bootstrap/Modal";
import { modalColor } from "../../../utils/Theme";
import CreateQuizQuestion from "./CreateQuizQuestion";
import UpdateQuizQuestion from "./UpdateQuizQuestion";
import ExcelImport from "./ExcelImport";



const QuizQuestionModal = ({ handleClose, show, clickValue, paramValue, size }) => {
    
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
                    {clickValue === "Add New Question" && (
                        <CreateQuizQuestion handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                    {clickValue === "Update Question" && (
                        <UpdateQuizQuestion handleClose={handleClose} paramValue={paramValue} />
                    )
                    }
                    {clickValue === "Upload Questions using XLSX" && (
                        <ExcelImport
                         handleClose={handleClose} paramValue={paramValue} />
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

export default React.memo(QuizQuestionModal);
