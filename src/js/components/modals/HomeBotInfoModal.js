import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';
import {
    Avatar,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    IOS, SimpleCell, Div, Card, Button, Header
} from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel } from '@vkontakte/icons'

function OrderInfo({ nav, router, storage, dispatch }) {
    const platform = useSelector((state) => state.main.platform)

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
                    Товары в заказе
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <Div>
                <Card>
                    <SimpleCell disabled>
                        <span className='name'>
                            Получатель: {storage.orderInfo.recipient}
                        </span>
                    </SimpleCell>
                    <SimpleCell disabled style={{marginTop: -20}}>
                        <span className='name'>
                            Телефон: {storage.orderInfo.phone}
                        </span>
                    </SimpleCell>
                    <SimpleCell disabled style={{marginTop: -20}}>
                        <span className='name'>
                            Адрес: {storage.orderInfo.address}
                        </span>
                    </SimpleCell>
                    <SimpleCell disabled style={{marginTop: -20}}>
                        <span className='name'>
                            Почта: {storage.orderInfo.email}
                        </span>
                    </SimpleCell>
                    {storage.orderInfo.comment &&
                    <SimpleCell disabled style={{marginTop: -20}}>
                        <span className='name'>
                            Комментарий: {storage.orderInfo.comment}
                        </span>
                    </SimpleCell>
                    }
                    <Div style={{marginTop: -15}}>
                        <Button
                            mode='secondary'
                            stretched
                            size='m'
                            href={`https://vk.me/club212830043`}
                            target='_blank'
                        >
                            Написать продавцу
                        </Button>
                    </Div>
                </Card>
            </Div>
            <Header
                mode='secondary'
                aside={'Сумма: ' + storage.orderInfo.amount + ' ₽'}
                className='header'
            >
                Товары в заказе
            </Header>
            <div style={{marginBottom: 15, marginTop: 10}}>
                {storage.orderInfo.items.map((el) => {
                    return (
                        <SimpleCell
                            before={
                                <Avatar size={75} mode='image' src={el.url}/>
                            }
                            after={<span className='count_cart'>{el.price * el.count} ₽</span>}
                            style={{marginBottom: 5}}
                            disabled
                        >
                            <span className='name' style={{marginRight: 5}}>{el.name}</span> <br/>
                            <span className='count_cart'>Количество: {el.count}</span>
                        </SimpleCell>
                    )
                })
                }
            </div>
            <div style={{height: 15}}/>
        </ModalPage>
    );
}

export default withRouter(OrderInfo);