import  styles  from "./profile-menu.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "../../types/hooks";
import { getLogOut } from "../../services/registers/actions";

export const ProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(getLogOut());
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.list_wrapper}>
      <ul className={styles.list}>
        <li>
          <Link className={styles.link} to={"/profile"}>
            <p className="text text_type_main-medium">Профиль</p>
          </Link>
        </li>
        <li>
          <Link className={styles.link} to={"/profile/orders"}>
            <p className="text text_type_main-medium text_color_inactive">
              История заказов
            </p>
          </Link>
        </li>
        <li>
          <Link className={styles.link} onClick={logout} to={"/"}>
            <p className="text text_type_main-medium text_color_inactive">
              Выход
            </p>
          </Link>
        </li>
      </ul>
      <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете
      </p>
      {location.pathname === '/profile' ?
                <span className="text text_type_main-default text_color_inactive">изменить свои персональные данные</span>
                : <span className="text text_type_main-default text_color_inactive">просмотреть свою историю заказов</span>
            }
    </div>
  );
};
