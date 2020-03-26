// Centralizing reused propTypes here to avoid repeating myself.
import PropTypes from "prop-types";

export const f1099Type = PropTypes.shape({
  id: PropTypes.number.isRequired,
  ein: PropTypes.string.isRequired,
  employer: PropTypes.string.isRequired,
  wages: PropTypes.number.isRequired,
  withheld: PropTypes.number.isRequired
});
