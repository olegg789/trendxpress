import React, {useEffect, useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Avatar,
    Button, Div,
    FixedLayout,
    Group,
    Header,
    PanelHeader,
    Placeholder,
    Separator,
    SimpleCell
} from "@vkontakte/vkui";
import {Icon28ShoppingCartOutline} from "@vkontakte/icons";
import {set} from "../../reducers/mainReducer";
import declOfNum from "../../components/declOfNum";

function Cart({router, isDesktop, storage, dispatch, checkCart, setCount, count}) {

    const [price, setPrice] = useState(0)
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))

    function openInfo(data) {
        dispatch(set({key: 'infoProductCart', value: data}))
        router.toPanel('infoProductCart')
    }

    function calc() {
        if (JSON.parse(localStorage.getItem('cart')).length !== 0) {
            const count = JSON.parse(localStorage.getItem('cart')).length - 1
            let res = 0
            for (let i=0;i<=count;i++) {
                res = res + Number(JSON.parse(localStorage.getItem('cart'))[i].price)
            }
            setPrice(res)
        }
    }

    useEffect(() => {
        calc()
    }, [])

    return(
        <>
            <PanelHeader separator={storage.isDesktop}>Корзина</PanelHeader>
            <Group>
                {cart.length === 0 || count === 0 ?
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

                        {JSON.parse(localStorage.getItem('cart')).map((el) => {
                        return(
                        <>
                        <SimpleCell
                            before={
                                <Avatar size={75} mode='image' src={el.url}/>
                            }
                            after={<span className='count_cart'>{el.price}₽</span>}
                            style={{marginBottom: 5}}
                            onClick={() => {
                                openInfo(el)
                            }}
                        >
                            {el.name}
                        </SimpleCell>
                        </>
                        )
                    })}
                        <Div>
                            <Button
                                mode='secondary'
                                onClick={() => {
                                    setCart([])
                                    localStorage.setItem('cart', "[]")
                                    setCount(0)
                                }
                                }
                                size='m'
                            >
                                Очистить корзину
                            </Button>
                        </Div>

                        <FixedLayout vertical='bottom' filled>
                            <Separator wide/>
                            <Header mode='secondary'>Итого</Header>
                            <SimpleCell
                                disabled
                                after={
                                    <span className='count_cart'>
                                        {JSON.parse(localStorage.getItem('cart')).length} {declOfNum(JSON.parse(localStorage.getItem('cart')).length, ["товар", "товара", "товаров"])}
                                    </span>
                                }
                            >
                                {price}₽
                            </SimpleCell>
                            <Div>
                                <Button
                                    size='l'
                                    stretched
                                    onClick={() => {
                                        dispatch(set({key: 'price', value: price}))
                                        router.toPanel('newOrder')
                                    }}
                                >
                                    Перейти к оформлению
                                </Button>
                            </Div>
                        </FixedLayout>
                    </>
                }
            </Group>
        </>
    )
}

export default withRouter(Cart)