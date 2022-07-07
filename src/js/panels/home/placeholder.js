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
import {Icon28CheckCircleOutline} from "@vkontakte/icons";

function InfoProduct({ router, storage, declOfNum, dispatch, count, setCount, openSnackbarCart }) {

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
                separator={false}
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                Товар
            </PanelHeader>

            <Group>
                <Gallery
                >
                    <img src={storage.infoProduct.url} alt=''/>
                </Gallery>

                <Div style={{marginTop: 15}}>
                    <Headline weight='regular' style={{fontSize: 20}}>
                        {storage.infoProduct.name}
                    </Headline>
                    <Headline weight='medium' style={{fontSize: 20, marginTop: 10}}>
                        {storage.infoProduct.price}₽
                    </Headline>
                </Div>

                <Separator/>

                <Div style={{whiteSpace: 'pre-line'}}>
                    {storage.infoProduct.description}
                </Div>

                <FixedLayout vertical='bottom' filled>
                    <Div>
                        <Button
                            size='l'
                            stretched
                            onClick={() => addToCart(storage.infoProduct)}
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