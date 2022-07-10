import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Button, FormItem, Group, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {useSelector} from "react-redux";

function Admin({router}) {
    const storage = useSelector((state) => state.main)

    return(
        <>
        <PanelHeader
            separator={storage.isDesktop}
            left={
                <PanelHeaderBack onClick={() => router.toBack()}/>
            }
            >
            Админ-панель
        </PanelHeader>
            <Group>
                <FormItem top='Товары'>
                    <Button
                        size='l'
                        stretched
                        onClick={() => router.toPanel('addItem')}
                    >
                        Добавить товар
                    </Button>
                </FormItem>

                <FormItem top='Управление подборками'>
                    <Button
                        size='l'
                        stretched
                        onClick={() => router.toPanel('editAlbums')}
                    >
                        Открыть
                    </Button>
                </FormItem>

                <FormItem top='Управление заказами'>
                    <Button
                        size='l'
                        stretched
                        onClick={() => router.toPanel('viewOrders')}
                    >
                        Открыть
                    </Button>
                </FormItem>

            </Group>
        </>
    )
}

export default withRouter(Admin)