import { Button, Image, Divider } from "@nextui-org/react";
import PropTypes from "prop-types";

const RecommendationCard = ({ book, onOpen }) => {
  return (
    <Button
      onPress={() => onOpen(book)}
      className="flex flex-row items-center bg-gray-100 p-20 rounded-lg shadow-lg"
    >
      <div>
        <Image
          src={book.img}
          alt="Book cover"
          className="rounded-lg object-cover min-w-20"
          width={120}
          height={120}
        />
      </div>
      <div className="text-center space-y-1 mt-2 ml-[40px]">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">{book.title}</h3>
        <p className="text-xs text-gray-600">{book.author}</p>
        <div className="flex h-5 items-center space-x-4 text-small">
          <Divider orientation="vertical" />
          <div>{book.genre}</div>
          <Divider orientation="vertical" />
          {/* <div>Docs</div>
          <div>Source</div> */}
        </div>
      </div>
    </Button>
  );
};

// Prop validation
RecommendationCard.propTypes = {
  book: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default RecommendationCard;
