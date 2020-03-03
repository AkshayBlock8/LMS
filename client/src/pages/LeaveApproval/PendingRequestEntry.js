import React, { useState } from "react";
import Modal from "react-modal";
import stringCap from '../../handlers/stringCap'
import getLeaveDuration from '../../handlers/noofdays'
import { useFormState } from "react-use-form-state";
import getStringDate from "../../handlers/StringData";

function PendingRequestEntry(props) {
  let [isOpenModalOpen, setIsModalOpen] = useState(false);
  let [formState, { text }] = useFormState();
  let [status,setStatus]=useState(undefined)

  const handleModalOpen = (_status) => {
    setStatus(_status)
    setIsModalOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formState.values.reason);
    setIsModalOpen(false);
  };
  const handlePSubmit=()=>{
    console.log(formState.values.reason)
    props.onStatusChange(props.entry, props.entry._id,status)
    setIsModalOpen(false);
  }

  Modal.defaultStyles.content.width = "30vw";
  Modal.defaultStyles.content.boxSizing="border-box"
  Modal.defaultStyles.content.height = "30vw";
  Modal.defaultStyles.content.textAlign = "center";
  Modal.defaultStyles.content.marginLeft = "35vw";
  Modal.defaultStyles.content.padding = "2.5rem";

  return (
    <>
      <tbody>
        <tr>
          <td>{stringCap(props.entry.leaveType)}</td>
          <td>{props.entry.firstName}</td>
          <td>{getStringDate(props.entry.startDate)}</td>
          <td>{getStringDate(props.entry.endDate)}</td>
          <td>{getLeaveDuration(props.entry.startDate,props.entry.endDate,props.entry.halfDay)}</td>
          <td>
            <button
              type="button"
              id="accept"
              onClick={() =>
                handleModalOpen("approved")
              }
            >
              Accept
            </button>{" "}
            <button
              type="button"
              id="reject"
              onClick={() => handleModalOpen("rejected")}
            >
              Reject
            </button>
          </td>
        </tr>
      </tbody>

      <Modal isOpen={isOpenModalOpen} ariaHideApp={false}>
        <h2>Specify Reason</h2><br/>
        <form>
          <input {...text("reason")} id="resi" />
          <br /><br/><br/>
          <button type="button" id="resb" onClick={handlePSubmit}>Submit</button>
        </form>
      </Modal>
    </>
  );
}

export default PendingRequestEntry;
