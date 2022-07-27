import React, {useEffect} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Button,
    Group,
    IconButton,
    PanelHeader,
    PanelHeaderBack,
    Div,
    Placeholder,
    SimpleCell, Spinner,
    Avatar
} from "@vkontakte/vkui";
import {
    Icon28CheckCircleOutline, Icon28DeleteOutlineAndroid,
} from "@vkontakte/icons";
import {useSelector} from "react-redux";
import api from "../../../components/apiFunc";

function ViewReviews({router, openSnackbar, getReviews, reviews, loading}) {
    const storage = useSelector((state) => state.main)

    async function deleteReview(data) {
        let response = await api(
            "admin/reviews/" + data.id,
            "DELETE"
        );

        if (response.response) {
            openSnackbar('Отзыв удалён!', <Icon28CheckCircleOutline className='snack_suc'/>)
            getReviews()
        }
    }

    async function approveReview(data) {
        let response = await api(
            "admin/reviews/" + data.id,
            "PATCH"
        );

        if (response.response) {
            openSnackbar('Отзыв одобрен!', <Icon28CheckCircleOutline className='snack_suc'/>)
            getReviews()
        }
    }

    useEffect(() => {
        getReviews()
    }, [])

    return (
        <>
            <PanelHeader
                left={
                    <PanelHeaderBack onClick={() => router.toBack()}/>
                }
                separator={storage.isDesktop}
            >
                Управление отзывами
            </PanelHeader>
            <Group>
                {loading ?
                    <Spinner/> :
                    <>
                        <Div style={{
                            marginTop: -10
                        }}>
                            <Button
                                stretched
                                onClick={() => router.toPanel("addReview")}
                                size={'l'}
                            >Новый отзыв</Button>
                        </Div>
                        {reviews.length === 0 ?
                            <Placeholder header='Отзывов ещё нет'/> :
                            reviews.map((el) => {
                                return (
                                    <SimpleCell
                                        disabled
                                        before={<Avatar
                                            src={el.avatar}
                                        />}
                                        after={
                                            <>
                                                <IconButton
                                                    onClick={() => approveReview(el)}
                                                    icon={<Icon28CheckCircleOutline/>}
                                                    style={{marginRight: 10}}
                                                />

                                                <IconButton
                                                    onClick={() => deleteReview(el)}
                                                    icon={<Icon28DeleteOutlineAndroid/>}
                                                />
                                            </>

                                        }
                                        multiline
                                        expandable
                                        description={el.comment}
                                    >
                                        {el.name}, {"⭐️".repeat(el.stars)}
                                    </SimpleCell>
                                )
                            })}
                    </>
                }
            </Group>
        </>
    )
}

export default withRouter(ViewReviews)