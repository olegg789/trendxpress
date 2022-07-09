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
import {Icon28CheckCircleOutline} from "@vkontakte/icons";

function NewOrder({router,storage, openSnackbar, setCount, getOrders}) {

    const [address, setAddress] = useState('')
    const [recipient, setRecipient] = useState('')
    const [phone, setPhone] = useState('')
    const [comment, setComment] = useState('')
    const [items, setItems] = useState([])
    const [email, setEmail]  = useState('')

    function getItemsIds() {
        // eslint-disable-next-line
        JSON.parse(localStorage.getItem('cart')).map((el) => {
            let arr = items
            arr.unshift(el.id)
            setItems(arr)
        })
    }

    useEffect(() => {
        getItemsIds()
    }, [])

    async function newOrder() {
        try {
            let res = await api(
                'orders',
                'POST',
                {
                    'items': items,
                    'address': address,
                    'recipient': recipient,
                    'phone': phone,
                    'email': email,
                    'comment': comment
                }
            )
            console.log(res)
            if (res.response) {
                console.log('Заказ отправлен')
                router.toBack()
                localStorage.setItem('cart', "[]")
                setCount(0)
                getOrders()
                openSnackbar('Заказ оформлен!', <Icon28CheckCircleOutline className='snack_suc'/>)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return(
        <>
        <PanelHeader separator={storage.isDesktop} left={<PanelHeaderBack onClick={() => router.toBack()}/> }>Новый заказ</PanelHeader>
            <Group>
                <FormLayout style={{marginBottom: 120}}>
                    <FormItem top='Адрес доставки'>
                        <Textarea
                            placeholder='г. Санкт-Петербург, Невский проспект, д. 28, БЦ "Зингеръ"'
                            value={address}
                            onChange={(e) => setAddress(e.currentTarget.value)}
                        />
                    </FormItem>

                    <FormItem top='Получатель'>
                        <Input
                            placeholder='Иванов Иван Иванович'
                            value={recipient}
                            onChange={(e) => setRecipient(e.currentTarget.value)}
                        />
                    </FormItem>

                    <FormItem top='Телефон'>
                        <Input
                            placeholder='70000000000'
                            type='number'
                            maxLength={11}
                            value={phone}
                            onChange={(e) => {
                                if (e.currentTarget.value.length > 11) return
                                setPhone(e.currentTarget.value)
                            }}
                        />
                    </FormItem>

                    <FormItem top='Электронная почта'>
                        <Input
                            placeholder='ivanIvanov@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                    </FormItem>

                    <FormItem top='Комментарий (необязательно)'>
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.currentTarget.value)}
                        />
                    </FormItem>
                </FormLayout>

                <FixedLayout vertical='bottom' filled>
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
                        {storage.price}₽
                    </SimpleCell>
                    <Div>
                        <Button
                            size='l'
                            stretched
                            onClick={() => newOrder()}
                            disabled={
                                address.length === 0 || recipient.length === 0 || email.length === 0 || phone.length === 0
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