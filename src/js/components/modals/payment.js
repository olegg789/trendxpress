import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Button, Div, ModalCard} from "@vkontakte/vkui";
import {Icon56MoneyTransferOutline} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import api from "../apiFunc";
import generateHash from '../../../gg'

function Payment({router, nav, storage}) {

    async function pay() {
        try {
            let vkpay = await bridge.send("VKWebAppOpenPayForm", {
                app_id: 51426182,
                action: "pay-to-group",
                params: {
                    amount: 1,
                    group_id: 212830043,
                    description: `Оплата заказа №${storage.order_id}`,
                },
            })
            if (vkpay.status) {
                const hash = await generateHash(String(1))
                console.log(storage.amount)
                console.log(hash)

                let res = await api(
                    `orders/${storage.order_id}`,
                    'PATCH',
                    {
                        'hmac': hash.hmac,
                        'hash': hash.hash,
                        'ts': hash.ts,
                    }
                )
                if (res.response) {
                    router.toModal()
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <ModalCard
            header='Оплата'
            icon={<Icon56MoneyTransferOutline/>}
            nav={nav}
        >
            <Div>
                Для ускорения доставки заказа Вы можете оплатить его через VK Pay.
            </Div>
            <Div>
                <Button
                    size='l'
                    stretched
                    onClick={() => pay()}
                >
                    Оплатить через VK Pay
                </Button>
                <br/>
                <Button
                    size='l'
                    stretched
                    mode='secondary'
                    onClick={() => router.toModal()}
                >
                    Оплатить позже
                </Button>
            </Div>
        </ModalCard>
    )
}

export default withRouter(Payment);