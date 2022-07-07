import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {Button, FormItem, Group, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";

function Admin({router}) {
    return(
        <>
        <PanelHeader
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
            </Group>
        </>
    )
}

export default withRouter(Admin)