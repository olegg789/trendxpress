import React, {useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Button,
    Div,
    File,
    FixedLayout,
    FormItem,
    FormLayout,
    Group,
    Input,
    PanelHeader,
    PanelHeaderBack
} from "@vkontakte/vkui";
import api from "../../../components/apiFunc";
import {
    Icon24PictureOutline,
    Icon28CancelCircleOutline,
    Icon28CheckCircleOutline,
    Icon28EditOutline
} from "@vkontakte/icons";

function EditAlbum({router, getAlbums, storage, openSnackbar}) {

    const [name, setName] = useState(storage.albumInfoAdmin.name)
    const [photo, setPhoto] = useState('')
    const [photoUrl, setPhotoUrl] = useState(storage.albumInfoAdmin.url)
    const [albumId, setAlbumId] = useState(storage.albumInfoAdmin.album_id !== null ? storage.albumInfoAdmin.album_id : '')

    async function uploadPhoto(file) {
        try {
            let response = await api(
                "admin/uploads",
                "POST",
                new FormData(document.getElementById("createItem")),
                true
            );
            console.log(response)
            if (response.response) {
                setPhoto(response.id);
            }
            if (!response.response) {
                setPhoto('')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    async function editItem() {
        try {
            let res = await api(
                `admin/albums/${storage.albumInfoAdmin.id}`,
                'PATCH',
                storage.albumInfoAdmin.url !== photoUrl ?
                    {
                        'name': name,
                        'photo_id': photo,
                        'album_ids': Number(albumId)
                    } :
                    {
                        'name': name,
                        'album_id': Number(albumId)
                    }
            )
            if (res.response) {
                console.log('УРА')
                router.toBack()
                getAlbums()
                openSnackbar('Подборка обновлена!', <Icon28CheckCircleOutline className='snack_suc'/>)
            }
            else {
                if (res.error.code === 4) {
                    openSnackbar('Подборка с таким названием уже существует!', <Icon28CancelCircleOutline className='snack_err'/>)
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <PanelHeader
                left={
                    <PanelHeaderBack onClick={() => router.toBack()}/>
                }
                separator={storage.isDesktop}
            >
                Отредактировать подборку
            </PanelHeader>
            <Group>
                <FormLayout id='createItem'>
                    <FormItem top='Название'>
                        <Input
                            value={name}
                            onChange={(e) => {
                                if (e.currentTarget.value.length > 50) return
                                setName(e.currentTarget.value)
                            }}placeholder='Куртка детская'
                            maxLength={50}
                        />
                    </FormItem>

                    <FormItem top='Id подборки (необязательно)'>
                        <Input
                            type='number'
                            value={albumId}
                            onChange={(e) => setAlbumId(e.currentTarget.value)}
                        />
                    </FormItem>

                    <FormItem top='Фото товара'>
                        <File
                            name="photo"
                            before={
                                photo === "" ? (
                                    <Icon24PictureOutline width={28} />
                                ) : (
                                    <Icon28CheckCircleOutline />
                                )
                            }
                            accept="image/x-png,image/png,image/jpeg,image/gif"
                            required
                            stretched
                            controlSize="l"
                            mode={photo === "" ? "secondary" : "primary"}
                            onChange={(e) => {
                                e.preventDefault();
                                uploadPhoto(e.target.files[0]);
                                setPhotoUrl(e.target.files[0])
                            }}
                        >
                            {photo === "" ? "Выберите фото" : "Фото выбрано"}
                        </File>
                    </FormItem>

                </FormLayout>

                <FixedLayout vertical='bottom' filled className={storage.isDesktop ? 'fixedLayoutCart' : ''}>
                    <Div>
                        <Button
                            size='l'
                            stretched
                            onClick={() => editItem()}
                            before={<Icon28EditOutline/>}
                            disabled={
                                name.length === 0
                            }
                        >
                            Обновить
                        </Button>
                    </Div>
                </FixedLayout>

            </Group>
        </>
    )
}

export default withRouter(EditAlbum)