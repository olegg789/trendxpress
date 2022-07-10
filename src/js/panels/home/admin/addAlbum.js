import React, {useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Button,
    Div, File, FixedLayout,
    FormItem,
    FormLayout,
    Group,
    Input,
    PanelHeader,
    PanelHeaderBack,
} from "@vkontakte/vkui";
import {
    Icon24PictureOutline,
    Icon28AddCircleOutline,
    Icon28CancelCircleOutline,
    Icon28CheckCircleOutline
} from "@vkontakte/icons";
import {useSelector} from "react-redux";
import api from "../../../components/apiFunc";

function AddAlbum({router, getAlbums, openSnackbar}) {
    const storage = useSelector((state) => state.main)

    const [name, setName] = useState('')
    const [photo, setPhoto] = useState('')
    const [albumId, setAlbumId] = useState('')

    async function uploadPhoto(file) {
        try {
            let response = await api(
                "admin/uploads",
                "POST",
                new FormData(document.getElementById("createAlbum")),
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

    async function addAlbum() {
        try {
            let res = await api(
                "admin/albums",
                'POST',
                albumId.length !== 0 ?
                    {
                        'name': name,
                        'photo_id': photo,
                        'album_id': Number(albumId)
                    } :
                    {
                        'name': name,
                        'photo_id': photo
                    }
            )
            if (res.response) {
                router.toBack()
                getAlbums()
                openSnackbar('Подборка добавлена!', <Icon28CheckCircleOutline className='snack_suc'/>)
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

    return(
        <>
            <PanelHeader
                left={
                    <PanelHeaderBack onClick={() => router.toBack()}/>
                }
            >
                Добавить альбом
            </PanelHeader>
            <Group>
                <FormLayout id='createAlbum'>
                    <FormItem top='Название' style={{marginTop: -10}}>
                        <Input
                            value={name}
                            onChange={(e) => {
                                if (e.currentTarget.value.length > 50) return
                                setName(e.currentTarget.value)
                            }}
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

                    <FormItem top='Фото подборки' style={{marginTop: -10}}>
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
                            onClick={() => addAlbum()}
                            before={<Icon28AddCircleOutline/>}
                            disabled={
                                name.length === 0  || photo.length === 0
                            }
                        >
                            Создать
                        </Button>
                    </Div>
                </FixedLayout>
            </Group>
        </>
    )
}

export default withRouter(AddAlbum)