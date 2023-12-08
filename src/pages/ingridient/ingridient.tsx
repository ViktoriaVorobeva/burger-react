import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from '../../types/hooks';
import ingridientsDetailsStyles from "./ingridient.module.css";
import { TIngridient } from "../../types/ingridient";

function findIngridient(ingridients: TIngridient[], id: string | undefined) {
  return ingridients.find((el) => el._id === id);
}

export function IngridientPage() {
  const { ingridients } = useSelector(
    (state) => state.ingridients
  );
  let { id } = useParams();
  const ingridient = findIngridient(ingridients, id);

  return (
    <>
      {ingridient && (
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
      )}
    </>
  );
}
