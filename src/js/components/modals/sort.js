import React, {} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Button, Div, IOS, ModalPage, ModalPageHeader, PanelHeaderButton, Radio} from "@vkontakte/vkui";
import {Icon24Cancel, Icon24Dismiss} from "@vkontakte/icons";
import {useSelector} from "react-redux";

function Sort({router, nav, getMarket, products, setSortBy, sortBy}) {
    const platform = useSelector((state) => state.main.platform)

    async function saveSort() {
        try {
            getMarket(null, sortBy)
            router.toBack()
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <ModalPage
            nav={nav}
            header={
                <ModalPageHeader
                    left={platform === 'android' &&
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Cancel/>
                        </PanelHeaderButton>
                    }

                    right={platform === IOS &&
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Dismiss/>
                        </PanelHeaderButton>
                    }
                >
                    Сортировка
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <Div>
                <Radio
                    name="sort"
                    value={0}
                    onClick={() => setSortBy(0)}
                    defaultChecked={sortBy === 0}
                >
                    Не выбрано
                </Radio>
                <Radio
                    name='sort'
                    value={1}
                    onClick={() => setSortBy(1)}
                    defaultChecked={sortBy === 1}
                >
                    По возрастанию цены
                </Radio>
                <Radio
                    name='sort'
                    value={2}
                    onClick={() => setSortBy(2)}
                    defaultChecked={sortBy === 2}
                >
                    По убыванию цены
                </Radio>
                <Radio
                    name='sort'
                    value={3}
                    onClick={() => setSortBy(3)}
                    defaultChecked={sortBy === 3}
                >
                    Новые товары
                </Radio>
            </Div>
            <Div>
                <Button
                    size='l'
                    stretched
                    onClick={() => saveSort()}
                >
                    Сохранить
                </Button>
            </Div>
        </ModalPage>
    )
}

export default withRouter(Sort)