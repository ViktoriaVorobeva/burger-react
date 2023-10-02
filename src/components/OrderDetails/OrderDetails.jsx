import React from "react";
import ordersDetailsStyles from "./order-details.module.css";
import check from "../../images/check.svg";

function OrderDetails() {
  return (
    <div className={ordersDetailsStyles.order}>
      <p className="text text_type_digits-large mb-8">034536</p>
      <p className="text text_type_main-default mb-15">идентификатор заказа</p>
      <div className="mb-15">
        <img src={check} alt="ваш заказ оформлен" />
      </div>
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
