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
  withAdaptivity, Snackbar,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import declOfNum from "./js/components/declOfNum";

import { set } from './js/reducers/mainReducer';

import DesktopNavigation from './js/components/navigation/desktop';
import MobailNavigation from './js/components/navigation/mobail';

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';
import Market from "./js/panels/home/base";
import InfoProduct from "./js/panels/home/placeholder";
import Cart from "./js/panels/cart/base";
import Orders from "./js/panels/orders/base";
import InfoProductCart from "./js/panels/cart/infoProduct";
import NewOrder from "./js/panels/cart/newOrder";
import api from "./js/components/apiFunc";
import AddItem from "./js/panels/home/admin/addItem";
import Admin from "./js/panels/home/admin/admin";
import {Icon28CheckCircleOutline} from "@vkontakte/icons";

const App = withAdaptivity(({ viewWidth, router }) => {
  const mainStorage = useSelector((state) => state.main)
  const dispatch = useDispatch()

  const [scheme, setScheme] = useState('')
  const [count, setCount] = useState(0)
  const [admin, setAdmin] = useState(false)
  const [market, setMarket] = useState([])

  const localstorage = localStorage
  const cart = localstorage.getItem('cart')
  const products = [
    {
      id: 0,
      price: 150000,
      name: 'MacBook Pro 13 M1 16/512',
      description: 'fghgh\njhgfgyhj\nkjhgftyh\ngtyujkoiuy\njytfvhui',
      photo: [
          'https://www.notebookcheck-ru.com/uploads/tx_nbc2/2020-12-07_00_20_10-13__MacBook_Pro_kaufen_-_Apple__DE_.png'
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
  dispatch(set({key: 'cart', value: "[]"}))

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

  async function checkAdmin() {
    let res = await api('profile', 'GET')
    console.log(res)
    if (res.user.admin) {
      setAdmin(true)
    }
  }

  async function checkCart() {
    console.log(cart)
      if (localStorage.getItem('cart') === null || JSON.parse(localStorage.getItem('cart')).length === 0) {
        localStorage.setItem('cart', "[]")
        setCount(0)
      }
      else {
        setCount(
            JSON.parse(localStorage.getItem('cart')).length
        )
      }

  }

  async function getMarket() {
      let res = await api('items', 'GET')
    console.log(res)
    if (res.response) {
      setMarket(res.items)
    }
  }

  function openSnackbar(text, icon, action) {
    router.toPopout(
        <Snackbar
            onClose={() => router.toPopout()}
            before={icon}
        >
          {text}
        </Snackbar>
    )
  }

  function openSnackbarCart() {
    router.toPopout(
        <Snackbar
            onClose={() => router.toPopout()}
            before={<Icon28CheckCircleOutline className='snack_suc'/>}
            action='В корзину'
            onActionClick={() => {router.toView('cart'); router.toPopout()}}
        >
          Товар добавлен в корзину!
        </Snackbar>
    )
  }

  useEffect(() => {
    getAppScheme();
    checkCart();
    checkAdmin();
    getMarket()
  }, [])

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

          <SplitCol
            animate={!mainStorage.isDesktop}
            spaced={mainStorage.isDesktop}
            width={mainStorage.isDesktop ? '560px' : '100%'}
            maxWidth={mainStorage.isDesktop ? '560px' : '100%'}
          >   
            <Epic 
              activeStory={router.activeView} 
              tabbar={!mainStorage.isDesktop && <MobailNavigation count={count}/>}
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
                        products={market}
                        declOfNum={(number, words) => declOfNum(number, words)}
                        admin={admin}
                    />
                </Panel>

                <Panel id='infoProduct'>
                  <InfoProduct
                      storage={mainStorage}
                      declOfNum={(number, words) => declOfNum(number, words)}
                      localstorage={localstorage}
                      dispatch={(value) => dispatch(value)}
                      count={count}
                      setCount={(value) => setCount(value)}
                      openSnackbarCart={() => openSnackbarCart()}
                  />
                </Panel>

                <Panel id='addItem'>
                  <AddItem
                      getMarket={() => getMarket()}
                      openSnackbar={(text, icon, action) => openSnackbar(text, icon, action)}
                  />
                </Panel>

                <Panel id='admin'>
                  <Admin/>
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
                        dispatch={(value) => dispatch(value)}
                        checkCart={() => checkCart()}
                        setCount={(value) => setCount(value)}
                    />
                </Panel>

                <Panel id='infoProductCart'>
                  <InfoProductCart
                      storage={mainStorage}
                      declOfNum={(number, words) => declOfNum(number, words)}
                      localstorage={localstorage}
                      dispatch={(value) => dispatch(value)}
                      openSnackbarCart={() => openSnackbarCart()}
                  />
                </Panel>

                <Panel id='newOrder'>
                  <NewOrder
                      router={router}
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
                  <Orders
                      isDesktop={mainStorage.isDesktop}
                  />
                </Panel>
              </View>
            </Epic>
          </SplitCol>

          {mainStorage.isDesktop && <DesktopNavigation/>}

        </SplitLayout>
      </AppRoot>
    </ConfigProvider>
  )
}, { viewWidth: true })

export default withRouter(App);
