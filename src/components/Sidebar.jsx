
import { useState } from "react";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconUserCog,
} from "@tabler/icons-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
// import {Listbox, ListboxItem} from "@nextui-org/react";
import { MailIcon } from "./MailIcon.jsx";
import { LockIcon } from "./LockIcon.jsx";
import PropTypes from 'prop-types';


import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";

function Sidebar({ onSelectPage }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isRegistrationOpen, setRegistrationOpen] = useState(false);
  const [isLibraryOpen, setLibraryOpen] = useState(false);
  const [isAccountOpen, setAccountOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Library");
  // const [isGeneralOpen, setGeneralOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleSelectPage = (page) => {
    setSelectedPage(page);
    onSelectPage(page);
  };

  Sidebar.propTypes = {
    onSelectPage: PropTypes.func.isRequired,
  };
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      

      {!collapsed && (
        <div className="library-logo">
          <img src="/LibrarySystemLogo.png" alt="Library logo" />
        </div>
      )}

      {!collapsed && (
        <div className="logo">
          <img className="logo-pic" src="/BSC_logo.png" alt="College logo" />
        </div>
      )}

    <div className="buttons">
      <Button
        onClick={() => handleSelectPage("Library")}
        className={`functions ${selectedPage === "Library" ? "active" : ""} mb-6`}
        key="library"  // Add a key to force re-render when changing pages
      >
        <img src="/library.png" alt="Library icon" />
        {!collapsed && <div className= "components mr-7">Library</div>}
      </Button>


        <Button
          onClick={() => handleSelectPage("Registration")}
          className={`functions ${selectedPage === "Registration" ? "active" : ""} mb-6`}
        >
          <img src="/registration.png" alt="Registration icon" />
          {!collapsed && <div className="components">Registration</div>}
        </Button>

        <Button
          onClick={() => handleSelectPage("About")}
          className={`functions ${selectedPage === "About" ? "active" : ""} mb-6`}
        >
          <img src="/info.png" alt="About icon" />
          {!collapsed && <div className="components mr-7">About</div>}
        </Button>

        <Button
          onClick={() => handleSelectPage("Help")}
          className={`functions ${selectedPage === "Help" ? "active" : ""} mb-6`}
        >
          <img src="/help.png" alt="Help icon" />
          {!collapsed && <div className="components mr-8">Help</div>}
        </Button>

        <Popover showArrow backdrop="transparent" placement="right" className="mt-10">
          <PopoverTrigger>
            <Button>
              <IconUserCog size={30} color="#ffc683"/>
              <div className="mr-7">Admin</div>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid grid-cols-1 space-y-1 p-2">
              <h3 className="text-small font-bold mb-1">Log in as a?</h3>
              <Button
                className="p-1 text-sm"
                onPress={() => setRegistrationOpen(true)}
              >
                GIP/JO
              </Button>
              <Button
                className="p-1 text-sm"
                onPress={() => setLibraryOpen(true)}
              >
                Library Aide
              </Button>
              <Button
                className="p-1 text-sm"
                onPress={() => setAccountOpen(true)}
              >
                President/Librarian
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Modals */}
        <Modal
          isOpen={isRegistrationOpen}
          onOpenChange={setRegistrationOpen}
          backdrop="opaque"
          size="1xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Log in as a GIP/JO:
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Username"
                    placeholder="Enter your Username"
                    variant="bordered"
                  />
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Log in
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isLibraryOpen}
          onOpenChange={setLibraryOpen}
          backdrop="opaque"
          size="1xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Log in as a Library Aide:
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Username"
                    placeholder="Enter your Username"
                    variant="bordered"
                  />
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Log in
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isAccountOpen}
          onOpenChange={setAccountOpen}
          backdrop="opaque"
          size="1xl" 
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Log in as a President/Librarian:
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Username"
                    placeholder="Enter your Username"
                    variant="bordered"
                  />
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Log in
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* <Button
          onPress={() => onSelectPage("AdminReg")}
          className="functions"
        >
          temp admin btn
        </Button> */}
      </div>
    </div>
  );
}

export default Sidebar;
