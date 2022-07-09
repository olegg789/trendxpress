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
    ButtonGroup,
    Alert,
} from "@vkontakte/vkui";
import {
    Icon28CheckCircleOutline,
    Icon28DeleteOutline,
    Icon28EditOutline
} from "@vkontakte/icons";
import api from "../../../components/apiFunc";
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

    function openAlert() {
        router.toPopout(
            <Alert
                actions={[
                    {
                        title: "Удалить",
                        mode: "destructive",
                        autoclose: true,
                        action: () => delItem(),
                    },
                    {
                        title: "Отмена",
                        autoclose: true,
                        mode: "cancel",
                    },
                ]}
                onClose={() => router.toPopout()}
                header="Подтверждение"
                text="Вы уверены, что хотите удалить этот товар?"
            />
        )
    }

    async function delItem() {
        try {
            let res = await api(`admin/items/${storage.infoProductOrderAdmin.id}`, 'DELETE')
            if (res.response) {
                router.toBack()
                router.toBack()
                getMarket()
                openSnackbar('Товар удалён!', <Icon28CheckCircleOutline className='snack_suc'/>)
            }
        }
        catch (err) {
            console.log(err)
        }
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
                            src={storage.infoProductOrderAdmin.url}
                            alt=''
                            style={{cursor: 'default'}}
                            onClick={() => bridge.send("VKWebAppShowImages", {images: [storage.infoProductOrderAdmin.url]})}
                        />
                    </Gallery>

                    <Div>
                        <Headline weight='regular' style={{fontSize: 20, lineHeight: 1.2}}>
                            {storage.infoProductOrderAdmin.name}
                        </Headline>
                        <Headline weight='medium' style={{fontSize: 20, marginTop: 10}}>
                            {storage.infoProductOrderAdmin.price}₽
                        </Headline>
                    </Div>

                    <Separator/>

                    <Div style={{whiteSpace: 'pre-line'}}>
                        {storage.infoProductOrderAdmin.description}
                    </Div>
                </div>

                <FixedLayout vertical='bottom' filled>
                    <Div>
                        {admin &&
                        <ButtonGroup
                            mode='horizontal'
                            gap='m'
                            stretched
                            style={{marginBottom: 10}}
                        >
                            <Button
                                size='l'
                                sizeY='compact'
                                stretched
                                appearance='negative'
                                before={<Icon28DeleteOutline/>}
                                mode='secondary'
                                className='del'
                                onClick={() => openAlert()}
                            >
                                Удалить
                            </Button>
                            <Button
                                size='l'
                                sizeY='compact'
                                stretched
                                appearance='accent'
                                mode='secondary'
                                before={<Icon28EditOutline/>}
                                className='edit'
                                onClick={() => router.toPanel('editItem')}
                            >
                                Изменить
                            </Button>
                        </ButtonGroup>}
                        <Button
                            size='l'
                            stretched
                            onClick={() => addToCart(storage.infoProductOrderAdmin)}
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