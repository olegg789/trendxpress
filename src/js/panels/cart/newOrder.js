import React, {useEffect, useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Button,
    Div, FixedLayout,
    FormItem, FormLayout,
    Group,
    Header,
    Input,
    PanelHeader,
    PanelHeaderBack,
    Separator,
    SimpleCell,
    Textarea
} from "@vkontakte/vkui";
import declOfNum from "../../components/declOfNum";
import api from "../../components/apiFunc";
import {Icon28CancelCircleOutline, Icon28CheckCircleOutline} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import {useDispatch} from "react-redux";
import {set} from "../../reducers/mainReducer";

function NewOrder({router,storage, openSnackbar, setCount, getOrders, showNotifies}) {
    const dispatch = useDispatch()

    const [items, setItems] = useState([])
    const [price, setPrice] = useState(0)

    function calc() {
        if (JSON.parse(localStorage.getItem('cart')).length !== 0) {
            const count = JSON.parse(localStorage.getItem('cart')).length - 1
            let res = 0
            for (let i=0;i<=count;i++) {
                res = res + Number(JSON.parse(localStorage.getItem('cart'))[i].price)
            }
            setPrice(res)
        }
    }

    function getItemsIds() {
        // eslint-disable-next-line
        JSON.parse(localStorage.getItem('cart')).map((el) => {
            let arr = items
            arr.unshift(el.id)
            setItems(arr)
        })
    }

    useEffect(() => {
        getItemsIds();
        calc()
    }, [])


    async function getUserInfo() {
        try {
            bridge.send("VKWebAppGetUserInfo").then(
                data => {
                    let name = data.last_name + ' ' + data.first_name
                    dispatch(set({key: 'name', value: name}))
                })
            bridge.send("VKWebAppGetPersonalCard", {type: ['phone', 'email', "address"]}).then(
                data => {
                    if (data.phone.length > 0) {
                        let phone = data.phone
                            .replace('+', '')
                            .replace(/ /g, '')
                            .replace('(', '')
                            .replace(')', '')
                            .replace(/-/g, '')

                        dispatch(set({key: 'phone', value: phone}))
                    }
                    if (data.email.length > 0) {
                        dispatch(set({key: 'email', value: data.email}))
                    }
                    if (data.address) {
                        let address = `г. ${data.address.city.name} ${data.address.specified_address}, ${data.address.postal_code}`
                        dispatch(set({key: 'address', value: address}))
                    }
                }
            )
            dispatch(set({key: 'hasInfo', value: true}))
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!storage.hasInfo) {
            getUserInfo()
        }
    }, [])

    async function newOrder() {
        try {
            try {
                await bridge.send('VKWebAppAllowMessagesFromGroup', {group_id: 212830043})
            }
            catch (err) {
                if (err.error_data.error_code === 4) {
                    openSnackbar('Для оформления заказа необходимо разрешить отправку сообщений от группы',
                        <Icon28CancelCircleOutline className='snack_err'/>)
                    return
                }
            }

            let res = await api(
                'orders',
                'POST',
                {
                    'items': items,
                    'address': storage.address,
                    'recipient': storage.name,
                    'phone': storage.phone,
                    'email': storage.email,
                    'comment': storage.comment
                }
            )
            if (res.response) {
                router.toBack()
                localStorage.setItem('cart', "[]")
                setCount(0)
                getOrders()
                dispatch(set({key: 'order_id', value: res.id}))
                dispatch(set({key: 'amount', value: res.amount}))
                showNotifies()
                openSnackbar('Заказ оформлен!', <Icon28CheckCircleOutline className='snack_suc'/>)
                router.toModal('payment')
            } else {
                if (res.error.code === 3) {
                    if (res.error.param === 'address') {
                        openSnackbar('Произошла ошибка! Некорректный адрес!', <Icon28CancelCircleOutline
                            className='snack_err'/>)
                    } else if (res.error.param === 'recipient') {
                        openSnackbar('Произошла ошибка! Некорректный получатель!', <Icon28CancelCircleOutline
                            className='snack_err'/>)
                    } else if (res.error.param === 'phone') {
                        openSnackbar('Произошла ошибка! Некорректный номер телефона!',
                            <Icon28CancelCircleOutline className='snack_err'/>)
                    } else if (res.error.param === 'email') {
                        openSnackbar('Произошла ошибка! Некорректная электронная почта!',
                            <Icon28CancelCircleOutline className='snack_err'/>)
                    } else if (res.error.param === 'comment') {
                        openSnackbar('Произошла ошибка! Некорректный комментарий!', <Icon28CancelCircleOutline
                            className='snack_err'/>)
                    }
                } else if (res.error.code === 9) {
                    openSnackbar('Произошла ошибка! Превышен лимит активных заказов!',
                        <Icon28CancelCircleOutline className='snack_err'/>)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function onChange(name, value) {
        dispatch(set({key: name, value: value}))
    }

    return(
        <>
        <PanelHeader separator={storage.isDesktop} left={<PanelHeaderBack onClick={() => router.toBack()}/> }>Новый заказ</PanelHeader>
            <Group>
                <div style={ {marginBottom: 150}}>
                    <FormLayout>
                        <FormItem top='Адрес доставки'>
                            <Textarea
                                placeholder='г. Санкт-Петербург, Невский проспект, д. 28, БЦ "Зингеръ"'
                                value={storage.address}
                                onChange={(e) => {
                                    if (e.currentTarget.value.length > 200) return
                                    onChange(
                                        'address',
                                        e.currentTarget.value
                                            .replace(/^\s+/g, '')
                                            .replace(/[+]/g, '')
                                            .replace(/[-]/g, '')
                                    )
                                }}
                                maxLength={200}
                            />
                        </FormItem>

                        <FormItem top='Получатель'>
                            <Input
                                placeholder='Иванов Иван Иванович'
                                value={storage.name}
                                onChange={(e) => {
                                    if (e.currentTarget.value.length > 100) return
                                    onChange('name', e.currentTarget.value.replace(/^\s+/g, ''))
                                }}
                                maxLength={100}
                            />
                        </FormItem>

                        <FormItem top='Телефон'>
                            <Input
                                placeholder='70000000000'
                                value={storage.phone}
                                type='phone'
                                onChange={(e) => {
                                    if (e.currentTarget.value.length > 11) return
                                    onChange(
                                        'phone',
                                        e.currentTarget.value
                                            .replace(/^\s+/g, '')
                                            .replace(/[^0-9]/g, '')
                                    )
                                }}
                                name='phone'
                            />
                        </FormItem>

                        <FormItem top='Электронная почта'>
                            <Input
                                placeholder='ivanIvanov@gmail.com'
                                value={storage.email}
                                onChange={(e) => {
                                    if (e.currentTarget.value.length > 100) return
                                    onChange('email', e.currentTarget.value.replace(/^\s+/g, ''))
                                }}
                                maxLength={100}
                                type='email'
                            />
                        </FormItem>

                        <FormItem top='Комментарий (необязательно)'>
                            <Textarea
                                value={storage.comment}
                                onChange={(e) => {
                                    if (e.currentTarget.value.length > 1000) return
                                    onChange('comment', e.currentTarget.value.replace(/^\s+/g, ''))
                                }}
                                maxLength={1000}
                            />
                        </FormItem>
                    </FormLayout>
                </div>

                <FixedLayout vertical='bottom' filled className={storage.isDesktop ? 'fixedLayoutCart' : ''}>
                    <Separator wide/>
                    <Header mode='secondary'>Итого</Header>
                    <SimpleCell
                        disabled
                        after={
                            <span className='count_cart'>
                                {JSON.parse(localStorage.getItem('cart')).length} {declOfNum(JSON.parse(localStorage.getItem('cart')).length, ["товар", "товара", "товаров"])}
                            </span>
                        }
                    >
                        <b>{price} ₽</b>
                    </SimpleCell>
                    <Div>
                        <Button
                            size='l'
                            stretched
                            onClick={() => newOrder()}
                            disabled={
                                !storage.address ||
                                !storage.name ||
                                !storage.email ||
                                !storage.phone ||
                                storage.phone.length < 11 ||
                                !storage.email.includes('@')
                            }
                        >
                            Оформить заказ
                        </Button>
                    </Div>
                </FixedLayout>
            </Group>
        </>
    )
}

export default withRouter(NewOrder)