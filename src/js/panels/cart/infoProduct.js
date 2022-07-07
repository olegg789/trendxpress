import React from 'react';
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
    PanelHeader,
    PanelHeaderBack,
    Group,
    Gallery,
    Div,
    Headline,
    Separator,
    FixedLayout,
    Button,
} from "@vkontakte/vkui";
import {set} from "../../reducers/mainReducer";

function InfoProductCart({ router, openSnackbarCart,  storage, declOfNum, dispatch }) {

    function addToCart(data) {
        let res = JSON.parse(localStorage.getItem('cart'))
        console.log(res)
        if (res.length !== 0) {
            let items = res
            items.unshift(data)
            items = JSON.stringify(items)
            localStorage.setItem('cart', items)
            console.log(storage.cart)
        }
        else {
            let items = []
            items.unshift(data)
            items = JSON.stringify(items)
            localStorage.setItem('cart', items)
            console.log(localStorage.getItem('cart'))
        }
        openSnackbarCart()
    }

    return(
        <>
            <PanelHeader 
                separator={false}
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                Товар
            </PanelHeader>

            <Group>
                <Gallery

                >
                    <img src={storage.infoProductCart.url} alt=''/>
                </Gallery>

                <Div style={{marginTop: 15}}>
                    <Headline weight='regular' style={{fontSize: 20}}>
                        {storage.infoProductCart.name}
                    </Headline>
                    <Headline weight='medium' style={{fontSize: 20, marginTop: 10}}>
                        {storage.infoProductCart.price}₽
                    </Headline>
                </Div>

                <Separator/>

                <Div style={{whiteSpace: 'pre-line'}}>
                    {storage.infoProductCart.description}
                </Div>

                <FixedLayout vertical='bottom' filled>
                    <Div>
                        <Button
                            size='l'
                            stretched
                            onClick={() => addToCart(storage.infoProductCart)}
                        >
                            Добавить в корзину
                        </Button>
                    </Div>
                </FixedLayout>
            </Group>
        </>
    )
}

export default withRouter(InfoProductCart);