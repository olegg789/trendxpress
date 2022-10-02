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
    HorizontalScroll,
    HorizontalCell,
    Avatar
} from "@vkontakte/vkui";
import {Icon24SortOutline, Icon28ShieldKeyholeOutline, Icon28UserStarBadgeOutline} from "@vkontakte/icons";
import {useDispatch} from "react-redux";
import {set} from "../../reducers/mainReducer";
import {InfScroll} from "@vkma/infscroll";
import api from "../../components/apiFunc";

function Market({
                    router,
                    products,
                    setMarket, admin, getUserReviews, getMarket, storage, loading, setLoading, albums}) {
    const dispatch = useDispatch()

    const [need, setNeed] = useState(true)
    const [result, setResult] = useState(true)

    function openInfo(data) {
        dispatch(set({key: 'infoProduct', value: data}))
        router.toPanel(storage.isDesktop ? 'infoProductDesktop' : 'infoProduct')
    }

    useEffect(() => {
        if (!storage.reviews) {
            getUserReviews()
        }
    }, [])

    const search = useDebounce(async (query) => {
        if (query.length === 0) {
            getMarket(null)
            setNeed(true)
            return
        }
        let res = await api(`items?query=${query}&sortBy=0`, 'GET')
        if (res.response) {
            if (res.items.length === 0) {
                setResult(false)
            } else {
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
                <InfScroll
                    onReachEnd={() => {
                        need && getMarket(products.length)
                    }}
                    loader={need ? <Spinner size="regular" style={{height: 60}}/> : null}
                >
                    <Group>
                    <Search
                        value={storage.search}
                        onChange={(e) => {
                            dispatch(set({key: 'search', value: e.currentTarget.value}))
                            search(e.currentTarget.value.replace(/^\s+/g, ''))
                            setNeed(false)
                        }}
                    />

                    {!storage.search &&
                        <>
                            <Header>Подборки</Header>
                            <HorizontalScroll showArrows={true} style={{marginTop: 5}}>
                                <div style={{display: 'flex'}}>
                                    {albums.map((el, index) => {
                                        return (
                                            <HorizontalCell
                                                size="l"
                                                header={
                                                el.name.length > 30 ?
                                                    <span className='albumName'>{el.name.slice(0, 30) + '...'}</span> :
                                                    <span className='albumName'>{el.name}</span>
                                            }
                                                onClick={() => {
                                                    dispatch(set({key: 'albumId', value: el.id}))
                                                    router.toPanel('album')
                                                }}
                                                key={index}
                                                className={'album'}
                                            >
                                                <Avatar size={128} src={el.url} mode='image'/>
                                            </HorizontalCell>
                                        )
                                    })}
                                </div>
                            </HorizontalScroll>
                        </>

                        }

                        {!storage.search &&
                            <Header
                                aside={
                                    <Icon24SortOutline
                                        onClick={() => router.toModal('sort')}
                                        className='sortIcon'
                                    />
                                }
                            >
                                Популярные товары
                            </Header>
                        }

                        {result ?
                            <CardGrid size='l' className='products'>
                                {products.map((el, index) => {
                                  return (
                                      <ContentCard
                                          onClick={() => openInfo(el)}
                                          src={el.url}
                                          header={<b>{el.price} ₽</b>}
                                          text={el.name.length > 50 ? el.name.slice(0, 50) + '...' : el.name}
                                      />
                                  )
                                })}
                            </CardGrid> :
                            <Placeholder>
                                Ничего не найдено
                            </Placeholder>
                        }
                    </Group>
                </InfScroll> :
                <Spinner/>
            }
        </>
    )
}

export default withRouter(Market)