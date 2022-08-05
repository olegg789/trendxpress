import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';
import {
    Avatar,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    IOS,
    SimpleCell,
    Div,
    Card,
    Header,
    Button,
} from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel } from '@vkontakte/icons'

function OrderInfoAdmin({ nav, router, storage, dispatch }) {
    const platform = useSelector((state) => state.main.platform)

    console.log(storage.orderInfoAdmin)
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
                    Информация о заказе
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <Div>
                <Card>
                    <SimpleCell disabled>
                        <span className='name'>
                            Получатель: {storage.orderInfoAdmin.recipient}
                        </span>
                    </SimpleCell>
                    <SimpleCell disabled style={{marginTop: -20}}>
                        <span className='name'>
                            Телефон: {storage.orderInfoAdmin.phone}
                        </span>
                    </SimpleCell>
                    <SimpleCell disabled style={{marginTop: -20}}>
                        <span className='name'>
                            Адрес: {storage.orderInfoAdmin.address}
                        </span>
                    </SimpleCell>
                    <SimpleCell disabled style={{marginTop: -20}}>
                        <span className='name'>
                            Почта: {storage.orderInfoAdmin.email}
                        </span>
                    </SimpleCell>
                    {storage.orderInfoAdmin.comment && storage.orderInfoAdmin.comment.length !== 0 &&
                    <SimpleCell disabled style={{marginTop: -20}}>
                        <span className='name'>
                            Комментарий: {storage.orderInfoAdmin.comment}
                        </span>
                    </SimpleCell>
                    }
                    <Div style={{marginTop: -15}}>
                        <Button
                            mode='secondary'
                            stretched
                            size='m'
                            href={`https://vk.me/id${storage.orderInfoAdmin.user_id}`}
                            target='_blank'
                        >
                            Написать заказчику
                        </Button>
                    </Div>
                </Card>
            </Div>
            <Header
                mode='secondary'
                aside={'Сумма: ' + storage.orderInfoAdmin.amount + ' ₽'}
                className='header'
            >
                Товары в заказе
            </Header>
            <div style={{marginBottom: 10, marginTop: 10}}>
                {storage.orderInfoAdmin.items.map((el) => {
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
            <div style={{height: 10}}/>
        </ModalPage>
    );
}

export default withRouter(OrderInfoAdmin);