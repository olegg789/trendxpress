import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Button, ModalCard} from "@vkontakte/vkui";
import {Icon28QuestionOutline} from "@vkontakte/icons";

function Info({router, nav}) {
    return (
        <ModalCard
            nav={nav}
            icon={<Icon28QuestionOutline width={56} height={56}/>}
            header='Как работает?'
            subheader={
                <>
                    Заказ поступает уведомлением в личные сообщения администратора группы с заказом и контактами покупателя<br/>
                    Продавец отправляет заказ СДЭКом (наложенным платежом).
                </>
            }
            actions={
                <Button
                    stretched
                    size='l'
                    onClick={() => router.toModal()}
                >
                    Понятно
                </Button>
            }
            onClose={() => router.toModal()}
        />
    )
}

export default withRouter(Info)