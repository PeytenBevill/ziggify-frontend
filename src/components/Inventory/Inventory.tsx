import { useState } from "react";

export const Inventory: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<keyof DataItem | "">("");
  const [dataOrFiltered, setDataOrFiltered] = useState("data");
  const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);
  const [edit, setEdit] = useState(false);
  const [editForm, setEditForm] = useState(0);
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

  type DataItem = {
    ID: number;
    Name: string;
    Category: string;
    UPC: string;
    Cost: number;
    Price: number;
    Discount: number;
    Qty: number;
    "Re-order": number;
    "RO Amount": number;
    SKU: string;
    Vendor: string;
    "Seller ID": string;
    Date: string;
    Status: string;
  };

  const data: DataItem[] = [
    {
      ID: 1,
      Name: "Product A",
      Category: "Electronics",
      UPC: "123456789101112131415161718",
      Cost: 20.5,
      Price: 29.99,
      Discount: 0.1,
      Qty: 50,
      "Re-order": 20,
      "RO Amount": 500,
      SKU: "SKU123",
      Vendor: "Vendor X",
      "Seller ID": "S123",
      Date: "2022-02-13",
      Status: "In Stock",
    },
    {
      ID: 2,
      Name: "Product B",
      Category: "Clothing",
      UPC: "987654321",
      Cost: 15.75,
      Price: 24.99,
      Discount: 0.15,
      Qty: 30,
      "Re-order": 15,
      "RO Amount": 375,
      SKU: "SKU456",
      Vendor: "Vendor Y",
      "Seller ID": "S456",
      Date: "2022-02-13",
      Status: "Discount",
    },
    {
      ID: 3,
      Name: "Product C",
      Category: "Home & Garden",
      UPC: "123555555",
      Cost: 30.0,
      Price: 49.99,
      Discount: 0.2,
      Qty: 25,
      "Re-order": 25,
      "RO Amount": 750,
      SKU: "SKU789",
      Vendor: "Vendor Z",
      "Seller ID": "S789",
      Date: "2022-02-13",
      Status: "Re-Order",
    },
  ];

  const handleSearch = () => {
    if (!searchType) {
      window.alert("You must select a filter before searching");
      return;
    }

    const tempFilteredItems = data.filter((item) => {
      const value = item[searchType as keyof DataItem];

      if (typeof value === "string" && typeof search === "string") {
        // If both value and search are strings, perform case-insensitive comparison
        return value.toLowerCase().includes(search.toLowerCase());
      } else if (typeof value === "number" && typeof search === "string") {
        // If both value and search are numbers, perform numeric comparison
        let strValue = value.toString();
        return strValue.includes(search);
      }

      // If types don't match or are invalid, return false
      return window.alert("An error occurred or nothing was found");
    });

    // Set the filtered items
    setFilteredItems(tempFilteredItems);
    setDataOrFiltered("filtered");
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    window.alert("Your changes have been saved");
    setEdit(false);
    setEditForm(0);
  };

  const addOneRow = () => {
    setEditForm((currCount) => currCount + 1);
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
        <div className="flex flex-row ml-96">
          <button
            className={
              edit
                ? "mr-10 p-2 bg-pieChartFour text-white rounded-lg border-2 border-pieBorderFour pl-4 pr-4"
                : "mr-10 p-2 bg-pieChartOne text-white rounded-lg border-2 border-pieBorderOne pl-4 pr-4"
            }
            onClick={handleEdit}
          >
            Edit +
          </button>
          <button
            className="p-2 pl-4 pr-4 bg-pieChartOne text-white rounded-lg border-2 border-pieBorderOne"
            onClick={handleSave}
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
          ? data.map((item) => (
              <>
                {labels.map((label, i) => (
                  <p
                    key={i}
                    className={
                      label === "Status"
                        ? item[label as keyof DataItem] === "In Stock"
                          ? "text-center border-2 p-1 text-pieChartTwo"
                          : item[label as keyof DataItem] === "Re-Order"
                          ? "text-center border-2 p-1 text-red-500"
                          : item[label as keyof DataItem] === "Discount"
                          ? "text-center border-2 p-1 text-iconColorFour"
                          : item[label as keyof DataItem] === "Out of Stock"
                          ? "text-center border-2 p-1 text-gray-500"
                          : item[label as keyof DataItem] === "Incomplete"
                          ? "text-center border-2 p-1 text-pieChartThree"
                          : ""
                        : "text-center border-2 p-1 overflow-hidden overflow-x-scroll"
                    }
                  >
                    {item[label as keyof DataItem]}
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
                        ? item[label as keyof DataItem] === "In Stock"
                          ? "text-center border-2 p-1 text-pieChartTwo"
                          : item[label as keyof DataItem] === "Re-Order"
                          ? "text-center border-2 p-1 text-red-500"
                          : item[label as keyof DataItem] === "Discount"
                          ? "text-center border-2 p-1 text-iconColorFour"
                          : item[label as keyof DataItem] === "Out of Stock"
                          ? "text-center border-2 p-1 text-gray-500"
                          : item[label as keyof DataItem] === "Incomplete"
                          ? "text-center border-2 p-1 text-pieChartThree"
                          : ""
                        : "text-center border-2 p-1 overflow-hidden overflow-x-scroll"
                    }
                  >
                    {item[label as keyof DataItem]}
                  </p>
                ))}
              </>
            ))
          : dataOrFiltered === "data" && edit
          ? data.map((item) => (
              <>
                {labels.map((label, i) => (
                  <input
                    type="text"
                    key={i}
                    value={`${item[label as keyof DataItem]}`}
                    className="text-center border-2 p-1 overflow-hidden overflow-x-scroll border-gray-600"
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
                    value={`${item[label as keyof DataItem]}`}
                    className="text-center border-2 p-1 overflow-hidden overflow-x-scroll border-gray-600"
                  />
                ))}
              </>
            ))}
        {editForm > 0 && (
          <>
            {Array.from({ length: editForm }).map((_) => (
              <>
                {labels.map((label, i) => (
                  <input
                    type="text"
                    key={i}
                    placeholder={label}
                    className="text-center border-2 p-1 overflow-hidden overflow-x-scroll border-gray-600"
                  />
                ))}
              </>
            ))}
          </>
        )}
      </div>
      {edit && (
        <button
          className="bg-pieChartOne text-white rounded-full h-16 w-16 text-2xl mt-4 border-2 border-transparent hover:bg-blue-400 hover:border-blue-600 text-center"
          onClick={addOneRow}
        >
          +
        </button>
      )}
    </div>
  );
};
