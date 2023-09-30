import React from "react";
import Modal from "../Modal/Modal";
import ingridientsDetailsStyles from "./ingridients-details.module.css";
import propTypes from 'prop-types';
import {ingridientPropTypes} from '../../utils/proptypes';

function IngridientsDetails({ ingridient, getClose, isOpen }) {
  return (
    <>
      {ingridient && (
        <Modal title="true" getClose={getClose} isOpen={isOpen}>
          <div className={ingridientsDetailsStyles.card}>
            <div className="mb-4">
              <img
                className={ingridientsDetailsStyles.image}
                src={ingridient.image}
                alt={ingridient.name}
              />
            </div>
            <p className="text text_type_main-medium mb-8">{ingridient.name}</p>
            <dl className={ingridientsDetailsStyles.container}>
              <div className={ingridientsDetailsStyles.wrapper}>
                <dt>
                  <p className="text text_type_main-small text_color_inactive">
                    Калории,ккал
                  </p>
                </dt>
                <dd className={ingridientsDetailsStyles.description}>
                  <p className="text text_type_main-small text_color_inactive">
                    {ingridient.calories}
                  </p>
                </dd>
              </div>
              <div className={ingridientsDetailsStyles.wrapper}>
                <dt>
                  <p className="text text_type_main-small text_color_inactive">
                    Белки, г
                  </p>
                </dt>
                <dd className={ingridientsDetailsStyles.description}>
                  <p className="text text_type_main-small text_color_inactive">
                    {ingridient.proteins}
                  </p>
                </dd>
              </div>
              <div className={ingridientsDetailsStyles.wrapper}>
                <dt>
                  <p className="text text_type_main-small text_color_inactive">
                    Жиры, г
                  </p>
                </dt>
                <dd className={ingridientsDetailsStyles.description}>
                  <p className="text text_type_main-small text_color_inactive">
                    {ingridient.fat}
                  </p>
                </dd>
              </div>
              <div className={ingridientsDetailsStyles.wrapper}>
                <dt>
                  <p className="text text_type_main-small text_color_inactive">
                    Углеводы, г
                  </p>
                </dt>
                <dd className={ingridientsDetailsStyles.description}>
                  <p className="text text_type_main-small text_color_inactive">
                    {ingridient.carbohydrates}
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </Modal>
      )}
    </>
  );
}

IngridientsDetails.propTypes = {
  ingridient: ingridientPropTypes,
  getClose: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired
};

export default IngridientsDetails;
