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
  withAdaptivity, Snackbar, ScreenSpinner,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import declOfNum from "./js/components/declOfNum";

import { set } from './js/reducers/mainReducer';

import DesktopNavigation from './js/components/navigation/desktop';
import MobailNavigation from './js/components/navigation/mobail';

import Market from "./js/panels/home/base";
import InfoProduct from "./js/panels/home/placeholder";
import Cart from "./js/panels/cart/base";
import Orders from "./js/panels/orders/base";
import NewOrder from "./js/panels/cart/newOrder";
import api from "./js/components/apiFunc";
import AddItem from "./js/panels/home/admin/addItem";
import Admin from "./js/panels/home/admin/admin";
import {Icon28CheckCircleOutline} from "@vkontakte/icons";
import EditItem from "./js/panels/home/admin/editItem";
import OrderInfo from "./js/components/modals/HomeBotInfoModal";
import ViewOrders from "./js/panels/home/admin/viewOrders";
import OrderInfoAdmin from "./js/components/modals/HomeBotsListModal";
import EditStatus from "./js/components/modals/EditStatus";
import AddAlbum from "./js/panels/home/admin/addAlbum";
import EditAlbums from "./js/panels/home/admin/editAlbums";
import EditAlbum from "./js/panels/home/admin/editAlbum";
import Album from "./js/panels/home/album";
import About from "./js/panels/home/About";
import ViewReviews from "./js/panels/home/admin/viewReviews";
import AddReview from "./js/panels/home/admin/addReview";
import Settings from "./js/panels/home/admin/settings";

const App = withAdaptivity(({ viewWidth, router }) => {
  const mainStorage = useSelector((state) => state.main)
  const dispatch = useDispatch()

  const [scheme, setScheme] = useState('')
  const [count, setCount] = useState(0)
  const [admin, setAdmin] = useState(false)
  const [market, setMarket] = useState([])
  const [ordersAdmin, setOrdersAdmin] = useState([])
  const [adminSettings, setAdminSettings] = useState({})
  const [reviewsAdmin, setReviewsAdmin] = useState([])
  const [loading, setLoading] = useState(true)
  const [snackbar, setSnackbar] = useState(null)
  const [loadingMain, setLoadingMain] = useState(true)
  const [albums, setAlbums] = useState([])

  const localstorage = localStorage

  dispatch(set({ key: 'isDesktop', value: viewWidth >= 3 }))
  dispatch(set({ key: 'platform', value: mainStorage.isDesktop ? VKCOM : usePlatform() }))
  dispatch(set({ key: 'hasHeader', value: mainStorage.isDesktop }))
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
    router.toPopout(<ScreenSpinner/>)
    let res = await api('profile', 'GET')
    if (res.user.admin) {
      setAdmin(true)
    }
    getMarket()
    router.toPopout()
  }

  async function checkCart() {
      if (localStorage.getItem('cart') === null || JSON.parse(localStorage.getItem('cart')).length === 0) {
        localStorage.setItem('cart', "[]")
        setCount(0)
      }
      else {
        setCount(
            JSON.parse(localStorage.getItem('cart')).length
        )
      }
    getOrders()
  }

  async function getMarket(offset) {
    setLoadingMain(true)
    if (!offset) {
      let res = await api(`items`, 'GET')
      if (res.response) {
        setMarket(res.items)
      }
    }
    else {
      let res = await api(`items?offset=${offset}&limit=20`, 'GET')
      if (res.response) {
        let items = market
        items.reverse()
        // eslint-disable-next-line
        res.items.map((el) => {
          items.unshift(el)
        })
        setMarket(items.reverse())
      }
    }
    setLoadingMain(false)
  }

  async function getAlbums() {
    try {
      let res = await api('albums', 'GET')
      if (res.response) {
        console.log(res)
        setAlbums(res.albums)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  function openSnackbar(text, icon) {
    setSnackbar(
        <Snackbar
            onClose={() => setSnackbar(null)}
            before={icon}
            className={mainStorage.isDesktop && 'snackbar'}
            duration={1500}
        >
          {text}
        </Snackbar>
    )
  }

  function openSnackbarCart() {
    setSnackbar(
        <Snackbar
            onClose={() => setSnackbar(null)}
            before={<Icon28CheckCircleOutline className='snack_suc'/>}
            action='В корзину'
            onActionClick={() => {router.toView('cart'); router.toPopout()}}
            className={mainStorage.isDesktop && 'snackbar'}
            duration={1500}
        >
          Товар добавлен в корзину!
        </Snackbar>
    )
  }

  async function getOrders() {
    try {
      let res = await api('orders', 'GET')
      if (res.response) {
        dispatch(set({key: 'orders', value: res.orders}))
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  async function getReviews() {
    try {
      setLoading(true)
      let res = await api('admin/reviews', 'GET')
      if (res.response) {
        setReviewsAdmin(res.reviews)
        setLoading(false)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  async function getSettings() {
    try {
      setLoading(true)
      let res = await api('admin/settings', 'GET')
      if (res.response) {
        setAdminSettings(res.config)
        setLoading(false)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  async function getOrdersAdmin() {
    try {
      setLoading(true)
      let res = await api('admin/orders', 'GET')
      if (res.response) {
        setOrdersAdmin(res.orders)
        setLoading(false)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAppScheme();
    checkAdmin();
    getAlbums();
    checkCart()
  }, [])

  const modals = (
    <ModalRoot activeModal={router.modal} onClose={() => router.toBack()}>
      <OrderInfoAdmin nav="orderInfoAdmin" storage={mainStorage} dispatch={(value) => dispatch(value)}/>
      <OrderInfo nav="orderInfo" storage={mainStorage} dispatch={(value) => dispatch(value)}/>
      <EditStatus
          nav='editStatus'
          storage={mainStorage}
          getOrders={() => getOrders()}
          getOrdersAdmin={() => getOrdersAdmin()}
          openSnackbar={(text, icon) => openSnackbar(text, icon)}
      />
    </ModalRoot>
  );

  return(
    <ConfigProvider platform={mainStorage.platform === 'vkcom' ? 'android' : 'ios' } scheme={scheme} isWebView>
      <AppRoot>
        <SplitLayout
          header={mainStorage.hasHeader && <PanelHeader separator={false} />}
          style={{ justifyContent: "center" }}
        >

          {mainStorage.isDesktop && <DesktopNavigation/>}

          <SplitCol
            animate={!mainStorage.isDesktop}
            spaced={mainStorage.isDesktop}
            width={mainStorage.isDesktop ? '660px' : '100%'}
            maxWidth={mainStorage.isDesktop ? '650px' : '100%'}
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
                <Panel id='base' className={mainStorage.isDesktop ? 'basePanel' : ''}>
                    <Market
                        router={router}
                        storage={mainStorage}
                        products={market}
                        declOfNum={(number, words) => declOfNum(number, words)}
                        admin={admin}
                        getMarket={(offset) => getMarket(offset)}
                        setMarket={(value) => setMarket(value)}
                        loading={loadingMain}
                        setLoading={(value) => setLoadingMain(value)}
                        albums={albums}
                    />
                  {snackbar}
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
                      admin={admin}
                      openSnackbar={(text, icon) => openSnackbar(text, icon)}
                      getMarket={(offset) => getMarket(offset)}
                      albums={albums}
                  />
                  {snackbar}
                </Panel>

                <Panel id='album'>
                  <Album storage={mainStorage}/>
                </Panel>

                <Panel id='about'>
                  <About/>
                </Panel>

                <Panel id='admin'>
                  <Admin/>
                  {snackbar}
                </Panel>

                <Panel id='addItem'>
                  <AddItem
                      getMarket={(offset) => getMarket(offset)}
                      openSnackbar={(text, icon, action) => openSnackbar(text, icon, action)}
                      albums={albums}
                  />
                  {snackbar}
                </Panel>

                <Panel id='editItem'>
                  <EditItem
                      getMarket={(offset) => getMarket(offset)}
                      openSnackbar={(text, icon, action) => openSnackbar(text, icon, action)}
                      storage={mainStorage}
                      albums={albums}
                  />
                  {snackbar}
                </Panel>

                <Panel id='addReview'>
                  <AddReview
                      getReviews={() => getReviews()}
                      openSnackbar={(text, icon, action) => openSnackbar(text, icon, action)}
                      storage={mainStorage}
                  />
                  {snackbar}
                </Panel>

                <Panel id='viewOrders'>
                  <ViewOrders
                      dispatch={(value) => dispatch(value)}
                      getOrders={() => getOrdersAdmin()}
                      orders={ordersAdmin}
                      loading={loading}
                  />
                  {snackbar}
                </Panel>

                <Panel id='viewReviews'>
                    <ViewReviews
                        openSnackbar={(text, icon, action) => openSnackbar(text, icon, action)}
                        getReviews={() => getReviews()}
                        reviews={reviewsAdmin}
                        loading={loading}
                    />
                    {snackbar}
                </Panel>

                <Panel id='addAlbum'>
                  <AddAlbum
                      getAlbums={() => getAlbums()}
                      openSnackbar={(text, icon, action) => openSnackbar(text, icon, action)}
                      albums={albums}
                  />
                </Panel>

                <Panel id='editAlbums'>
                  <EditAlbums
                      albums={albums}
                      getAlbums={() => getAlbums()}
                      openSnackbar={(text, icon, action) => openSnackbar(text, icon, action)}
                  />
                  {snackbar}
                </Panel>

                <Panel id='settings'>
                  <Settings
                      settings={adminSettings}
                      getSettings={() => getSettings()}
                      openSnackbar={(text, icon, action) => openSnackbar(text, icon, action)}
                  />
                  {snackbar}
                </Panel>

                <Panel id='editAlbum'>
                  <EditAlbum
                      getAlbums={() => getAlbums()}
                      openSnackbar={(text, icon, action) => openSnackbar(text, icon, action)}
                      storage={mainStorage}
                  />
                  {snackbar}
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
                        isDesktop={mainStorage.isDesktop}
                        storage={mainStorage}
                        dispatch={(value) => dispatch(value)}
                        checkCart={() => checkCart()}
                        setCount={(value) => setCount(value)}
                        count={count}
                    />
                  {snackbar}
                </Panel>

                <Panel id='newOrder'>
                  <NewOrder
                      router={router}
                      storage={mainStorage}
                      openSnackbar={(text, icon) => openSnackbar(text, icon)}
                      setCount={(value) => setCount(value)}
                      getOrders={() => getOrders()}
                  />
                  {snackbar}
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
                      storage={mainStorage}
                      dispatch={(value) => dispatch(value)}
                      getOrders={() => getOrders()}
                  />
                  {snackbar}
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
