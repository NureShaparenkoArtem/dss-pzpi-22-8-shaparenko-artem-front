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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/4"
        onClick={() => {
          const departmentId = prompt("Введите department_id:");
          if (departmentId) onExecuteProcedure(parseInt(departmentId));
        }}
      >
        Execute Procedure
      </button>
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-1/4"
        onClick={() => {
          const addressInput = prompt("Введите адрес для подсчета работников:");
          if (addressInput) onCountWorkers(addressInput);
        }}
      >
        Count Workers
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-1/4"
        onClick={() => {
          const addressInput = prompt(
            "Введите адрес для получения списка работников:"
          );
          if (addressInput) onWorkersList(addressInput);
        }}
      >
        Get Workers List
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/4"
        onClick={() => {
          const goodId = prompt("Введите ID товара для обновления цены:");
          const newPrice = prompt("Введите новую цену:");
          if (goodId && newPrice) onUpdatePrice(parseInt(goodId), newPrice);
        }}
      >
        Update Price
      </button>
    </div>
  );
};

export default Footer;
