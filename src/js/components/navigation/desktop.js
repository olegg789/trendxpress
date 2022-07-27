import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
    SplitCol,
    Panel,
    PanelHeader,
    SimpleCell,
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
        {hasHeader && <PanelHeader>Trendxpress</PanelHeader>}
          <SimpleCell
            onClick={() => router.toView('home')}
            disabled={router.activeView === 'home'}
            before={<Icon28StorefrontOutline className='iconNavigation'/>}
            className={`navigationItem ${router.activeView === 'home' ? 'activeViewCell' : ''}`}
            description='Каталог товаров'
          >
            Товары
          </SimpleCell>

          <SimpleCell
            onClick={() => router.toView('cart')}
            disabled={router.activeView === 'cart'}
            before={<Icon28ShoppingCartOutline className='iconNavigation'/>}
            className={`navigationItem ${router.activeView === 'cart' ? 'activeViewCell' : ''}`}
            description={<span style={{whiteSpace: 'pre-line'}}>Всё, что Вы хотите купить</span>}
          >
            Корзина
          </SimpleCell>

            <SimpleCell
                onClick={() => router.toView('orders')}
                disabled={router.activeView === 'orders'}
                before={<Icon28MarketOutline className='iconNavigation'/>}
                className={`navigationItem ${router.activeView === 'orders' ? 'activeViewCell' : ''}`}
                description='История заказов'
            >
                Заказы
            </SimpleCell>
      </Panel>
    </SplitCol>
	)
}

export default withRouter(DesktopNavigation);