import { useEffect, useState } from "react";
import { useAuth } from "../Login/AuthProvider";
import { useNavigate } from "react-router";


type DataItem = {
  _id: string;
  vName: string;
  contactInfo: string;
  contactPerson: string;
  taxId: string;
  leadTime: number;
  moq: number;
  companyAccount: string;
};

const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<DataItem[]>([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<keyof DataItem | "">("");
  const [dataOrFiltered, setDataOrFiltered] = useState("data");
  const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [deleteItem, setDeleteItem] = useState(false);
  const updated: DataItem[] = [];
  const {companyInfo, login} = useAuth()
  const companyAccount = companyInfo.companyAccount
  const navigate = useNavigate()


  const labels = [
    "Vendor ID",
    "Vendor Name",
    "Contact Info",
    "Contact Person",
    "Tax ID",
    "Lead Time",
    "MOQ",
  ];

  const labelToFieldMappingTwo: { [key: string]: keyof DataItem } = {
    "Vendor ID": "_id",
    "Vendor Name": "vName",
    "Contact Info": "contactInfo",
    "Contact Person": "contactPerson",
    "Tax ID": "taxId",
    "Lead Time": "leadTime",
    MOQ: "moq",
    // companyAccount: "companyAccount",
  };

  useEffect(() => {
    if(!login) {
      navigate('/')
    }
    const urlInventory = `https://ziggify-backend.onrender.com/vendor/${companyAccount}`;
    fetch(urlInventory)
      .then((res) => res.json())
      .then((data) => {
        setVendors(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
      });
  }, [companyAccount]);

  const handleSearch = () => {
    if (!searchType) {
      window.alert("You must select a filter before searching");
      return;
    }

    const tempFilteredItems = vendors.filter((item) => {
      const field = labelToFieldMappingTwo[searchType];
      if (!field) {
        window.alert("Invalid filter selected");
        return false;
      }

      const value = item[field];

      if (typeof value === "string" && typeof search === "string") {
        return value.toLowerCase().includes(search.toLowerCase());
      } else if (typeof value === "number" && typeof search === "string") {
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

  const collectEditedVendors = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    label: string
  ) => {
    let value: string | number = e.target.value;
    if (label === "leadTime" || label === "moq") {
      value = Number(value);
    }
    let obj = vendors.find((item) => item._id === id);

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
    if(updated.length > 1) {
      for(let i = 0; i < updated.length; i++){
        const data = updated[i]
        const updatedDataToSend = {
          vName: data.vName,
          contactInfo: data.contactInfo,
          contactPerson: data.contactPerson,
          taxId: data.taxId,
          leadTime: data.leadTime,
          moq: data.moq
        };
        const id = data._id
        try {
          const response = await fetch(
            `https://ziggify-backend.onrender.com/vendor/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedDataToSend),
            }
          );
    
          if (response.status === 200) {
            console.log("Items updated successfully");
          } else {
            console.error("Failed to update items");
          }
        } catch (error) {
          console.error("Error updating items:", error);
        }
      }
      window.alert("Your changes have been saved");
      setEdit(false);
    }
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
    console.log(inputValues)
    const dataToSend = {
      vName: inputValues[1],
      contactInfo: inputValues[2],
      contactPerson: inputValues[3],
      taxId: inputValues[4],
      leadTime: inputValues[5],
      moq: inputValues[6],
      companyAccount: companyAccount,
    };
    try {
      const response = await fetch(
        "https://ziggify-backend.onrender.com/vendor/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        console.log("Vendor updated successfully");
        window.location.reload();
      } else {
        console.error("Failed to update vendor");
      }
    } catch (err) {
      console.error("problem:", err);
    }
    window.alert("Your changes have been saved");
    setAdd(false);
  };

  const handleDelete = async (clickedItem: DataItem) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${clickedItem.vName}?`
    );

    if (confirmDelete) {
      let id = clickedItem._id;
      try {
        const response = await fetch(
          `https://ziggify-backend.onrender.com/vendor/${id}`,
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
          const urlInventory = `https://ziggify-backend.onrender.com/vendor/${companyAccount}`;
          fetch(urlInventory)
            .then((res) => res.json())
            .then((data) => {
              setVendors(data);
              // console.log(data);
            })
            .catch((error) => {
              console.error("Error fetching vendors:", error);
            });
          // window.location.reload();
        } else {
          console.error("Failed to delete");
        }
      } catch (err) {
        console.error("problem:", err);
      }
    }
  };

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
          <option value="Vendor ID">Vendor ID</option>
          <option value="Vendor Name">Vendor Name</option>
          <option value="Contact Info">Contact Info</option>
          <option value="Contact Person">Contact Person</option>
          <option value="Tax ID">Tax ID</option>
          <option value="Lead Time">Lead Time</option>
          <option value="MOQ">MOQ</option>
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
      <div className="grid grid-cols-7 grid-rows-auto bg-white rounded">
        {labels.map((label, index) => (
          <p key={index} className="text-center border-2 p-1 font-bold">
            {label}
          </p>
        ))}
        {dataOrFiltered === "data" && edit === false
          ? vendors.map((item) => (
              <>
                {labels.map((label, i) => (
                  <p
                    key={i}
                    className={
                      deleteItem
                        ? "text-center border-2 p-1 overflow-hidden overflow-x-scroll cursor-trashcan"
                        : "text-center border-2 p-1 overflow-hidden overflow-x-scroll"
                    }
                    onClick={deleteItem ? () => handleDelete(item) : undefined}
                  >
                    {item[labelToFieldMappingTwo[label]]}
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
                      deleteItem
                        ? "text-center border-2 p-1 overflow-hidden overflow-x-scroll cursor-trashcan"
                        : "text-center border-2 p-1 overflow-hidden overflow-x-scroll"
                    }
                    onClick={deleteItem ? () => handleDelete(item) : undefined}
                  >
                    {item[labelToFieldMappingTwo[label]]}
                  </p>
                ))}
              </>
            ))
          : dataOrFiltered === "data" && edit
          ? vendors.map((item) => (
              <>
                {labels.map((label, i) => (
                  <input
                    type="text"
                    key={i}
                    placeholder={`${item[labelToFieldMappingTwo[label]]}`}
                    className="text-center border-2 p-1 overflow-hidden overflow-x-scroll border-gray-600"
                    onChange={(e) =>
                      collectEditedVendors(
                        e,
                        item._id,
                        labelToFieldMappingTwo[label]
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
                    placeholder={`${item[labelToFieldMappingTwo[label]]}`}
                    className="text-center border-2 p-1 overflow-hidden overflow-x-scroll border-gray-600"
                    onChange={(e) =>
                      collectEditedVendors(
                        e,
                        item._id,
                        labelToFieldMappingTwo[label]
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
                {label === "Vendor ID" ? (
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

export default Vendors;
