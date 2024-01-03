import React, { useEffect, useState } from "react";
import appStyles from "./feed.module.css";
import Modal from "../../components/Modal/Modal";
import { useDispatch, useSelector } from "../../services/hooks";
import OrderFeed from "../../components/OrderFeed/OrderFeed";
import { FeedOrders } from "../../components/FeedOrders/FeedOrders";
import { wsConnectionClosed, wsConnectionStart } from "../../services/actions";

function FeedPage() {
  const dispatch = useDispatch();
  // const [showOrderModal, setShowOrderModal] = useState<boolean>(false);

  // const openOrderModal = () => {
  //   setShowOrderModal(true);
  // };

  // const closeOrderModal = () => {
  //   setShowOrderModal(false);
  // };

  const { isLoading, errors } = useSelector((state) => state.ingridients);

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);
  return (
    <>
      <div>
        {isLoading && "Загрузка..."}
        {errors && "Произошла ошибка"}
        {!isLoading && !errors && (
          <>
            <main className="container">
              <div className={appStyles.main_wrapper}>
                <OrderFeed />
                <FeedOrders />
              </div>
            </main>
          </>
        )}
      </div>
      {/* {showOrderModal && <Modal onClose={closeOrderModal}></Modal>} */}
    </>
  );
}

export default FeedPage;
