import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    FormItem,
    IconButton,
    Placeholder,
    SimpleCell
} from "@vkontakte/vkui";
import {
    Icon28CubeBoxOutline, Icon28InfoCircleOutline,
} from "@vkontakte/icons";
import {set} from "../../reducers/mainReducer";

function OrdersList({router, orders, dispatch, getOrders}) {

    const statuses = [
        'На модерации',
        "В работе",
        "Нет на складе",
        "Отправлен",
        "Доставлен"
    ]

    function openInfo(data) {
        dispatch(set({key: 'orderInfo', value: data.items}))
        router.toModal('orderInfo')
    }

    return (
        <>
            {orders.length === 0 ?
            <Placeholder
                icon={<Icon28CubeBoxOutline width={56} height={56}/>}
            >
                Здесь ещё нет заказов
            </Placeholder> :
                orders.map((el) => {
                    const date = new Date(el.timestamp*1000).toLocaleString('ru', {
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    });
                    return(
                        <FormItem top={'Заказ от ' + date} bottom={'Статус: ' + statuses[el.status]}>
                            <SimpleCell
                                style={{marginTop: -10, marginBottom: -10}}
                                disabled
                                after={<IconButton onClick={() => openInfo(el)} icon={<Icon28InfoCircleOutline/>}/> }
                            >
                                Товаров в заказе: {el.items.length} <br/>
                                Сумма: <b>{el.amount} ₽</b>
                            </SimpleCell>
                        </FormItem>
                    )
                })
            }
        </>
    )
}

export default withRouter(OrdersList)