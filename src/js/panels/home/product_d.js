import React, {useEffect, useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Alert,
    Avatar, Button, ButtonGroup,
    Group, Header,
    Headline, Link,
    PanelHeader,
    PanelHeaderBack,
    Separator,
    SimpleCell
} from "@vkontakte/vkui";
import {set} from "../../reducers/mainReducer";
import {
    Icon28CheckCircleOutline,
    Icon28DeleteOutline,
    Icon28EditOutline,
    Icon28LinkOutline
} from "@vkontakte/icons";
import api from "../../components/apiFunc";

function ProductDesktop(
    {
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
    }
) {
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
        findAlbum()
    }, [])


    return (
        <>
            <PanelHeader
                separator={storage.isDesktop}
                left={<PanelHeaderBack onClick={() => {router.toBack(); getMarket()}}/>}
            >
                Товар
            </PanelHeader>
            <Group>
                <div className='infoProductDesktop'>
                    <img
                        src={storage.infoProduct.url}
                        height={300}
                        width={300}
                        alt=''
                        style={{borderRadius: 10}}
                    />
                    <div>
                        <Headline weight='regular' style={{fontSize: 20, lineHeight: 1.2}}>
                            {storage.infoProduct.name}
                        </Headline>
                        <Headline weight='medium' style={{fontSize: 20, marginTop: 10}}>
                            {storage.infoProduct.price} ₽
                        </Headline>

                        <Separator style={{marginTop: 10, marginBottom: 10}} wide/>

                        <div style={{whiteSpace: 'pre-line'}}>
                            {storage.infoProduct.description.length > 100 ?
                                <>
                                {storage.infoProduct.description.slice(0, 100)}...
                                    <br/>
                                    <Link
                                        onClick={() => {
                                            dispatch(set({key: 'description', value: storage.infoProduct.description}));
                                            router.toModal('description')
                                        }}
                                    >
                                        Показать полностью
                                    </Link>
                                </>
                                :
                                storage.infoProduct.description}
                        </div>

                        <Separator style={{marginTop: 10}} wide/>

                        {storage.infoProduct.album_ids !== null &&
                            <SimpleCell
                                className='productAlbum'
                                onClick={() => {
                                    dispatch(set({key: 'albumId', value: album.id}))
                                    router.toPanel('album')
                                }
                                }
                                after={<Icon28LinkOutline width={24} height={24}/>}
                            >
                                <span className='productAlbum__children'>{album.name}</span>
                            </SimpleCell>
                        }
                    </div>
                </div>

                {admin  &&
                    <ButtonGroup
                        mode='horizontal'
                        gap='m'
                        stretched
                        style={{marginBottom: 10, marginTop: 5}}
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
                    </ButtonGroup>
                }

                <Button
                    size='l'
                    stretched
                    onClick={() => addToCart(storage.infoProduct)}
                >
                    Добавить в корзину
                </Button>

                <div>
                    <Header
                        aside={
                        <Link
                            onClick={() => router.toPanel("addUserReview")}
                        >Оставить отзыв</Link>
                        }
                    >
                        Отзывы
                    </Header>
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
                </div>
            </Group>
        </>
    )
}

export default withRouter(ProductDesktop)