import React from 'react';
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
	Tabbar,
	TabbarItem,
	Counter
} from '@vkontakte/vkui';
import {
	Icon28MarketOutline,
	Icon28ShoppingCartOutline,
	Icon28StorefrontOutline
} from '@vkontakte/icons';

function MobailNavigation({ router, count }) {

	function openView(view) {
		let nowView = router.activeView
		router.toView(view)
		
		if (view === nowView) {
		  router.toHash(`${view}/base`)
		}
	}

	return(
	    <Tabbar>
	      <TabbarItem
	        selected={router.activeView === 'home'}
	        onClick={() => openView('home')}
	        text='Товары'
	      ><Icon28StorefrontOutline/></TabbarItem>

	      <TabbarItem
	        data-id='cart'
	        selected={router.activeView === 'cart'}
			onClick={() => openView('cart')}
	        text='Корзина'
			indicator={
				count !== 0 &&
					<Counter size='s' mode='primary'>
						{count}
					</Counter>
			}
	      ><Icon28ShoppingCartOutline/></TabbarItem>

			<TabbarItem
				data-id='orders'
				selected={router.activeView === 'orders'}
				onClick={() => openView('orders')}
				text='Заказы'
			><Icon28MarketOutline/></TabbarItem>
	    </Tabbar>
	)
}

export default withRouter(MobailNavigation);