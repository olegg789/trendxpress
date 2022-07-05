import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Avatar, Card, CardGrid,
    Div, Footer, FormItem, FormLayoutGroup,
    Group, Headline, HorizontalCell,
    PanelHeader,
    PanelHeaderButton,
    SimpleCell
} from "@vkontakte/vkui";
import {Icon28UserStarBadgeOutline} from "@vkontakte/icons";
import {useDispatch, useSelector} from "react-redux";
import {set} from "../../reducers/mainReducer";

function Market({router, products, declOfNum}) {
    const storage = useSelector((state) => state.main)
    const dispatch = useDispatch()

    function openInfo(data) {
        dispatch(set({key: 'infoProduct', value: data}))
        router.toPanel('infoProduct')
    }

    return (
        <>
        <PanelHeader
            left={
                <PanelHeaderButton>
                    <Icon28UserStarBadgeOutline/>
                </PanelHeaderButton>
            }
        >
            Товары
        </PanelHeader>
        <Group>
            <div className='products'>
                {products.map((el) => {
                    return(
                        <Div
                            onClick={() => openInfo(el)}
                            style={{marginLeft: 0, marginRight: 0}}
                        >
                            <div>
                                <Avatar
                                    size={150}
                                    src={el.photo}
                                    mode='image'
                                />
                            </div>
                            <Headline
                                weight='medium'
                                style={{marginBottom: 0, marginTop: 5}}
                            >
                                {el.price} {declOfNum(el.price, ["рубль", "рубля", "рублей"])}
                            </Headline>
                            <span className='test'>{el.name.length > 25 ? el.name.slice(0, 25) + '...' : el.name}</span>
                        </Div>
                    )
                })}
            </div>
            <Footer>
                Всего {products.length} {declOfNum(products.length, ["товар", "товара", "товаров"])}
            </Footer>
        </Group>
        </>
    )
}

export default withRouter(Market)