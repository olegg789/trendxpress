import React, {useEffect, useState} from 'react';
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
    PanelHeader,
    PanelHeaderBack,
    Group,
    Gallery,
    Div,
    Headline,
    Title,
    Separator,
    FixedLayout,
    Button, ButtonGroup, Alert, SimpleCell, FormItem, Avatar,
} from "@vkontakte/vkui";
import {
    Icon28CheckCircleOutline,
    Icon28DeleteOutline,
    Icon28EditOutline
} from "@vkontakte/icons";
import api from "../../components/apiFunc";
import bridge from "@vkontakte/vk-bridge";
import {set} from "../../reducers/mainReducer";

function InfoProduct({
     router,
     storage,
     declOfNum,
     dispatch,
     count,
     setCount,
     openSnackbarCart,
     admin,
     openSnackbar,
    getMarket,
    setCart,
    albums,
    showNotifies
}) {
    const [album, setAlbum] = useState({name: ''})
    // eslint-disable-next-line
    const [price, setPrice] = useState(0)

    function findAlbum() {
        if (storage.infoProduct.album_ids !== null) {
            for (let i=0;i<=albums.length;i++) {
                if (albums[i].id === Number(storage.infoProduct.album_ids)) {
                    setAlbum(albums[i])
                    return
                }
            }
        }
    }

    useEffect(() => {
        findAlbum()
    }, [])

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
        calc()
        showNotifies()
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
            let res = await api(`admin/items/${storage.infoProduct.id}`, 'DELETE')
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

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return(
        <>
            <PanelHeader
                separator={storage.isDesktop}
                left={<PanelHeaderBack onClick={() => {router.toBack(); getMarket()}}/>}
            >
                Товар
            </PanelHeader>

            <Group>
                <div style={ storage.isDesktop ? {marginBottom: 60} : {marginBottom: 120}}>
                    <Gallery>
                        <img
                            src={storage.infoProduct.url}

                            alt=''
                            style={{cursor: 'default', borderRadius: storage.isDesktop ? 10 : 0}}
                            onClick={() => bridge.send("VKWebAppShowImages", {images: [storage.infoProduct.url]})}
                        />
                    </Gallery>

                    <Div>
                        <Headline weight='regular' style={{fontSize: 20, lineHeight: 1.2}}>
                            {storage.infoProduct.name}
                        </Headline>
                        <Headline weight='medium' style={{fontSize: 20, marginTop: 10}}>
                            {storage.infoProduct.price} ₽
                        </Headline>
                    </Div>

                    <Separator/>

                    {storage.infoProduct.album_ids !== null &&
                    <>
                        <FormItem top='Подборка'>
                            <SimpleCell
                                style={{marginTop: -5, marginBottom: -5}}
                                onClick={() => {
                                    dispatch(set({key: 'albumId', value: album.id}))
                                    router.toPanel('album')
                                }
                                }
                            >
                                {album.name}
                            </SimpleCell>
                        </FormItem>

                        <Separator/>
                    </>
                    }

                    <Div style={{whiteSpace: 'pre-line'}}>
                        {storage.infoProduct.description}
                    </Div>

                    <Div style={{whiteSpace: 'pre-line'}}>
                        <Title
                            level={3}
                        >
                            Отзывы
                        </Title>
                    </Div>

                    {storage.reviews.map((el,key) => <SimpleCell
                        disabled
                        key={key}
                        before={<Avatar
                            src={el.avatar}
                        />}
                        multiline
                        expandable
                        description={el.comment}
                    >
                        {el.name}, {"⭐️".repeat(el.stars)}
                    </SimpleCell>)}

                    <Div>
                        <Button
                            stretched
                            onClick={() => router.toPanel("addUserReview")}
                            mode={"secondary"}
                            size={"l"}
                        >
                            Оставить отзыв
                        </Button>
                    </Div>
                </div>

                <FixedLayout vertical='bottom' filled className={storage.isDesktop ? 'fixedLayoutCart': ''}>
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