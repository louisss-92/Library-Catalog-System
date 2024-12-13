import React, { useState } from "react";
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
import { Input, Select, SelectItem } from "@nextui-org/react";
import { genders } from "./data.js";
import "./reg.css";
import DateDisplay from "./ui/DateDisplay.jsx";
import Clock from "./ui/Clock.jsx";

function Registration() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 9;
  const pages = 5; // Static value for design purposes
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Mock data for the table
  const items = Array.from({ length: rowsPerPage * pages }, (_, index) => ({
    no: index + 1,
    username: `User ${index + 1}`,
    password: `pass${index + 1}`,
    level_of_access: index % 2 === 0 ? "Admin" : "User",
  }));

  const paginatedItems = items.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-2">
      {/* Header */}
      <div className="top flex items-center mx-3">
        <h1 className="flex items-center scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl mb-2 mr-4">
          <img
            src="/registration.png"
            alt="Registration icon"
            className="mr-2 size-14"
          />
          USER ADMIN
        </h1>
        <div className="ml-auto pr-3">
          <Clock className="top-right-clock" />
        </div>
      </div>

      <hr className="m-2 border-2 border-gray-300" />

      {/* Search Bar and Add Account Button */}
      <div
        className="searchBarAndCheckInBtn flex align items-center"
        style={{ marginLeft: "20px" }}
      >
        <DateDisplay />
        <div className="ml-auto flex gap-4">
          <Tooltip content="Click to Register">
            <Button
              variant="flat"
              color="warning"
              onPress={onOpen}
              className="capitalize px-4 py-2 w-[200px] h-[50px] font-serif"
            >
              ADD ACCOUNT
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Modal for Adding an Account */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalBody>
            <Input
              isRequired
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              isRequired
              label="Age"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Select
              label="Gender"
              placeholder="Select gender"
              value={gender}
              onChange={setGender}
            >
              {genders.map((gender) => (
                <SelectItem key={gender.key} value={gender.label}>
                  {gender.label}
                </SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Table */}
      <Table
        aria-label="Example table with actions"
        selectionMode="single"
        bottomContent={
          <div className="flex justify-center mt-4">
            <Pagination
              isCompact
              showControls
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
          <TableColumn className="font-serif text-lg" key="no" width="10%">
            NO.
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="username" width="30%">
            USERNAME
          </TableColumn>
          <TableColumn
            className="font-serif text-lg"
            key="password"
            width="25%"
          >
            PASSWORD
          </TableColumn>
          <TableColumn
            className="font-serif text-lg"
            key="level_of_access"
            width="20%"
          >
            LEVEL OF ACCESS
          </TableColumn>
          <TableColumn className="font-serif text-lg" key="actions" width="15%">
            ACTIONS
          </TableColumn>
        </TableHeader>
        <TableBody items={paginatedItems}>
          {(item) => (
            <TableRow key={item.no}>
              <TableCell>{item.no}</TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.password}</TableCell>
              <TableCell>{item.level_of_access}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  color="primary"
                  className="mr-2"
                  onPress={() => console.log("Edit item:", item.no)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onPress={() => console.log("Delete item:", item.no)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Registration;
