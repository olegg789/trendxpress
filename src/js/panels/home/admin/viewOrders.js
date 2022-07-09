import React, {useEffect} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    FormItem,
    Group,
    IconButton,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    SimpleCell
} from "@vkontakte/vkui";
import {
    Icon28EditOutline,
    Icon28LinkCircleOutline
} from "@vkontakte/icons";
import {set} from "../../../reducers/mainReducer";
import {useSelector} from "react-redux";

function ViewOrders({router, dispatch, getOrders, orders}) {
    const storage = useSelector((state) => state.main)

    const statuses = [
        'На модерации',
        "В работе",
        "Нет на складе",
        "Отправлен",
        "Доставлен"
    ]

    function openInfo(data) {
        dispatch(set({key: 'orderInfoAdmin', value: data}))
        router.toModal('orderInfoAdmin')
    }

    function editStatus(data) {
        dispatch(set({key: 'orderStatus', value: data}))
        router.toModal('editStatus')
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <>
            <PanelHeader
                left={
                    <PanelHeaderBack onClick={() => router.toBack()}/>
                }
                separator={storage.isDesktop}
            >
                Управление заказами
            </PanelHeader>
            <Group>
                {orders.length === 0 ?
                <Placeholder header='Заказов ещё нет'/> :
                    orders.map((el) => {
                        const date = new Date(el.timestamp*1000).toLocaleString('ru', {
                            year: 'numeric',
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
                                    after={
                                        <>
                                            <IconButton
                                                icon={<Icon28EditOutline/>}
                                                onClick={() => editStatus(el)}
                                            />
                                            <IconButton
                                            onClick={() => openInfo(el)}
                                            icon={<Icon28LinkCircleOutline/>}
                                        />
                                        </>

                                    }
                                >
                                    Заказ №{el.id} <br/>
                                    Товаров в заказе: {el.items.length} <br/>
                                    Сумма: {el.amount}₽
                                </SimpleCell>
                            </FormItem>
                        )
                    })
                }
            </Group>
        </>
    )
}

export default withRouter(ViewOrders)