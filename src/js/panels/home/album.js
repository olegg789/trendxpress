import React, {useCallback, useEffect, useRef, useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    CardGrid,
    ContentCard,
    Group,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    Search,
    Spinner
} from "@vkontakte/vkui";
import {set} from "../../reducers/mainReducer";
import {InfScroll} from "@vkma/infscroll";
import api from "../../components/apiFunc";
import {useDispatch} from "react-redux";

function Album({router, storage}) {
    const dispatch = useDispatch()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    async function getMarket(offset) {
        try {
            if (!offset) {
                let res = await api(`items?album_id=${storage.albumId}`, 'GET')
                if (res.response) {
                    setProducts(res.items)
                }
            }
            else {
                let res = await api(`items?offset=${offset}&limit=20&album_id=${storage.albumId}`, 'GET')
                if (res.response) {
                    let items = products
                    items.reverse()
                    // eslint-disable-next-line
                    res.items.map((el) => {
                        items.unshift(el)
                    })
                    setProducts(items.reverse())
                }
            }
            setLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    function yes() {
        console.log(1)
    }

    const [need, setNeed] = useState(true)
    const [result, setResult] = useState(true)

    function openInfo(data) {
        dispatch(set({key: 'infoProduct', value: data}))
        router.toPanel('infoProduct')
    }

    const search = useDebounce(async (query) => {
        if (query.length === 0) {
            getMarket(0)
            setNeed(true)
            return
        }
        let res = await api(`items?query=${query}&album_id=${storage.albumId}`, 'GET')
        if (res.response) {
            if (res.items.length === 0) {
                setResult(false)
            }
            else {
                setResult(true)
                setProducts(res.items)
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

    useEffect(() => {
        getMarket()
    }, [])

    return(
        <>
        <PanelHeader
            left={
                <PanelHeaderBack onClick={() => router.toBack()}/>
            }
        >
            Подборка
        </PanelHeader>
        <Group>
            {loading ?
                <Spinner/> :
                products.length > 0 ?
                <>
                    <Search
                        value={storage.search}
                        onChange={(e) => {
                            dispatch(set({key: 'search', value: e.currentTarget.value}))
                            search(e.currentTarget.value.replace(/^\s+/g, ''))
                            setNeed(false)
                        }}
                        style={{marginBottom: 10}}
                    />
                        <InfScroll
                            onReachEnd={() => {need && getMarket(products.length)}}
                            loader={need ? <Spinner size="regular" style={{ height: 60 }}/> : null}
                        >
                            <CardGrid size='l' className='products'>
                                {products.map((el) => {
                                    return (
                                        <ContentCard
                                            onClick={() => openInfo(el)}
                                            src={el.url}
                                            header={el.price + ' ₽'}
                                            text={el.name}
                                            maxHeight={300}
                                        />
                                    )
                                })}
                            </CardGrid>
                        </InfScroll>
                </> :
                <Placeholder>Ничего не найдено</Placeholder>}
        </Group>
        </>
    )
}

export default withRouter(Album)