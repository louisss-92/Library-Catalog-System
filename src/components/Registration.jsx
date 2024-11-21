import { useEffect, useState, useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { CalendarIcon } from "./ui/CalendarIcon";
import { TimeInput } from "@nextui-org/react";
import { ClockCircleLinearIcon } from "./ui/ClockCircleLinearIcon";
import { Time } from "@internationalized/date";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { genders, yearlevels, courses } from "./data.js";
import { DateInput } from "@nextui-org/react";
import "./reg.css";
import DateDisplay from "./DateDisplay.jsx";
import Clock from "./Clock.jsx";

function Registration() {
  // State to hold the fetched data
  const [items, setItems] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8; // Set rows per page
  const pages = Math.ceil(items.length / rowsPerPage); // Calculate the number of pages based on items

  // State for modal form inputs
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [course, setCourse] = useState("");
  const [purpose, setPurpose] = useState("");
  const [eventDate, setEventDate] = useState(new CalendarDate(2024, 4, 4)); // Default date
  const [eventTime, setEventTime] = useState(new Time(11, 45)); // Default time

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/API/attendance.php");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setItems(result); // Assuming result is an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle selection change
  const handleSelectionChange = (key) => {
    setSelectedKey(key);
    console.log("Selected row:", key); // Logs the currently selected row key
  };

  // Table items for current page
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return items.slice(start, end);
  }, [page, items]);

  // PopOutButton
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");

  const backdrops = ["opaque"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  // Handle form submission
  const handleSubmit = async () => {
    const now = new Date();
    const currentTime = now.toTimeString().split(" ")[0];
    const currentDate = now.toISOString().split("T")[0];

    const data = {
      Name: name,
      Gender: gender,
      Age: parseInt(age, 10),
      Dept: course,
      TimeIn: currentTime,
      TimeOut: currentTime,
      Date: currentDate,
      YearLevel: parseInt(yearLevel, 10),
    };

    console.log("Data to be submitted:", data);

    try {
      const response = await fetch("http://localhost/API/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onClose();
      setName("");
      setGender("");
      setAge("");
      setYearLevel("");
      setCourse("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
          Registration
        </h1>
        <div className="ml-auto pr-3">
          <Clock className="top-right-clock" />
        </div>
      </div>

      <hr className="m-2 border-2 border-gray-300 " />

      {/* Search Bar and Check-In Button */}
      <div
        className="searchBarAndCheckInBtn flex align items-center"
        style={{ margin: "-20px", marginLeft: "20px" }}
      >
        <DateDisplay />

        {/* PopOutButton */}
        <div
          className="flex ml-auto flex-wrap gap-4 mb-10 justify-center sm:gap-3 md:gap-4"
          style={{ marginRight: "40px" }}
        >
          {backdrops.map((b) => (
            <Tooltip
              key={b}
              placement={"top-end"}
              content={
                <div className="px-1 py-2">
                  <div className="text-tiny">Click to Register</div>
                </div>
              }
            >
              <Button
                variant="flat"
                color="warning"
                onPress={() => handleOpen(b)}
                className="capitalize px-4 py-2 md:text-base w-[200px] h-[50px] font-serif"
              >
                Register
              </Button>
            </Tooltip>
          ))}
        </div>

        <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalContent className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <>
              <ModalHeader className="text-2xl font-semibold">
                <img
                  src="/registration.png"
                  alt="Registration icon"
                  color="#ffc683"
                  className="mr-2 size-8"
                />
                Register
              </ModalHeader>
              <ModalBody className="space-y-6">
                {/* Date and Time Section */}
                <div>
                  <h2 className="text-lg font-medium mb-2">Date and Time</h2>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <DateInput
                      label="Date"
                      value={eventDate}
                      onChange={setEventDate}
                      placeholderValue={new CalendarDate(1995, 11, 6)}
                      labelPlacement="outside"
                      className="w-full md:w-1/2"
                      endContent={
                        <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                    <TimeInput
                      label="Event Time"
                      value={eventTime}
                      onChange={setEventTime}
                      labelPlacement="outside"
                      className="w-full md:w-1/2"
                      endContent={
                        <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  </div>
                </div>

                <hr
                  className="border-2 border-gray-300"
                  style={{ marginTop: "3px" }}
                />

                {/* Registration Details Section */}
                <div style={{ marginTop: "10px" }}>
                  <h2 className="text-lg font-medium mb-2">
                    Personal Information
                  </h2>

                  {/* Name */}
                  <Input
                    isRequired
                    type="text"
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4"
                  />

                  {/* Age Field */}
                  <Input
                    isRequired
                    type="number" // Set input type to number
                    label="Age"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full mb-4"
                  />

                  {/* Gender and Year Level */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Gender */}
                    <Select
                      isRequired
                      label="Gender"
                      placeholder="Select gender"
                      value={gender}
                      onChange={(value) => setGender(value)} // Directly setting only the selected value
                      className="w-full"
                    >
                      {genders.map((gender) => (
                        <SelectItem key={gender.key} value={gender.label}>
                          {gender.label}
                        </SelectItem>
                      ))}
                    </Select>

                    {/* Year Level */}
                    <Select
                      isRequired
                      label="Year Level"
                      placeholder="Select year level"
                      value={yearLevel}
                      onChange={(value) => setYearLevel(value)} // Directly setting only the selected value
                      className="w-full"
                    >
                      {yearlevels.map((yearlevel) => (
                        <SelectItem key={yearlevel.key} value={yearlevel.label}>
                          {yearlevel.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  {/* Course */}
                  <Select
                    isRequired
                    label="Course"
                    placeholder="Select course"
                    value={course}
                    onChange={(value) => setCourse(value)} // Directly setting only the selected value
                    className="w-full mb-4"
                  >
                    {courses.map((course) => (
                      <SelectItem key={course.key} value={course.label}>
                        {course.label}
                      </SelectItem>
                    ))}
                  </Select>

                  {/* Purpose */}
                  <Input
                    isRequired
                    type="text"
                    label="Purpose"
                    placeholder="What is your purpose..."
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full"
                  />
                </div>
              </ModalBody>

              <ModalFooter className="flex justify-end space-x-3">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Save
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </div>

      {/* Table */}
      <Table
        aria-label="Example table with single selection"
        onSelectionChange={handleSelectionChange}
        selectionMode="single"
        showSelectionCheckboxes
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        }
        classNames={{
          wrapper: "h-[621px]",
        }}
      >
        <TableHeader>
          <TableColumn
            className="font-serif text-lg"
            key="AttendeeID"
            width="5%"
          >
            NO.
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="Date" width="8%">
            DATE
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="Name" width="15%">
            NAME
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="Gender" width="8%">
            GENDER
          </TableColumn>
          <TableColumn
            className="font-serif text-lg"
            key="YearLevel"
            width="9%"
          >
            YEAR LEVEL
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="Dept" width="20%">
            DEPARTMENT
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="Purpose" width="20%">
            PURPOSE
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="TimeIn" width="15%">
            TIME-IN
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="TimeOut" width="1%">
            TIME-OUT
          </TableColumn>
        </TableHeader>
        <TableBody items={paginatedItems}>
          {(item) => (
            <TableRow
              key={item.AttendeeID}
              data-selected={
                selectedKey === item.AttendeeID ? "true" : undefined
              }
              onClick={() => setSelectedKey(item.AttendeeID)}
              style={{ height: "40px" }}
              className={`cursor-pointer text-xl capitalize ${
                selectedKey === item.AttendeeID
                  ? "table-row-selected"
                  : "table-row-hover"
              }`}
            >
              {(columnKey) => (
                <TableCell key={columnKey} className="p-2.5 m-0 text-sm ">
                  {columnKey === "TimeOut" ? (
                    <button
                      className="border-red-400 border-1 m rounded-lg cursor-pointer p-1 bg-red-200 hover:bg-red-300 fixed"
                      style={{ marginTop: "-20px" }}
                    >
                      Time Out
                    </button>
                  ) : (
                    item[columnKey] // Access the property directly from the item
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Registration;
