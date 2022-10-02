import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    IOS,
    ModalPage,
    PanelHeaderButton,
    ModalPageHeader, Div,
} from "@vkontakte/vkui";
import {Icon24Cancel, Icon24Dismiss} from "@vkontakte/icons";
import {useSelector} from "react-redux";

function Description({router, nav, storage}) {
    const platform = useSelector((state) => state.main.platform)

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
                    Описание
                </ModalPageHeader>
            }
        >
            <Div style={{whiteSpace: 'pre-line'}}>
                {storage.description}
            </Div>
        </ModalPage>
    )
}

export default withRouter(Description)