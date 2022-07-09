import React, {useCallback, useRef, useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    CardGrid,
    Group,
    PanelHeader,
    PanelHeaderButton,
    Placeholder,
    Search,
    Spinner,
    ContentCard
} from "@vkontakte/vkui";
import {Icon28UserStarBadgeOutline} from "@vkontakte/icons";
import {useDispatch} from "react-redux";
import {set} from "../../reducers/mainReducer";
import {InfScroll} from "@vkma/infscroll";
import api from "../../components/apiFunc";

function Market({router, products, setMarket, admin, getMarket, storage, loading}) {
    const dispatch = useDispatch()

    const [need, setNeed] = useState(true)
    const [result, setResult] = useState(true)

    function openInfo(data) {
        dispatch(set({key: 'infoProduct', value: data}))
        router.toPanel('infoProduct')
    }

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
            left={admin &&
                <PanelHeaderButton onClick={() => router.toPanel('admin')}>
                    <Icon28UserStarBadgeOutline/>
                </PanelHeaderButton>
            }
            separator={storage.isDesktop}
        >
            Товары
        </PanelHeader>
        <Group>
            {products.length > 0 || !loading ?
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
                                        header={el.price + '₽'}
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

            </> :
                <Spinner style={{marginTop: 10}}/>
            }
        </Group>
        </>
    )
}

export default withRouter(Market)