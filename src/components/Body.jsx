import PropTypes from 'prop-types';
function Body({ children }) {
  return (
    <div className="body">
      {children}
    </div>
  );
}

Body.propTypes = {
  children: PropTypes.func.isRequired,
};
export default Body;
