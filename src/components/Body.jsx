
import PropTypes from "prop-types";


function Body({ children }) {
  return <div className="body">{children}</div>;
}

Body.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Body;
