import {useState} from 'react'

const Vendors: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<keyof DataItem | "">("");
  const [dataOrFiltered, setDataOrFiltered] = useState("data");
  const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);
  const [edit, setEdit] = useState(false);
  const [editForm, setEditForm] = useState(0);
  const labels = [
    "Vendor ID",
    "Vendor Name",
    "Contact Info",
    "Contact Person",
    "Tax ID",
    "Lead Time",
    "MOQ",
  ];

  type DataItem = {
    'Vendor ID': string;
    'Vendor Name': string;
    'Contact Info': string;
    'Contact Person': string;
    'Tax ID': string;
    'Lead Time': number;
    MOQ: number;
  };

  const data: DataItem[] = [
    {
      "Vendor ID": "V1",
      "Vendor Name": "Vendor A",
      "Contact Info": "123-456-7890",
      "Contact Person": "John Doe",
      "Tax ID": "TAX123",
      "Lead Time": 7,
      "MOQ": 50,
    },
    {
      "Vendor ID": "V2",
      "Vendor Name": "Vendor B",
      "Contact Info": "987-654-3210",
      "Contact Person": "Jane Smith",
      "Tax ID": "TAX456",
      "Lead Time": 10,
      "MOQ": 100,
    },
    {
      "Vendor ID": "V3",
      "Vendor Name": "Vendor C",
      "Contact Info": "555-123-7890",
      "Contact Person": "Bob Johnson",
      "Tax ID": "TAX789",
      "Lead Time": 5,
      "MOQ": 75,
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
      <div className="grid grid-cols-7 grid-rows-auto bg-white rounded">
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
                    className= "text-center border-2 p-1 overflow-hidden overflow-x-scroll"
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
                    className="text-center border-2 p-1 overflow-hidden overflow-x-scroll"
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
}

export default Vendors