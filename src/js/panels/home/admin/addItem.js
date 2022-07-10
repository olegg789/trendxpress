import React, {useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Button, Div,
    File, FixedLayout,
    FormItem,
    FormLayout,
    Group,
    Input,
    PanelHeader,
    PanelHeaderBack,
    Textarea
} from "@vkontakte/vkui";
import {
    Icon24PictureOutline,
    Icon28AddCircleOutline,
    Icon28CancelCircleOutline,
    Icon28CheckCircleOutline
} from "@vkontakte/icons";
import api from "../../../components/apiFunc";
import {useSelector} from "react-redux";

function AddItem({router, getMarket, openSnackbar}) {
    const storage = useSelector((state) => state.main)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [photo, setPhoto] = useState('')

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

    async function addItem() {
        try {
            let res = await api(
                "admin/items",
                'POST',
                {
                    'name': name,
                    'description': description,
                    'price': price,
                    'photo_id': photo
                }
            )
            if (res.response) {
                router.toBack()
                getMarket()
                openSnackbar('Товар добавлен!', <Icon28CheckCircleOutline className='snack_suc'/>)
            }
            else {
                if (res.error.code === 4) {
                    openSnackbar('Товар с таким названием уже существует!', <Icon28CancelCircleOutline className='snack_err'/>)
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
            separator={storage.isDesktop}
            left={
                <PanelHeaderBack onClick={() => router.toBack()}/>
                }
            >
            Добавить товар
        </PanelHeader>
            <Group>
                <FormLayout id='createItem'>
                    <FormItem top='Название' style={{marginTop: -10}}>
                        <Input
                            value={name}
                            onChange={(e) => {
                                if (e.currentTarget.value.length > 50) return
                                setName(e.currentTarget.value)
                            }}
                            placeholder='Куртка детская'
                            maxLength={50}
                        />
                    </FormItem>

                    <FormItem top='Описание' style={{marginTop: -10}}>
                        <Textarea
                            value={description}
                            onChange={(e) => {
                                setDescription(e.currentTarget.value)
                            }}
                            placeholder='Размеры: 50, 52, 54'
                        />
                    </FormItem>

                    <FormItem top='Цена' style={{marginTop: -10}}>
                        <Input
                            value={price}
                            onChange={(e) => {
                                if (e.currentTarget.value.length > 10) return
                                setPrice(e.currentTarget.value)
                            }}
                            maxLength={10}
                            type='number'
                            placeholder='100'
                        />
                    </FormItem>

                    <FormItem top='Фото товара' style={{marginTop: -10}}>
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
                            onClick={() => addItem()}
                            before={<Icon28AddCircleOutline/>}
                            disabled={
                                name.length === 0 || price.length === 0 || photo.length === 0
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

export default withRouter(AddItem)