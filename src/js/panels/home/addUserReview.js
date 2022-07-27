import React, {useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Button, Slider, Div,
    FixedLayout,
    FormItem,
    FormLayout,
    Group,
    PanelHeader,
    PanelHeaderBack,
    Textarea
} from "@vkontakte/vkui";
import {
    Icon28AddCircleOutline,
    Icon28CheckCircleOutline
} from "@vkontakte/icons";
import api from "../../components/apiFunc";
import {useSelector} from "react-redux";

function AddUserReview({router, openSnackbar}) {
    const storage = useSelector((state) => state.main)

    const [comment, setComment] = useState('')
    const [stars, setStars] = useState(1)

    async function addReview() {
        try {
            let res = await api(
                "reviews",
                'POST',
                {
                    'comment': comment,
                    'stars': Number(stars)
                }
            )
            if (res.response) {
                router.toBack()
                openSnackbar('Отзыв отправлен на модерацию!', <Icon28CheckCircleOutline className='snack_suc'/>)
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
                               !comment || !stars
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

export default withRouter(AddUserReview)