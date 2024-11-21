import React from "react";
import { Tooltip } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { users } from "./data";
import { useMemo } from "react";
import "./reg.css";
import DateDisplay from "./DateDisplay.jsx";
import Clock from "./Clock.jsx";

{
  /* <AdminSideBar></AdminSideBar>(); */
}

function AdminReg() {
  // //PopOutButton
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [backdrop, setBackdrop] = React.useState("opaque");

  const backdrops = ["opaque"];

  // const handleOpen = (backdrop) => {
  //   setBackdrop(backdrop);
  //   onOpen();
  // };

  //Table
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    // Sort users by id in descending order to show the latest entry first
    const sortedUsers = [...users].sort((a, b) => b.id - a.id);

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedUsers.slice(start, end);
  }, [page, users]);

  const [selectedKey, setSelectedKey] = React.useState(null);

  const handleSelectionChange = (key) => {
    setSelectedKey(key);
    console.log("Selected row:", key); // Logs the currently selected row key
  };

  return (
    <div className="p-2">
      <div className="top flex items-center mx-3">
        <h1 className="flex items-center scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl mb-2 mr-4">
          <img
            src="/registration.png"
            alt="Registration icon"
            color="#ffc683"
            className="mr-2 size-14"
          />
          Admin Registration
        </h1>
        <div className="ml-auto pr-3">
          <Clock className="top-right-clock" />
        </div>
      </div>

      <hr className="m-2 border-2 border-gray-300 " />

      {/* ////////////////////////////////////////////// */}

      <div
        className="searchBarAndCheckInBtn flex align items-center "
        style={{ margin: "-20px", marginLeft: "20px" }}
      >
        <DateDisplay />

        {/* PopOutButton */}
        <div
          className="flex ml-auto flex-wrap gap-4 mb-10 justify-center sm:gap-3 md:gap-4 "
          style={{ marginRight: "40px" }}
        >
          {backdrops.map((b) => (
            <Tooltip
              key={b}
              placement={"top-end"}
              content={
                <div className="px-1 py-2">
                  {/* <div className="text-small font-bold">Register</div> */}
                  <div className="text-tiny">Click to Register</div>
                </div>
              }
            >
              {/* <Button
                key={b}
                variant="flat"
                color="warning"
                // onPress={() => handleOpen(b)}
                className="capitalize px-4 py-2  md:text-base w-[200px] h-[50px] font-serif "
              >
                Register
              </Button> */}
            </Tooltip>
          ))}
        </div>
      </div>

      {/* ///////////////////////////////////////////////////////// */}

      {/* Table */}
      <Table
        aria-label="Example table with single selection"
        onSelectionChange={handleSelectionChange} // Set the handler here
        selectionMode="single" // Enable single selection only
        showSelectionCheckboxes // Shows a checkbox for selecting a single row // Sets the color for the selected row
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={setPage} // Just pass setPage directly
            />
          </div>
        }
        classNames={{
          wrapper: "h-[621px]", // Fixed height for the table wrapper
        }}
      >
        <TableHeader>
          <TableColumn className="font-serif text-lg" key="id" width="5%">
            NO.
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="date" width="8%">
            DATE
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="name" width="15%">
            NAME
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="gender" width="8%">
            GENDER
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="yl" width="9%">
            YEAR LEVEL
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="course" width="20%">
            COURSE
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="purpose" width="20%">
            PURPOSE
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="ti" width="15%">
            TIME-IN
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="to" width="1%">
            TIME-OUT
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow
              key={item.id}
              data-selected={selectedKey === item.id ? "true" : undefined}
              onClick={() => setSelectedKey(item.id)}
              style={{ height: "40px" }}
              className={`cursor-pointer text-xl capitalize  ${
                selectedKey === item.id
                  ? "table-row-selected"
                  : "table-row-hover"
              }`}
            >
              {(columnKey) => (
                <TableCell key={columnKey} className="p-2.5 m-0 text-sm ">
                  {columnKey === "to" ? "-" : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminReg;
