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
} from "@vkontakte/vkui"
import bridge from "@vkontakte/vk-bridge";

function InfoProduct({
    router,
    storage,
    count,
    setCount,
    openSnackbarCart,
    admin,
    openSnackbar,
getMarket,
}) {

    function addToCart(data) {
        let res = JSON.parse(localStorage.getItem('cart'))
        setCount(count + 1)
        if (res.length !== 0) {
            let items = res
            items.unshift(data)
            items = JSON.stringify(items)
            localStorage.setItem('cart', items)
        }
        else {
            let items = []
            items.unshift(data)
            items = JSON.stringify(items)
            localStorage.setItem('cart', items)
        }
        openSnackbarCart()
    }

    return(
        <>
            <PanelHeader
                separator={storage.isDesktop}
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                Товар
            </PanelHeader>

            <Group>
                <div style={{marginBottom: 120}}>
                    <Gallery
                        style={{cursor: 'default'}}
                    >
                        <img
                            src={storage.infoProductCart.url}
                            alt=''
                            style={{cursor: 'default'}}
                            onClick={() => bridge.send("VKWebAppShowImages", {images: [storage.infoProductCart.url]})}
                        />
                    </Gallery>

                    <Div>
                        <Headline weight='regular' style={{fontSize: 20, lineHeight: 1.2}}>
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
                </div>

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

export default withRouter(InfoProduct);