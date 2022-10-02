import React, {useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Div,
    Group, Link,
    List,
    PanelHeader,
    PanelHeaderBack,
    SimpleCell,
    Text
} from "@vkontakte/vkui";
import {Icon28ChevronDownOutline, Icon28ChevronUpOutline} from "@vkontakte/icons";

function About({router, storage}) {
    const [contacts, setContacts] = useState(false)
    const [obmen, setObmen] = useState(false)
    const [dostavka, setDostavka] = useState(false)
    const [oplata, setOplata] = useState(false)
    const [about, setAbout] = useState(false)

    return(
        <>
        <PanelHeader
            left={
                <PanelHeaderBack onClick={router.toBack}/>
            }
        >
            Информация
        </PanelHeader>
        <Group>
            <SimpleCell
                after={!about ? <Icon28ChevronDownOutline/> : <Icon28ChevronUpOutline/>}
                style={{marginTop: 5}}
                onClick={() => setAbout(!about)}
                activeEffectDelay={100}
            >
                Как работает
            </SimpleCell>
            {about &&
            <Div style={{marginLeft: 10}}>
                <List>
                    <Text>
                        Заказ поступает уведомлением в личные сообщения администратора группы с заказом и контактами покупателя.<br/>
                        Продавец отправляет заказ СДЭКом (наложенным платежом).
                    </Text>
                </List>
            </Div>
            }
            <SimpleCell
                after={!contacts ? <Icon28ChevronDownOutline/> : <Icon28ChevronUpOutline/>}
                style={{marginTop: 5}}
                onClick={() => setContacts(!contacts)}
                activeEffectDelay={100}
            >
                Контакты
            </SimpleCell>
            {contacts &&
                <Div style={{marginLeft: 10}}>
                    <List>
                        <Text>
                            Телефон {
                            !storage.isDesktop ?
                                <a target='_blank' rel="noopener noreferrer" href='tel:89251711819'>8 (925) 17 11 819</a> :
                                <span style={{userSelect: 'all'}}>8 (925) 17 11 819</span>
                            } <br/>
                            ООО "СВИТ ХОЛДИНГ" <br/>
                            ОГРН: 1187746584960 <br/>
                            ИНН/КПП: 9701112781/770101001 <br/>
                            Юридический адрес: город Москва, Архангельский пер., д. 7 стр. 1, помещ. III, офис 14, этаж 1
                        </Text>
                    </List>
                </Div>
            }
            <SimpleCell
                after={!obmen ? <Icon28ChevronDownOutline/> : <Icon28ChevronUpOutline/>}
                style={{marginTop: 5}}
                onClick={() => setObmen(!obmen)}
                activeEffectDelay={100}
            >
                Обмен и возврат
            </SimpleCell>
            {obmen &&
            <Div style={{marginLeft: 10}}>
                <List>
                    <Text>
                        Для возврата товара необходимо обратиться в сообщения сообщества <Link target='_blank' href='https://vk.com/trendxpressru'>vk.com/trendxpressru</Link><br/>
                        Вы имеете право на обмен или возврат товара надлежащего качества без объяснения причин, если он не
                        подходит Вам по форме, фасону, расцветке, размеру при условии, что: <br/> <br/>
                        Товар имеет надлежащий товарный вид; <br/>
                        Сохранены все ярлыки; <br/>
                        Претензия была подана не позднее, чем через 14 календарных дней с момента покупки (не считая дня совершения
                        покупки). <br/> <br/>
                        В таком случае возврат или обмен производится за счет клиента. <br/>
                        В случае, если товар ненадлежащего качества, тогда обмен происходит за наш счет. <br/>
                        Интернет-магазин TRENDXPRESS берет на себя все обязательства и оплачивает поездки курьера к клиенту по Москве и
                        отправление товара клиенту в регионы, если: <br/> <br/>
                        Претензия предъявлена до истечения гарантийного срока (14 дней, не считая дня покупки); <br/>
                        Обнаруженный брак не является следствием неправильной, неаккуратной эксплуатации (носки) товара. <br/> <br/>
                        <b>Любой обмен происходит в течение 2 недель с момента получения товара клиентом.</b> <br/> <br/>
                        По Москве возврат и обмен происходят в тот момент, когда курьер повторно приезжает к клиенту с новым товаром и
                        забирает не подошедший; <br/>
                        В регионах клиент отправляет назад не подошедший товар, а Интернет-магазин TRENDXPRESS отправляет новый товар или
                        возвращает денежную сумму не позднее, чем через 10 рабочих дней со дня возврата товара. <br/> <br/>
                        Согласно закону РФ «О защите прав потребителей» (закон о правах потребителя) от 07.02.1992 М 2300-1 отсутствие чека не
                        является основанием для отказа в возврате товара. <br/> <br/>
                        <b>Категории товара, которые не подлежат возврату, а только обмену, в случае ненадлежащего качества:</b> <br/> <br/>
                        Непериодические издания (книги, брошюры, альбомы, картографические и нотные издания, листовые издания, календари,
                        буклеты, издания, воспроизведенные на технических носителях информации); <br/>
                        Чулочно-носочные изделия; <br/>
                        Постельное белье с невскрытой упаковкой принимается.
                    </Text>
                </List>
            </Div>
            }
            <SimpleCell
                after={!dostavka ? <Icon28ChevronDownOutline/> : <Icon28ChevronUpOutline/>}
                style={{marginTop: 5}}
                onClick={() => setDostavka(!dostavka)}
                activeEffectDelay={100}
            >
                Доставка
            </SimpleCell>
            {dostavka &&
            <Div style={{marginLeft: 10}}>
                <List>
                    <Text>
                        <h3 style={{marginTop: -10, marginBottom: -20}}>Доставка:</h3> <br/> <br/>
                        Курьерская доставка оформляется через компанию <a rel="noopener noreferrer" href='https://cdek.ru' target='_blank'>www.cdek.ru</a> <br/>
                        Цена доставки зависит от города назначения и веса заказа. <br/> <br/>
                        <b>Доставляем курьером, с оплатой за товар при получении, почти во все точки России.</b><br/> <br/>
                        Срок доставки зависит от города назначения. <br/> <br/>
                        Минимальный возможный срок доставки заказа в Москве - в день оформления заказа, однако, в среднем мы доставляем
                        заказы по Москве через 1-2 рабочих дня. <br/> <br/>
                        После того, как Ваш заказ поступает в Службу доставки, мы отправляем Вам уведомление об этом по электронной почте,
                        указанной при оформлении заказа. Далее с Вами контактирует Служба доставки. <br/> <br/>
                        Если отправка заказа осуществляется почтой, то расчет происходит по тарифам Почты России.
                        Минимальный возможный срок отправки заказа Почтой России из Москвы - в день оформления заказа, однако, в среднем
                        мы отправляем заказы почтой через 1-4 рабочих дня после поступления оплаты за заказ. <br/> <br/>
                        <h3 style={{marginTop: -5}}>Cамовывоз:</h3>
                        Забрать свой заказ самостоятельно Вы можете во всех городах, в которые мы доставляем заказы с курьером. <br/> <br/>
                        Полная стоимость услуги самовывоза рассчитывается автоматически и отображается на странице оформления заказа
                        Срок доставки заказа в Пункт Выдачи Заказов (ПВЗ) зависит от города назначения <br/> <br/>
                        Минимальный возможный срок доставки заказа в ПВЗ в Москве - на следующий рабочий день после оформления заказа,
                        однако, в среднем мы доставляем заказы в ПВЗ по Москве через 1-4 рабочих дня <br/> <br/>
                        Отследить свой заказ, если отправка компанией СДЭК, вы можете по ссылке <a href='https://www.cdek.ru/ru/tracking' target='_blank' rel="noopener noreferrer">https://www.cdek.ru/ru/tracking</a>.
                    </Text>
                </List>
            </Div>
            }
            <SimpleCell
                after={!oplata ? <Icon28ChevronDownOutline/> : <Icon28ChevronUpOutline/>}
                style={{marginTop: 5}}
                onClick={() => setOplata(!oplata)}
                activeEffectDelay={100}
            >
                Оплата
            </SimpleCell>
            {oplata &&
            <Div style={{marginLeft: 10}}>
                <List>
                    <Text>
                        Как можно оплатить заказ: <br/>
                        1. Банковские карты Visa/Mastercard <br/>
                        2. VK Pay <br/> <br/>
                        Проведение оплаты происходит переводом сообществу <Link target='_blank' href='https://vk.com/trendxpressru'>vk.com/trendxpressru</Link> после оформления заказа<br/> <br/>
                        Безопасность онлайн платежей <br/> <br/>
                        Предоставляемая Вами персональная информация (имя, адрес, телефон, email, номер кредитной карты) является
                        конфиденциальной и не подлежит разглашению. Юкасса обрабатывает транзакции каждую секунду, поэтому мы
                        используем современные средства защиты, обеспечивающие безопасность сервиса и пользовательских данных. Анти- фрод система Юкассы создана специально для электронной коммерции и позволяет тщательно анализировать транзакции
                        и выявлять случаи мошенничества. <br/> <br/>
                        Платежные системы: <br/>
                        <img
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/2560px-Old_Visa_Logo.svg.png'
                            alt=''
                            width={150}
                            height={100}
                            align='center'
                        /> <br/>
                        <img
                            alt=''
                            src='https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo.png'
                            width={150}
                            height={100}
                        />
                    </Text>
                </List>
            </Div>
            }
        </Group>
        </>
    )
}

export default withRouter(About)