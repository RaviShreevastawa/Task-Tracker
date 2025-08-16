import React from "react";

const DeleteConfirmation = ({ task, onConfirm, onCancel }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Delete Task?
        </h3>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete "<strong>{task.title}</strong>"?
        </p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
          >
            OK
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
