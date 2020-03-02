import React, { useState } from "react";
import Modal from "react-modal";
import getLeaveDuration from '../../handlers/noofdays'
import { useFormState } from "react-use-form-state";
import getStringDate from "../../handlers/StringData";

function PendingRequestEntry(props) {
  let [isOpenModalOpen, setIsModalOpen] = useState(false);
  let [formState, { text }] = useFormState();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formState.values.reason);
    setIsModalOpen(false);
  };

  Modal.defaultStyles.content.width = "30vw";
  Modal.defaultStyles.content.height = "30vw";
  Modal.defaultStyles.content.textAlign = "center";
  Modal.defaultStyles.content.marginLeft = "35vw";
  Modal.defaultStyles.content.padding = "2rem";

  return (
    <>
      <tbody>
        <tr>
          <td>{props.entry.leaveType[0].toUpperCase() +  
            props.entry.leaveType.slice(1)}</td>
          <td>{props.entry.firstName}</td>
          <td>{getStringDate(props.entry.startDate)}</td>
          <td>{getStringDate(props.entry.endDate)}</td>
          <td>{getLeaveDuration(props.entry.startDate,props.entry.endDate,props.entry.halfDay)}</td>
          <td>
            <button
              type="button"
              id="accept"
              onClick={() =>
                props.onStatusChange(props.entry, props.entry._id, "approved")
              }
            >
              Accept
            </button>{" "}
            <button
              type="button"
              id="reject"
              onClick={() => props.onStatusChange(props.entry,props.entry._id, "rejected")}
            >
              Reject
            </button>
          </td>
        </tr>
      </tbody>

      <Modal isOpen={isOpenModalOpen} ariaHideApp={false}>
        <form>
          <input {...text("reason")} />
          <br />
          <button type="button">Submit</button>
        </form>
      </Modal>
    </>
  );
}

export default PendingRequestEntry;
