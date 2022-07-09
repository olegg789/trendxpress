import React, {useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Button, Div, IOS, ModalPage, ModalPageHeader, PanelHeaderButton, Radio} from "@vkontakte/vkui";
import {Icon24Cancel, Icon24Dismiss, Icon28CheckCircleOutline} from "@vkontakte/icons";
import {useSelector} from "react-redux";
import api from "../apiFunc";

function EditStatus({router, storage, nav, getOrders, getOrdersAdmin, openSnackbar}) {
    const platform = useSelector((state) => state.main.platform)

    const [status, setStatus] = useState(storage.orderStatus.status)

    const statuses = [
        {id: 0, label: 'На модерации'},
        {id: 1, label: 'В работе'},
        {id: 2, label: 'Нет на складе'},
        {id: 3, label: 'Отправлен'},
        {id: 4, label: 'Доставлен'}
    ]

    async function changeStatus() {
        try {
            let res = await api(
                `admin/orders/${storage.orderStatus.id}/${status}`,
                'PATCH'
            )
            if (res.response) {
                console.log('Статус изменен')
                router.toModal()
                getOrders()
                getOrdersAdmin()
                openSnackbar('Статус заказа изменён!', <Icon28CheckCircleOutline className='snack_suc'/>)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <ModalPage
            nav={nav}
            header={
                <ModalPageHeader
                    left={platform === 'android' &&
                    <PanelHeaderButton onClick={() => router.toBack()}>
                        <Icon24Cancel/>
                    </PanelHeaderButton>
                    }

                    right={platform === IOS &&
                    <PanelHeaderButton onClick={() => router.toBack()}>
                        <Icon24Dismiss/>
                    </PanelHeaderButton>
                    }
                >
                    Изменить статус
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <Div>
                {statuses.map((el) => {
                    return (
                        <Radio
                            value={el.id}
                            defaultChecked={el.id === storage.orderStatus.status}
                            onChange={(e) => setStatus(e.currentTarget.value)}
                            name='status'
                        >
                            {el.label}
                        </Radio>
                    )
                })}
            </Div>
            <Div>
                <Button
                    size='l'
                    stretched
                    onClick={() => changeStatus()}
                >
                    Сохранить
                </Button>
            </Div>
        </ModalPage>
    )
}

export default withRouter(EditStatus)