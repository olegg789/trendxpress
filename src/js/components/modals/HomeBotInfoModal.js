import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';
import {
    Avatar,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    IOS, SimpleCell
} from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel } from '@vkontakte/icons'
import {set} from "../../reducers/mainReducer";

function OrderInfo({ nav, router, storage, dispatch }) {
    const platform = useSelector((state) => state.main.platform)

    function openInfo(data) {
        dispatch(set({key: 'infoProductOrder', value: data}))
        router.toModal()
        router.toPanel('infoProductOrder')
    }

    return (
        <ModalPage
            nav={nav}
            header={
                <ModalPageHeader
                    left={platform !== IOS && 
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
            <div style={{marginBottom: 15, marginTop: 10}}>
                {storage.orderInfo.map((el) => {
                    return (
                        <SimpleCell
                            before={
                                <Avatar size={75} mode='image' src={el.url}/>
                            }
                            after={<span className='count_cart'>{el.price}₽</span>}
                            style={{marginBottom: 5}}
                            onClick={() => openInfo(el)}
                        >
                            {el.name}
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