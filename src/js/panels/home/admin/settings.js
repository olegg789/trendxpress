import React, {useEffect} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    CustomSelect,
    FormItem,
    Group,
    PanelHeader,
    PanelHeaderBack,
    Spinner
} from "@vkontakte/vkui";
import {
    Icon28CheckCircleOutline,
} from "@vkontakte/icons";
import {useSelector} from "react-redux";
import api from "../../../components/apiFunc";

let sortByOptions = [
    {
        label: "По цене",
        value: 0,
    },
    {
        label: "Количеству продаж",
        value: 1,
    },
    {
        label: "Новизне",
        value: 2,
    }
]

function Settings({router, openSnackbar, getSettings, settings, loading}) {
    const storage = useSelector((state) => state.main)

    async function changeSettings(data) {
        let response = await api(
            "admin/settings",
            "PATCH",
            {
                ...data
            }
        );

        if (response.response) {
            openSnackbar('Настройки сохранены!', <Icon28CheckCircleOutline className='snack_suc'/>)
        }
    }

    useEffect(() => {
        getSettings()
    }, [])

    return (
        <>
            <PanelHeader
                left={
                    <PanelHeaderBack onClick={() => router.toBack()}/>
                }
                separator={storage.isDesktop}
            >
                Настройки
            </PanelHeader>
            <Group>
                {loading ?
                    <Spinner/> :
                    <>
                        <FormItem top="Сортировка товаров">
                            <CustomSelect
                                placeholder="Не выбрано"
                                options={sortByOptions}
                                value={+settings.sortBy}
                                onChange={(e) => {
                                    settings.sortBy = +e.currentTarget.value
                                    changeSettings({
                                        sortBy: +e.currentTarget.value
                                    })
                                }}
                            />
                        </FormItem>
                    </>
                }
            </Group>
        </>
    )
}

export default withRouter(Settings)