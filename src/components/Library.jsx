import './library.css';
import { SearchIcon } from "./SearchIcon.jsx";
import { useState, useRef } from "react";
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, Image, Divider } from "@nextui-org/react";
import axios from "axios";

function Library() {
  const [isRegistrationOpen, setRegistrationOpen] = useState(false);
  const [isBookOpen, setBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchInputRef = useRef(null);

  const fetchBooks = async () => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`
      );
      setSearchResults(response.data.docs || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalOpen = () => {
    setRegistrationOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const openBookModal = (book) => {
    setSelectedBook(book);
    setBookOpen(true);
  };

  return (
    <div className="p-2">
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl mb-2 mr-60">Library</h1>

        <Button onPress={handleModalOpen}>
          <SearchIcon size={18} />
          Tap to search....
        </Button>

        <Modal
          isOpen={isRegistrationOpen}
          onOpenChange={setRegistrationOpen}
          backdrop="opaque"
          size="3xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Search for Books</ModalHeader>
                <ModalBody>
                  <div>
                    {/* Search Input */}
                    <Input
                      ref={searchInputRef} // Attach the ref to the input field
                      classNames={{
                        base: "max-w-full sm:max-w-[10rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                      }}
                      placeholder="Type to search..."
                      size="sm"
                      startContent={<SearchIcon size={18} />}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          fetchBooks();
                        }
                      }}
                    />

                    {/* Persistent Search Button */}
                    <Button onPress={fetchBooks} className="mt-4" isLoading={loading}>
                      Search
                    </Button>

                    {/* Search Results */}
                    <div className="mt-4">
                      {searchResults.length > 0 ? (
                        searchResults.map((book) => (
                          <Card key={book.key} className="mb-4">
                            <CardHeader>
                              <Image
                                src={
                                  book.cover_i
                                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                                    : "placeholder.jpg"
                                }
                                alt={book.title}
                                width={50}
                                height={75}
                                className="mr-4"
                              />
                              <div>
                                <h4 className="text-lg font-bold">{book.title}</h4>
                                <p className="text-sm">{book.author_name?.join(", ")}</p>
                              </div>
                            </CardHeader>
                          </Card>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600">No results found.</p>
                      )}
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      {/* Category Content Section */}
      <h3 className="text-lg font-semibold mb-3">Categories</h3>
      <div className="category-content grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {["Adventure", "Horror", "Comedy", "Drama"].map((genre, index) => (
          <Card key={index} className="w-full h-[180px] relative">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-xs text-white/60 uppercase font-bold">What to watch</p>
              <h4 className="text-white font-medium text-sm">{genre}</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt={`${genre} genre`}
              className="z-0 w-full h-full object-cover"
              src="prof2.jpg" // Replace with actual image URLs
            />
          </Card>
        ))}
      </div>

      {/* Recommendations Section */}
      <h3 className="text-lg font-semibold mb-3">Recommendations</h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <Button
          key={index}
          onPress={() =>
            openBookModal({
              title: `Sample Book ${index + 1}`,
              author: `Sample Author ${index + 1}`,
              genre: "Adventure",
              description: "This is a sample book description.",
              img: "prof2.jpg",
            })
          }
          className="flex flex-row items-center bg-gray-100 p-20 rounded-lg shadow-lg"
        >
            <div>
              <Image src="prof2.jpg" alt="Book cover" className="rounded-lg object-cover min-w-20" width={120} height={120} />
            </div>
            <div className="text-center space-y-1 mt-2 ml-[40px]">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Sample Book {index + 1}</h3>
              <p className="text-xs text-gray-600">Sample Author</p>
              <div className="flex h-5 items-center space-x-4 text-small">
                <div>Adventure</div>
                <Divider orientation="vertical" />
                <div>Docs</div>
                <Divider orientation="vertical" />
                <div>Source</div>
              </div>
            </div>
          </Button>
        ))}
      </div>

      {/* Book Details Modal */}
      <Modal 
      isOpen={isBookOpen} onOpenChange={setBookOpen}
      backdrop="opaque"
          size="1xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{selectedBook?.title}</ModalHeader>
              <ModalBody>
                <Image src={selectedBook?.img} alt="Book cover" className="mb-4" />
                <p><strong>Author:</strong> {selectedBook?.author}</p>
                <p><strong>Genre:</strong> {selectedBook?.genre}</p>
                <p><strong>Description:</strong> {selectedBook?.description}</p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Library;