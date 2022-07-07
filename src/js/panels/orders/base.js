import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Group, PanelHeader, Placeholder} from "@vkontakte/vkui";
import {Icon28CubeBoxOutline} from "@vkontakte/icons";

function Orders({router, isDesktop}) {
    return(
        <>
            <PanelHeader>Заказы</PanelHeader>
            <Group>
                <Placeholder
                    header='Тут ничего нет'
                    icon={<Icon28CubeBoxOutline width={56} height={56}/>}
                    className={!isDesktop && 'placeholder'}
                >
                    Добавь любимые товары в корзину, оформляй заказ и возвращайся!
                </Placeholder>
            </Group>
        </>
    )
}

export default withRouter(Orders)