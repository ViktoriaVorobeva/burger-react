import propTypes from 'prop-types';

export const ingridientPropTypes = propTypes.shape({
    _id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    proteins: propTypes.number.isRequired,
    fat: propTypes.number.isRequired,
    carbohydrates: propTypes.number.isRequired,
    calories: propTypes.number.isRequired,
    price: propTypes.number.isRequired,
    image: propTypes.string.isRequired,
    image_mobile: propTypes.string.isRequired,
    mage_large: propTypes.string.isRequired
  });