import { useState, useEffect } from "react";
import { useAuth } from "../Login/AuthProvider";
import { useNavigate } from "react-router";

type DataItem = {
  _id: string;
  name: string;
  category: string;
  upc: string;
  cost: number;
  price: number;
  discount: number;
  qty: number;
  reorder: number;
  roAmount: number;
  sku: string;
  vendor: string;
  sellerId: string;
  date: string;
  status: string;
  companyAccount: string;
};

export const Inventory: React.FC = () => {
  const [search, setSearch] = useState("");
  const [inventory, setInventory] = useState<DataItem[]>([]);
  const [searchType, setSearchType] = useState<keyof DataItem | "">("");
  const [dataOrFiltered, setDataOrFiltered] = useState("data");
  const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const updated: DataItem[] = [];
  const navigate = useNavigate()
  const {login, companyInfo} = useAuth()


  const companyAccount = companyInfo.companyAccount
  const labels = [
    "ID",
    "Name",
    "Category",
    "UPC",
    "Cost",
    "Price",
    "Discount",
    "Qty",
    "Re-order",
    "RO Amount",
    "SKU",
    "Vendor",
    "Seller ID",
    "Date",
    "Status",
  ];

  const labelToFieldMapping: { [key: string]: keyof DataItem } = {
    ID: "_id",
    Name: "name",
    Category: "category",
    UPC: "upc",
    Cost: "cost",
    Price: "price",
    Discount: "discount",
    Qty: "qty",
    "Re-order": "reorder",
    "RO Amount": "roAmount",
    SKU: "sku",
    Vendor: "vendor",
    "Seller ID": "sellerId",
    Date: "date",
    Status: "status",
  };

  useEffect(() => {
    if(!login) {
      navigate('/')
    }
    const urlInventory = `https://ziggify-backend.onrender.com/inventory/${companyAccount}`;
    fetch(urlInventory)
      .then((res) => res.json())
      .then((data) => {
        setInventory(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  }, [companyAccount]);

  const handleSearch = () => {
    if (!searchType) {
      window.alert("You must select a filter before searching");
      return;
    }

    const tempFilteredItems = inventory.filter((item) => {
      const field = labelToFieldMapping[searchType];
      if (!field) {
        window.alert("Invalid filter selected");
        return false;
      }

      const value = item[field];

      if (typeof value === "string" && typeof search === "string") {
        // If both value and search are strings, perform case-insensitive comparison
        return value.toLowerCase().includes(search.toLowerCase());
      } else if (typeof value === "number" && typeof search === "string") {
        // If both value and search are numbers, perform numeric comparison
        let strValue = value.toString();
        return strValue.includes(search);
      }
      window.alert("An error occurred or nothing was found");
      return false;
    });

    setFilteredItems(tempFilteredItems);
    setDataOrFiltered("filtered");
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const collectEditedInventory = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    label: string
  ) => {
    let value: string | number = e.target.value;
    if (
      label === "cost" ||
      label === "price" ||
      label === "discount" ||
      label === "qty" ||
      label === "reorder" ||
      label === "roAmount"
    ) {
      value = Number(value);
    }
    let obj = inventory.find((item) => item._id === id);

    const index = updated.findIndex((item) => item === obj);

    if (index !== -1) {
      if ((updated[index] as any)[label] === value) {
      } else {
        (updated[index] as any)[label] = value;
      }
    } else {
      if (obj) {
        (obj as any)[label] = value;
        updated.push(obj);
      }
    }
    console.log(updated);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://ziggify-backend.onrender.com/inventory/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updated),
        }
      );

      if (response.ok) {
        console.log("Items updated successfully");
      } else {
        console.error("Failed to update items");
      }
    } catch (error) {
      console.error("Error updating items:", error);
    }
    window.alert("Your changes have been saved");
    setEdit(false);
  };

  const addOneRow = () => {
    setAdd(true);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
  };

  const handleAdd = async () => {
    const dataToSend = {
      name: inputValues[1],
      category: inputValues[2],
      upc: inputValues[3],
      cost: inputValues[4],
      price: inputValues[5],
      discount: inputValues[6],
      qty: inputValues[7],
      reorder: inputValues[8],
      roAmount: inputValues[9],
      sku: inputValues[10],
      vendor: inputValues[11],
      sellerId: inputValues[12],
      date: new Date(),
      status: inputValues[14],
      companyAccount: companyAccount,
    };
    try {
      const response = await fetch(
        "https://ziggify-backend.onrender.com/inventory/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        console.log("Items updated successfully");
        const urlInventory = `https://ziggify-backend.onrender.com/inventory/${companyAccount}`;
        fetch(urlInventory)
          .then((res) => res.json())
          .then((data) => {
            setInventory(data);
            // console.log(data);
          })
          .catch((error) => {
            console.error("Error fetching inventory:", error);
          })
      } else {
        console.error("Failed to update items");
      }
    } catch (err) {
      console.error("problem:", err);
    }
    window.alert("Your changes have been saved");
    setAdd(false);
  };

  const handleDelete = async (clickedItem: DataItem) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${clickedItem._id}?`
    );

    if (confirmDelete) {
      let id = clickedItem._id;
      try {
        const response = await fetch(
          `https://ziggify-backend.onrender.com/inventory/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(clickedItem),
          }
        );

        if (response.ok) {
          console.log("Item deleted");
          const urlInventory = `https://ziggify-backend.onrender.com/inventory/${companyAccount}`;
          fetch(urlInventory)
            .then((res) => res.json())
            .then((data) => {
              setInventory(data);
              // console.log(data);
            })
            .catch((error) => {
              console.error("Error fetching inventory:", error);
            });
          // window.location.reload();
        } else {
          console.error("Failed to delete");
        }
      } catch (err) {
        console.error("problem:", err);
      }
    } else {
      setDeleteItem(false)
    }
  };

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const workbook = XLSX.read(e.target.result, { type: 'binary' });
  //       const sheetName = workbook.SheetNames[0];
  //       const sheet = workbook.Sheets[sheetName];
  //       const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  //       // Assuming parsedData is an array of arrays representing your spreadsheet
  //       // Update state or perform any required logic
  //       setData(parsedData);
  //     };
  //     reader.readAsBinaryString(file);
  //   }
  // };
  // also need to npm i xlsx

  return (
    <div className=" h-screen p-5 bg-blue-50">
      <div className="mb-4 flex flex-row">
        <select
          name="typeOfSearch"
          id="search"
          onChange={(e) => setSearchType(e.target.value as keyof DataItem)}
          className="bg-gray-200 rounded-l-lg p-2 border-t-2 border-l-2 border-b-2 border-gray-500"
        >
          <option value="">Choose One</option>
          <option value="ID">ID</option>
          <option value="Name">Name</option>
          <option value="Category">Category</option>
          <option value="UPC">UPC</option>
          <option value="Cost">Cost</option>
          <option value="Price">Price</option>
          <option value="Discount">Discount</option>
          <option value="Qty">Quantity</option>
          <option value="Re-order">Re-order Point</option>
          <option value="RO Amount">Re-order Amount</option>
          <option value="SKU">SKU</option>
          <option value="Vendor">Vendor</option>
          <option value="SellerID">Seller ID</option>
          <option value="Date">Date</option>
          <option value="Status">Status</option>
        </select>
        <input
          type="text"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-1/3 border-t-2 border-gray-500 border-b-2"
          placeholder="Filtered Search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-white border-t-2 border-b-2 border-r-2 border-gray-500 rounded-r-lg hover:bg-pieChartTwo hover:text-white hover:border-pieChartTwo"
        >
          Search
        </button>
        <button
          onClick={() => setDataOrFiltered("data")}
          className="p-2 bg-red-500 ml-2 rounded-lg text-white border-red-600 border-2 pl-4 pr-4"
        >
          Reset
        </button>
        <div className="flex flex-row ml-32">
          <button
            className="mr-10 p-2 bg-pieChartOne text-white rounded-lg border-2 border-pieBorderOne pl-4 pr-4 w-24 hover:border-pieBorderThree hover:bg-pieChartThree"
            onClick={addOneRow}
          >
            Add +
          </button>
          <button
            className={
              edit
                ? "mr-10 p-2 bg-pieChartFour text-white rounded-lg border-2 border-pieBorderFour pl-4 pr-4 w-24"
                : "mr-10 p-2 bg-pieChartOne text-white rounded-lg border-2 border-pieBorderOne pl-4 pr-4 w-24"
            }
            onClick={handleEdit}
          >
            Edit ~
          </button>
          <button
            className={
              deleteItem
                ? "mr-10 p-2 bg-red-500 text-white rounded-lg border-2 border-red-600 pl-4 pr-4 w-24"
                : "mr-10 p-2 bg-pieChartOne text-white rounded-lg border-2 border-pieBorderOne pl-4 pr-4 w-24"
            }
            onClick={() => setDeleteItem(true)}
          >
            Delete -
          </button>
          <button
            className="p-2 pl-4 pr-4 bg-pieChartOne text-white rounded-lg border-2 border-pieBorderOne w-24"
            onClick={
              edit
                ? handleSave
                : deleteItem
                ? () => {
                    setDeleteItem(false);
                    window.alert("Your changes have been saved");
                  }
                : handleAdd
            }
          >
            Save
          </button>
        </div>
      </div>
      <div className="grid grid-cols-bigCols grid-rows-auto bg-white rounded">
        {labels.map((label, index) => (
          <p key={index} className="text-center border-2 p-1 font-bold">
            {label}
          </p>
        ))}
        {dataOrFiltered === "data" && edit === false
          ? inventory.map((item) => (
              <>
                {labels.map((label, i) => (
                  <p
                    key={i}
                    className={
                      label === "Status"
                        ? item[labelToFieldMapping[label]] === "In Stock"
                          ? "text-center border-2 p-1 text-pieChartTwo"
                          : item[labelToFieldMapping[label]] === "Re-Order"
                          ? "text-center border-2 p-1 text-red-500"
                          : item[labelToFieldMapping[label]] === "Discount"
                          ? "text-center border-2 p-1 text-iconColorFour"
                          : item[labelToFieldMapping[label]] === "Out of Stock"
                          ? "text-center border-2 p-1 text-gray-500"
                          : item[labelToFieldMapping[label]] === "Incomplete"
                          ? "text-center border-2 p-1 text-pieChartThree"
                          : ""
                        : !deleteItem
                        ? "text-center border-2 p-1 overflow-hidden overflow-x-scroll"
                        : "text-center border-2 p-1 overflow-hidden overflow-x-scroll cursor-trashcan"
                    }
                    onClick={deleteItem ? () => handleDelete(item) : undefined}
                  >
                    {item[labelToFieldMapping[label]]}
                  </p>
                ))}
              </>
            ))
          : dataOrFiltered === "filtered" && edit === false
          ? filteredItems.map((item) => (
              <>
                {labels.map((label, i) => (
                  <p
                    key={i}
                    className={
                      label === "Status"
                        ? item[labelToFieldMapping[label]] === "In Stock"
                          ? "text-center border-2 p-1 text-pieChartTwo"
                          : item[labelToFieldMapping[label]] === "Re-Order"
                          ? "text-center border-2 p-1 text-red-500"
                          : item[labelToFieldMapping[label]] === "Discount"
                          ? "text-center border-2 p-1 text-iconColorFour"
                          : item[labelToFieldMapping[label]] === "Out of Stock"
                          ? "text-center border-2 p-1 text-gray-500"
                          : item[labelToFieldMapping[label]] === "Incomplete"
                          ? "text-center border-2 p-1 text-pieChartThree"
                          : ""
                        : !deleteItem
                        ? "text-center border-2 p-1 overflow-hidden overflow-x-scroll"
                        : "text-center border-2 p-1 overflow-hidden overflow-x-scroll cursor-trashcan"
                    }
                    onClick={deleteItem ? () => handleDelete(item) : undefined}
                  >
                    {item[labelToFieldMapping[label]]}
                  </p>
                ))}
              </>
            ))
          : dataOrFiltered === "data" && edit
          ? inventory.map((item) => (
              <>
                {labels.map((label, i) => (
                  <input
                    type="text"
                    key={i}
                    placeholder={`${item[labelToFieldMapping[label]] || ''}`}
                    className="text-center border-2 p-1 overflow-hidden overflow-x-scroll border-gray-600"
                    onChange={(e) =>
                      collectEditedInventory(
                        e,
                        item._id,
                        labelToFieldMapping[label]
                      )
                    }
                  />
                ))}
              </>
            ))
          : filteredItems.map((item) => (
              <>
               {labels.map((label, i) => (
                  <input
                    type="text"
                    key={i}
                    placeholder={`${item[labelToFieldMapping[label]] || ''}`}
                    className="text-center border-2 p-1 overflow-hidden overflow-x-scroll border-gray-600"
                    onChange={(e) =>
                      collectEditedInventory(
                        e,
                        item._id,
                        labelToFieldMapping[label]
                      )
                    }
                  />
                ))}
              </>
            ))}
        {add && (
          <>
            {labels.map((label, i) => (
              <>
                {label === "ID" || label === "Date" ? (
                  <input
                    type="text"
                    key={i}
                    placeholder={label}
                    disabled
                    className="text-center border-2 p-1 overflow-hidden overflow-x-scroll border-gray-600"
                  />
                ) : (
                  <input
                    type="text"
                    key={i}
                    placeholder={label}
                    className="text-center border-2 p-1 overflow-hidden overflow-x-scroll border-gray-600"
                    onChange={(e) => handleInputChange(i, e.target.value)}
                  />
                )}
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
