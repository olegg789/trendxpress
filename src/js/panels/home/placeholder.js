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

function InfoProduct({ router, storage, declOfNum, dispatch }) {

    function addToCart(data) {
        let res = localStorage.getItem('cart')
        let cart = JSON.parse(res)
        if (cart !== null) {
            let items = cart
            items.unshift(data)
            items = JSON.stringify(items)
            localStorage.setItem('cart', items)
            dispatch(set({key: 'cart', value: items}))
        }
        else {
            let items = []
            items.unshift(data)
            items = JSON.stringify(items)
            localStorage.setItem('cart', items)
            dispatch(set({key: 'cart', value: items}))
        }


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
                    showArrows={storage.infoProduct.photo.length > 1}
                >
                    {storage.infoProduct.photo.map((el) => {
                        return(
                            <img src={el} alt=''/>
                        )
                    })}
                </Gallery>

                <Div style={{marginTop: 15}}>
                    <Headline weight='regular' style={{fontSize: 20}}>
                        {storage.infoProduct.name}
                    </Headline>
                    <Headline weight='medium' style={{fontSize: 20, marginTop: 10}}>
                        {storage.infoProduct.price}  {declOfNum(storage.infoProduct.price, ['рубль', "рубля", "рублей"])}
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