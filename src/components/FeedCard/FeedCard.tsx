import { FC } from 'react';
import { useSelector } from '../../services/hooks';
import styles from './feed-card.module.css';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrderProps } from '../../services/types'; 
import { dateFormat, dateWhen } from '../../utils/date';

function inNotUndefined<T>(item: T | undefined): item is T {
    return item !== undefined
}

export const FeedCard: FC<TOrderProps> = ({ order }) => {

    const location = useLocation();

    const ingredients = useSelector((store) => store.ingridients.ingridients);
    const orderIngredientsForImage = ingredients.filter((ingredient) => order.ingredients.includes(ingredient._id))
    const orderIngredientsForTotal =
        order.ingredients.map(id => {
            return ingredients.find(item => item._id === id);
        }).filter(inNotUndefined);
    const totalOrderPrice = orderIngredientsForTotal.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
    );

    const when = dateWhen(new Date(order.createdAt))

    return (
        <article className={`${styles.item} pt-6 pr-6 pb-6 pl-6`}>
           <Link to={ location.pathname === '/feed'  ? `/feed/${order._id}` : `/profile/orders/${order._id}`} 
                state={{ backgroundLocation: location }}
                className={styles.link}>
                <div className={styles.order}>
                    <p className="text text_type_digits-default">{order.number}</p>
                    <p className="text text_type_main-default text_color_inactive">
                        {`${when}, ${dateFormat(order.createdAt)}`}
                    </p>
                </div>
                <p className={`${styles.text} text text_type_main-medium`}>{order.name}</p>
                <div className={styles.order_info}>
                    <ul className={styles.list}>
                        {orderIngredientsForImage
                            .slice(0, 6)
                            .map((item) =>
                                <li className={styles.list_item} key={item._id}>
                                    <img className={styles.list_image} src={item.image_mobile} alt={item.name} /></li>
                            )}
                    </ul>
                    <div className={`${styles.price} mt-1 mb-2`}>
                        <p className="text text_type_digits-default">{totalOrderPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link>
        </article >
    )
}
