import React, {useEffect, useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Avatar, Button, Group, Header, PanelHeader, Placeholder, Separator, SimpleCell} from "@vkontakte/vkui";
import {Icon28ShoppingCartOutline} from "@vkontakte/icons";

function Cart({router, cart, isDesktop, storage}) {

    const [price, setPrice] = useState(0)

    function calc(data) {
        if (storage.cart === undefined || JSON.parse(storage.cart).length === 0) {
            let res = 0
            for (let i = 0; i <= JSON.parse(localStorage.getItem('cart')).length; i++) {
                res = res + JSON.parse(localStorage.getItem('cart'))[i].price
            }

            setPrice(res)
        } else {
            let res = 0
            for (let i = 0; i <= JSON.parse(storage.cart).length; i++) {
                res = res + JSON.parse(storage.cart)[i].price
            }

            setPrice(res)
        }
    }

    useEffect(() => {
        //calc()
    }, [])

    return(
        <>
            <PanelHeader>Корзина</PanelHeader>
            <Group>
                {(cart === null && storage.cart === undefined) ?
                    <Placeholder
                        header="Кажется, здесь ещё ничего нет!"
                        icon={<Icon28ShoppingCartOutline width={56} height={56}/>}
                        action={
                            <Button
                                size='l'
                                onClick={() => router.toView('home')}
                                mode='secondary'
                            >
                                За покупками
                            </Button>
                        }
                        className={!isDesktop && 'placeholder'}
                    >
                        Добавь нужные товары в корзину и возвращайся снова!
                    </Placeholder> :
                    <>
                        <Header>Ваша корзина</Header>
                        {storage.cart === undefined || JSON.parse(storage.cart).length === 0 ?
                        <>
                        {JSON.parse(localStorage.getItem('cart')).map((el) => {
                            return(
                                <>
                                <SimpleCell
                                    before={
                                        <Avatar size={48} mode='image' src={el.photo}/>
                                    }
                                    after={el.price}
                                    >
                                        {el.name}
                                </SimpleCell>
                                <Separator/>
                                </>
                            )
                        })}

                            <SimpleCell
                            >
                                К оплате
                            </SimpleCell>
                        </>
                        :
                        JSON.parse(storage.cart).map((el) => {
                        return(
                        <>
                        <SimpleCell
                            before={
                                <Avatar size={32} mode='image' src={el.photo}/>
                            }
                            after={el.price}
                        >
                            {el.name}
                        </SimpleCell>
                        <Separator/>
                        </>
                        )
                    })}
                    </>
                }
            </Group>
        </>
    )
}

export default withRouter(Cart)