import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
  SplitCol,
	Panel,
	PanelHeader,
	Group,
	Cell
} from '@vkontakte/vkui';
import {
    Icon28MarketOutline,
    Icon28ShoppingCartOutline,
    Icon28StorefrontOutline
} from '@vkontakte/icons';

function DesktopNavigation({ router }) {
  const hasHeader = useSelector((state) => state.main.hasHeader)

	return(
    <SplitCol fixed width='280px' maxWidth='280px'>
      <Panel id='menuDesktop'>
        {hasHeader && <PanelHeader/>}
        <Group>
          <Cell
            onClick={() => router.toView('home')}
            disabled={router.activeView === 'home'}
            before={<Icon28StorefrontOutline/>}
            className={router.activeView === 'home' ? 'activeViewCell' : ''}
          >
            Товары
          </Cell>

          <Cell
            onClick={() => router.toView('cart')}
            disabled={router.activeView === 'cart'}
            before={<Icon28ShoppingCartOutline/>}
            className={router.activeView === 'cart' ? 'activeViewCell' : ''}
          >
            Корзина
          </Cell>

            <Cell
                onClick={() => router.toView('orders')}
                disabled={router.activeView === 'orders'}
                before={<Icon28MarketOutline/>}
                className={router.activeView === 'orders' ? 'activeViewCell' : ''}
            >
                Заказы
            </Cell>
        </Group>
      </Panel>
    </SplitCol>
	)
}

export default withRouter(DesktopNavigation);