import React from "react";

const Footer = ({
  onExecuteProcedure,
  onCountWorkers,
  onWorkersList,
  onUpdatePrice,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-1/4"
        onClick={() => {
          const departmentId = prompt("Enter department_id:");
          if (departmentId) onExecuteProcedure(parseInt(departmentId));
        }}
      >
        Execute Procedure
      </button>
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 w-1/4"
        onClick={() => {
          const addressInput = prompt("Enter address for employee count:");
          if (addressInput) onCountWorkers(addressInput);
        }}
      >
        Count Workers
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 w-1/4"
        onClick={() => {
          const addressInput = prompt(
            "Enter the address to get the list of employees:"
          );
          if (addressInput) onWorkersList(addressInput);
        }}
      >
        Get Workers List
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-1/4"
        onClick={() => {
          const goodId = prompt("Enter product ID to update price:");
          const newPrice = prompt("Enter new price:");
          if (goodId && newPrice) onUpdatePrice(parseInt(goodId), newPrice);
        }}
      >
        Update Price
      </button>
    </div>
  );
};

export default Footer;
