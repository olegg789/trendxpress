import React, {useCallback, useEffect, useRef, useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    CardGrid,
    Group,
    PanelHeader,
    PanelHeaderButton,
    Placeholder,
    Search,
    Spinner,
    ContentCard,
    Header,
    Button
} from "@vkontakte/vkui";
import {Icon28ShieldKeyholeOutline, Icon28UserStarBadgeOutline} from "@vkontakte/icons";
import {useDispatch} from "react-redux";
import {set} from "../../reducers/mainReducer";
import {InfScroll} from "@vkma/infscroll";
import api from "../../components/apiFunc";
import declOfNum from "../../components/declOfNum";

function Market({router, products, setMarket, admin, getUserReviews, getMarket, storage, loading, setLoading, albums}) {
    const dispatch = useDispatch()

    const [need, setNeed] = useState(true)
    const [result, setResult] = useState(true)
    const [but, setBut] = useState(true)

    function openInfo(data) {
        dispatch(set({key: 'infoProduct', value: data}))
        router.toPanel('infoProduct')
    }

    useEffect(() => {
        if (!storage.reviews) {
            getUserReviews()
        }
    }, [])

    const search = useDebounce(async (query) => {
        if (query.length === 0) {
            getMarket()
            setNeed(true)
            return
        }
        let res = await api(`items?query=${query}`, 'GET')
        if (res.response) {
            if (res.items.length === 0) {
                setResult(false)
            }
            else {
                setResult(true)
                setMarket(res.items)
            }
        }
    }, 1000);

    function useDebounce(callback, delay) {
        const timer = useRef(null);
        const debouncedCallback = useCallback(
            (...args) => {
                if (timer.current) {
                    clearTimeout(timer.current);
                }
                timer.current = setTimeout(() => {
                    callback(...args);
                }, delay);
            },
            [callback, delay]
        );
        return debouncedCallback;
    }

    return (
        <>
        <PanelHeader
            left={
                <>
                    <PanelHeaderButton onClick={() => router.toPanel('about')}>
                        <Icon28ShieldKeyholeOutline/>
                    </PanelHeaderButton>
                    {admin &&
                    <PanelHeaderButton onClick={() => router.toPanel('admin')}>
                        <Icon28UserStarBadgeOutline/>
                    </PanelHeaderButton>}
                </>

            }
            separator={storage.isDesktop}
        >
            Товары
        </PanelHeader>
            {products.length > 0 || !loading ?
            <>
                {albums.length > 0 &&
                <Group separator={false} header={<Header>Подборки <span className='count_cart'>{albums.length}</span></Header> }>
                <CardGrid size='l' className='products'>
                    {but ?
                        <>
                        <ContentCard
                            src={albums[0].url}
                            text={albums[0].name}
                            caption={albums[0].count + ' ' + declOfNum(albums[0].count, ["товар", "товара", "товаров"])}
                            maxHeight={storage.isDesktop ? 150 : 75}
                            onClick={() => {
                                dispatch(set({key: 'albumId', value: albums[0].id}))
                                router.toPanel('album')
                            }
                            }
                        />
                        <ContentCard
                            src={albums[1].url}
                            text={albums[1].name}
                            caption={albums[1].count + ' ' + declOfNum(albums[1].count, ["товар", "товара", "товаров"])}
                            maxHeight={storage.isDesktop ? 150 : 75}
                            onClick={() => {
                                dispatch(set({key: 'albumId', value: albums[1].id}))
                                router.toPanel('album')
                            }
                            }
                        />
                        </>
                     :
                        albums.map((el) => {
                            return (
                                <ContentCard
                                    src={el.url}
                                    text={el.name}
                                    caption={el.count + ' ' + declOfNum(el.count, ["товар", "товара", "товаров"])}
                                    maxHeight={storage.isDesktop ? 150 : 75}
                                    onClick={() => {
                                        dispatch(set({key: 'albumId', value: el.id}))
                                        router.toPanel('album')
                                    }
                                    }
                                />
                            )
                        })}
                </CardGrid>
                <Button
                    mode='tertiary'
                    stretched
                    size='s'
                    style={{padding: 7}}
                    onClick={() => setBut(!but)}
                >
                    {but ? 'Показать все' : 'Свернуть'}
                </Button>
            </Group>}
            <Group header={<Header>Все товары</Header>} separator={false}>
            <Search
                value={storage.search}
                onChange={(e) => {
                    dispatch(set({key: 'search', value: e.currentTarget.value}))
                    search(e.currentTarget.value.replace(/^\s+/g, ''))
                    setNeed(false)
                }}
                style={{marginBottom: 10}}
            />
                {result ?
                    <InfScroll
                        onReachEnd={() => {need && getMarket(products.length)}}
                        loader={need ? <Spinner size="regular" style={{ height: 60 }}/> : null}
                    >
                        <CardGrid size='l' className='products'>
                            {products.map((el) => {
                                return(
                                    <ContentCard
                                        onClick={() => openInfo(el)}
                                        src={el.url}
                                        header={<b>{el.price} ₽</b>}
                                        text={el.name}
                                        maxHeight={300}
                                    />
                                )
                            })}

                        </CardGrid>
                    </InfScroll> :
                    <Placeholder>
                        Ничего не найдено
                    </Placeholder>
                }
                </Group>

            </> :
                <Spinner style={{marginTop: 10}}/>
            }
        </>
    )
}

export default withRouter(Market)