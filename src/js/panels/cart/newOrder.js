import React, {useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Button,
    Div, FixedLayout,
    FormItem,
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

function NewOrder({router,storage}) {

    const [address, setAddress] = useState('')
    const [recipient, setRecipient] = useState('')
    const [phone, setPhone] = useState('')
    const [comment, setComment] = useState('')

    return(
        <>
        <PanelHeader left={<PanelHeaderBack onClick={() => router.toBack()}/> }>Новый заказ</PanelHeader>
            <Group>
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
                        placeholder='+70000000000'
                        type='number'
                        maxLength={12}
                        value={phone}
                        onChange={(e) => setPhone(e.currentTarget.value)}
                    />
                </FormItem>

                <FormItem top='Комментарий (необязательно)'>
                    <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.currentTarget.value)}
                    />
                </FormItem>

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
                            onClick={() => router.toPanel('newOrder')}
                            disabled={
                                address.length === 0 || recipient.length === 0 || phone.length === 0
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