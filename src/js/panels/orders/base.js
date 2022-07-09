import React, {useEffect, useState} from "react";
import {withRouter} from "@reyzitwo/react-router-vkminiapps";
import {
    Group,
    PanelHeader,
    Tabs,
    TabsItem
} from "@vkontakte/vkui";
import OrdersList from "./orderslist";

function Orders({router, isDesktop, storage, dispatch}) {
    const [activeTab, setActiveTab] = useState(0)
    const [filter, setFilter] = useState([])

    function filterOrders(status) {
        try {
            if (!status) {
                setFilter(storage.orders)
            }
            else {
                let items = []
                for(let i=0; i<storage.orders.length; i++) {
                    if (status.includes(storage.orders[i].status)) {
                        items.unshift(storage.orders[i])
                    }
                }
                setFilter(items.reverse())
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        filterOrders()
    }, [])

    return(
        <>
            <PanelHeader separator={storage.isDesktop}>Заказы</PanelHeader>
            <Group>
                    <Tabs>
                        <TabsItem
                            selected={activeTab === 0}
                            onClick={() => {setActiveTab(0); filterOrders()}}
                        >
                            Все
                        </TabsItem>
                        <TabsItem
                            selected={activeTab === 1}
                            onClick={() => {setActiveTab(1); filterOrders([0, 1, 3])}}
                        >
                            Активны
                        </TabsItem>
                        <TabsItem
                            selected={activeTab === 2}
                            onClick={() => {setActiveTab(2); filterOrders([2, 4])}}
                        >
                            Завершены
                        </TabsItem>
                    </Tabs>
                <OrdersList orders={filter} dispatch={dispatch}/>
            </Group>
        </>
    )
}

export default withRouter(Orders)