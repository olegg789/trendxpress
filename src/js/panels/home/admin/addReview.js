import React, {useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Button, Slider, Div,
    FixedLayout,
    FormItem,
    FormLayout,
    Group,
    Input,
    PanelHeader,
    PanelHeaderBack,
    Textarea
} from "@vkontakte/vkui";
import {
    Icon28AddCircleOutline,
    Icon28CancelCircleOutline,
    Icon28CheckCircleOutline
} from "@vkontakte/icons";
import api from "../../../components/apiFunc";
import {useSelector} from "react-redux";

function AddReview({router, getReviews, openSnackbar}) {
    const storage = useSelector((state) => state.main)

    const [link, setLink] = useState('')
    const [comment, setComment] = useState('')
    const [stars, setStars] = useState(1)

    async function addReview() {
        try {
            let res = await api(
                "admin/reviews",
                'POST',
                {
                    'link': link,
                    'comment': comment,
                    'stars': Number(stars)
                }
            )
            if (res.response) {
                router.toBack()
                getReviews()
                openSnackbar('Отзыв добавлен!!', <Icon28CheckCircleOutline className='snack_suc'/>)
            } else {
                if (res.error.code === 6) {
                    openSnackbar('Не нашли такого пользователя в сервисе', <Icon28CancelCircleOutline
                        className='snack_err'/>)
                }
            }
        } catch (err) {
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
                Новый отзыв
            </PanelHeader>
            <Group>
                <FormLayout id='createItem'>
                    <FormItem top='Страница человека (ссылка)' style={{marginTop: -10}}>
                        <Input
                            value={link}
                            onChange={(e) => {
                                if (e.currentTarget.value.length > 200) return
                                setLink(e.currentTarget.value)
                            }}
                            placeholder='https://vk.com/this.state.developer'
                            maxLength={200}
                        />
                    </FormItem>

                    <FormItem top='Комментарий' style={{marginTop: -10}}>
                        <Textarea
                            value={comment}
                            maxLength={1000}
                            onChange={(e) => {
                                setComment(e.currentTarget.value)
                            }}
                            placeholder='Всё супер!'
                        />
                    </FormItem>

                    <FormItem top={`Оценка: ${"⭐️".repeat(stars)}`}>
                        <Slider
                            step={1}
                            min={1}
                            max={5}
                            value={Number(stars)}
                            onChange={setStars}
                        />
                    </FormItem>

                </FormLayout>

                <FixedLayout vertical='bottom' filled className={storage.isDesktop ? 'fixedLayoutCart' : ''}>
                    <Div>
                        <Button
                            size='l'
                            stretched
                            onClick={() => addReview()}
                            before={<Icon28AddCircleOutline/>}
                            disabled={
                                !link || !comment || !stars
                            }
                        >
                            Добавить
                        </Button>
                    </Div>
                </FixedLayout>

            </Group>
        </>
    )
}

export default withRouter(AddReview)