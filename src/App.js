import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
  ConfigProvider,
  AppRoot,
  SplitLayout,
  PanelHeader,
  SplitCol,
  Epic,
  View,
  Panel,
  ModalRoot,
  usePlatform,
  VKCOM,
  withAdaptivity,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

import { set } from './js/reducers/mainReducer';

import DesktopNavigation from './js/components/navigation/desktop';
import MobailNavigation from './js/components/navigation/mobail';

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';
import Market from "./js/panels/home/base";
import InfoProduct from "./js/panels/home/placeholder";
import Cart from "./js/panels/cart/base";
import Orders from "./js/panels/orders/base";

const App = withAdaptivity(({ viewWidth, router }) => {
  const mainStorage = useSelector((state) => state.main)
  const dispatch = useDispatch()

  const [scheme, setScheme] = useState('')

  const localstorage = localStorage
  const cart = localstorage.getItem('cart')
  const products = [
    {
      id: 0,
      price: 1000,
      name: 'Macbook pro 15 2020 16/512',
      description: 'fghgh\njhgfgyhj\nkjhgftyh\ngtyujkoiuy\njytfvhui',
      photo: [
          'https://sun7-7.userapi.com/s/v1/ig2/1qEavBZOdwuKu_remPVlGnMXqPpDxtS7VvWzHz2VVajG6wbfGdO4YLK4ShxDJ9F2BuSxewqRLp0htPtFiQaPrmqU.jpg?size=200x200&quality=95&crop=490,773,712,712&ava=1'
      ]
    },
    {
      id: 1,
      price: 1,
      name: 'Macbook pro 15',
      description: 'Курит каждый день\nЯ бы ему дал',
      photo: ['https://sun7-7.userapi.com/s/v1/ig2/1qEavBZOdwuKu_remPVlGnMXqPpDxtS7VvWzHz2VVajG6wbfGdO4YLK4ShxDJ9F2BuSxewqRLp0htPtFiQaPrmqU.jpg?size=200x200&quality=95&crop=490,773,712,712&ava=1']
    },
    {
      id: 2,
      price: 1,
      name: 'Савелий Хайруллин',
      description: 'Курит каждый день\nЯ бы ему дал',
      photo: ['https://sun7-7.userapi.com/s/v1/ig2/1qEavBZOdwuKu_remPVlGnMXqPpDxtS7VvWzHz2VVajG6wbfGdO4YLK4ShxDJ9F2BuSxewqRLp0htPtFiQaPrmqU.jpg?size=200x200&quality=95&crop=490,773,712,712&ava=1']
    },
    {
      id: 3,
      price: 1,
      name: 'Ol Eg',
      description: 'aboba',
      photo: ['https://sun7-7.userapi.com/s/v1/ig2/1qEavBZOdwuKu_remPVlGnMXqPpDxtS7VvWzHz2VVajG6wbfGdO4YLK4ShxDJ9F2BuSxewqRLp0htPtFiQaPrmqU.jpg?size=200x200&quality=95&crop=490,773,712,712&ava=1']
    },

  ]

  dispatch(set({ key: 'isDesktop', value: viewWidth >= 3 }))
  dispatch(set({ key: 'platform', value: mainStorage.isDesktop ? VKCOM : usePlatform() }))
  dispatch(set({ key: 'hasHeader', value: mainStorage.isDesktop !== true }))

  async function getAppScheme() {
    bridge.subscribe((e) => {
      if (e.detail.type === 'VKWebAppUpdateConfig') {
        let data = e.detail.data.scheme
        setScheme(data)
      }
    })
    let appScheme = await bridge.send("VKWebAppGetConfig")
    setScheme(appScheme.scheme)
  }

  useEffect(() => {
    getAppScheme()
  }, [])

  function declOfNum(number, words) {
    return words[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
        ];
  }

  const modals = (
    <ModalRoot activeModal={router.modal} onClose={() => router.toBack()}>
      <HomeBotsListModal nav="botsList"/>
      <HomeBotInfoModal nav="botInfo"/>
    </ModalRoot>
  );

  return(
    <ConfigProvider platform={mainStorage.platform === 'vkcom' ? 'vkcom' : 'ios'} scheme={scheme} isWebView>
      <AppRoot>
        <SplitLayout
          header={mainStorage.hasHeader && <PanelHeader separator={false} />}
          style={{ justifyContent: "center" }}
        >

          {mainStorage.isDesktop && <DesktopNavigation/>}

          <SplitCol
            animate={!mainStorage.isDesktop}
            spaced={mainStorage.isDesktop}
            width={mainStorage.isDesktop ? '560px' : '100%'}
            maxWidth={mainStorage.isDesktop ? '560px' : '100%'}
          >   
            <Epic 
              activeStory={router.activeView} 
              tabbar={!mainStorage.isDesktop && <MobailNavigation/>}
            >
              <View 
                id='home'
                activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                popout={router.popout}
                modal={modals}
              >
                <Panel id='base'>
                    <Market
                        router={router}
                        storage={mainStorage}
                        products={products}
                        declOfNum={(number, words) => declOfNum(number, words)}
                    />
                </Panel>

                <Panel id='infoProduct'>
                  <InfoProduct
                      storage={mainStorage}
                      declOfNum={(number, words) => declOfNum(number, words)}
                      localstorage={localstorage}
                      dispatch={(value) => dispatch(value)}
                  />
                </Panel>
              </View>

              <View 
                id="cart"
                activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                popout={router.popout}
                modal={modals}
              >
                <Panel id='base'>
                    <Cart
                        localstorage={localstorage}
                        cart={cart}
                        isDesktop={mainStorage.isDesktop}
                        storage={mainStorage}
                    />
                </Panel>
              </View>

              <View
                  id="orders"
                  activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                  popout={router.popout}
                  modal={modals}
              >
                <Panel id='base'>
                  <Orders/>
                </Panel>
              </View>
            </Epic>
          </SplitCol>
        </SplitLayout>
      </AppRoot>
    </ConfigProvider>
  )
}, { viewWidth: true })

export default withRouter(App);
