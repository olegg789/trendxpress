import React, {useEffect, useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Avatar,
    Div,
    Group,
    Headline,
    PanelHeader,
    PanelHeaderButton,
    Placeholder, Search, Spinner,
} from "@vkontakte/vkui";
import {Icon28UserStarBadgeOutline} from "@vkontakte/icons";
import {useDispatch} from "react-redux";
import {set} from "../../reducers/mainReducer";
import {InfScroll} from "@vkma/infscroll";
import api from "../../components/apiFunc";

function Market({router, products, setMarket, admin, getMarket, storage}) {
    const dispatch = useDispatch()

    const [need, setNeed] = useState(true)

    function openInfo(data) {
        dispatch(set({key: 'infoProduct', value: data}))
        router.toPanel('infoProduct')
    }

    async function search(query) {
        try {
            let res = await api(`items?query=${query}`, 'GET')
            if (res.response) {
                if (res.items.length === 0) {
                    return
                }
                setMarket(res.items)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMarket()
    }, [])

    return (
        <>
        <PanelHeader
            left={admin &&
                <PanelHeaderButton onClick={() => router.toPanel('admin')}>
                    <Icon28UserStarBadgeOutline/>
                </PanelHeaderButton>
            }
            separator={false}
        >
            Товары
        </PanelHeader>
        <Group>
            {products.length > 0 ?
            <>
            <Search
                onChange={(e) => {
                    if (e.currentTarget.value.length === 0) {
                        getMarket()
                        setNeed(true)
                        return
                    }
                    search(e.currentTarget.value)
                    setNeed(false)
                }}
            />

            <InfScroll
                onReachEnd={() => {need && getMarket(products.length)}}
                loader={need ? <Spinner size="regular" style={{ height: 60 }}/> : null}
            >
                <div className='products'>
                        {products.map((el) => {
                            return(
                                <Div
                                    onClick={() => openInfo(el)}
                                    style={{marginLeft: 0, marginRight: 0, cursor: 'pointer'}}
                                    className={storage.isDesktop ? 'product_web' : 'product'}
                                >
                                    <div>
                                        <Avatar
                                            size={150}
                                            src={el.url}
                                            mode='image'
                                        />
                                    </div>
                                    <Headline
                                        weight='medium'
                                        style={{marginBottom: 0, marginTop: 5}}
                                    >
                                        {el.price}₽
                                    </Headline>
                                    <span className='test'>{el.name.length > 20 ? el.name.slice(0, 20) + '...' : el.name}</span>
                                </Div>
                            )
                        })}

                </div>
            </InfScroll>
            </> :
                <Placeholder>
                    Пусто
                </Placeholder>
            }
        </Group>
        </>
    )
}

export default withRouter(Market)