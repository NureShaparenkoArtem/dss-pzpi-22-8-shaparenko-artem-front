import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const App = () => {
  const [data, setData] = useState([]);
  const [resource, setResource] = useState("good");
  const [tabularData, setTabularData] = useState([]);
  const [isTabularView, setIsTabularView] = useState(false);

  const fetchData = useCallback(() => {
    fetch(`http://localhost:8080/api/v1/${resource}`)
      .then((response) => response.json())
      .then((data) => {
        const idMapping = {
          department: "dept_id",
          good: "good_id",
          sale: "sale_id",
          worker: "worker_id",
        };
        const idField = idMapping[resource];
        setData(data.map((item) => ({ ...item, id: item[idField] })));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [resource]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExecuteProcedure = (departmentId) => {
    fetch(
      `http://localhost:8080/api/v1/good/update-description?departmentId=${departmentId}`,
      {
        method: "POST",
      }
    )
      .then(() => fetchData())
      .catch((error) => console.error("Error executing procedure:", error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/v1/${resource}/${id}`, {
      method: "DELETE",
    })
      .then(() => setData(data.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting data:", error));
  };

  const handleCountWorkersScalar = (addressInput) => {
    fetch(
      `http://localhost:8080/api/v1/worker/count-scalar?address=${addressInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        alert(`Number of employees at the address "${addressInput}": ${data}`);
      })
      .catch((error) => console.error("Error in counting workers:", error));
  };

  const handleCountWorkersTabular = (addressInput) => {
    fetch(
      `http://localhost:8080/api/v1/worker/count-tabular?address=${addressInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTabularData(data.map((name, index) => ({ id: index + 1, name })));
        setIsTabularView(true);
      })
      .catch((error) =>
        console.error("Error getting list of employees:", error)
      );
  };

  const handleBackToResourceView = () => {
    setIsTabularView(false);
  };

  const handleUpdatePrice = (goodId, newPrice) => {
    fetch(
      `http://localhost:8080/api/v1/good/${goodId}/price?newPrice=${newPrice}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          alert("Price updated successfully.");
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || "Unknown error"}`);
        }
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating price:", error);
        alert("There was an error updating the price.");
      });
  };

  const columns =
    data.length > 0
      ? [
          ...Object.keys(data[0]).map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            flex: 1,
          })),
          {
            field: "actions",
            headerName: "Actions",
            renderCell: (params) => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </Button>
            ),
          },
        ]
      : [];

  return (
    <div className="p-4">
      <Header onButtonClick={setResource} />
      <h1 className="text-2xl font-bold my-4 text-center">
        {isTabularView
          ? "Workers List by Address"
          : `${resource.charAt(0).toUpperCase() + resource.slice(1)} Data`}
      </h1>
      <div className="flex justify-center">
        <div style={{ height: 650, width: "60%" }}>
          {isTabularView ? (
            <DataGrid
              rows={tabularData}
              columns={[{ field: "name", headerName: "Worker Name", flex: 1 }]}
              pageSize={10}
            />
          ) : (
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              checkboxSelection
            />
          )}
        </div>
      </div>
      {isTabularView && (
        <div class="flex flex-col items-center">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleBackToResourceView}
          >
            Back to Resource View
          </button>
        </div>
      )}
      <Footer
        onExecuteProcedure={handleExecuteProcedure}
        onCountWorkers={handleCountWorkersScalar}
        onWorkersList={handleCountWorkersTabular}
        onUpdatePrice={handleUpdatePrice}
      />
    </div>
  );
};

export default App;
