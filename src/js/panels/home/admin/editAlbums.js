import React from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Alert,
    Avatar, Button,
    Div,
    Group,
    IconButton,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
    SimpleCell
} from "@vkontakte/vkui";
import {Icon28CheckCircleOutline, Icon28DeleteOutline, Icon28EditOutline} from "@vkontakte/icons";
import api from "../../../components/apiFunc";
import {useDispatch} from "react-redux";
import {set} from "../../../reducers/mainReducer";

function EditAlbums({router, albums, getAlbums, openSnackbar}) {
    const dispatch = useDispatch()

    async function deleteAlbum(id) {
        try {
            let res = await api(`admin/albums/${id}`, 'DELETE')
            if (res.response) {
                getAlbums()
                openSnackbar('Подборка удалена!', <Icon28CheckCircleOutline className='snack_suc'/>)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    function openAlert(id) {
        router.toPopout(
            <Alert
                actions={[
                    {
                        title: "Удалить",
                        mode: "destructive",
                        autoclose: true,
                        action: () => deleteAlbum(id),
                    },
                    {
                        title: "Отмена",
                        autoclose: true,
                        mode: "cancel",
                    },
                ]}
                onClose={() => router.toPopout()}
                header="Подтверждение"
                text="Вы уверены, что хотите удалить эту подборку?"
            />
        )
    }

    return(
        <>
        <PanelHeader
            left={<PanelHeaderBack onClick={() => router.toBack()}/> }
        >
            Управление подборками
        </PanelHeader>
        <Group>
            <Div>
                <Button
                    size='l'
                    stretched
                    onClick={() => router.toPanel('addAlbum')}
                >
                    Добавить подборку
                </Button>
            </Div>
            {albums.length === 0 ?
            <Placeholder>Подборок ещё нет</Placeholder> :
                albums.map((el) => {
                    return (
                        <SimpleCell
                            before={
                                <Avatar size={48} mode='image' src={el.url}/>
                            }
                            after={
                                <>
                                <IconButton
                                    style={{marginRight: 5}}
                                    onClick={() => {
                                        dispatch(set({key: 'albumInfoAdmin', value: el}))
                                        router.toPanel('editAlbum')
                                    }
                                    }
                                >
                                    <Icon28EditOutline/>
                                </IconButton>
                                <IconButton
                                    onClick={() => openAlert(el.id)}
                                >
                                    <Icon28DeleteOutline className='snack_err'/>
                                </IconButton>
                                </>
                            }
                            disabled
                        >
                            <span style={{whiteSpace: 'pre-line'}}>{el.name}</span>
                        </SimpleCell>
                    )
                })
            }
        </Group>
        </>
    )
}

export default withRouter(EditAlbums)