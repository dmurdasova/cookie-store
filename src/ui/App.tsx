import { Layout, theme } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { ICookie, ITopping } from '../domain/entities';
import { DEFAULT_COOKIE_FILTER, ICookieFilter } from '../domain/ports';
import { useGetCookies, useGetToppings } from '../secondary';
import './App.scss';
import { Cookie } from './cookie/Cookie';
import { Filter } from './filter/Filter';

const { Header, Sider, Content, Footer } = Layout;

function App() {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [cookies, setCookies] = useState<readonly ICookie[]>([]);
    const [toppings, setToppings] = useState<readonly ITopping[]>([]);
    const [filter, setFilter] = useState<ICookieFilter>(DEFAULT_COOKIE_FILTER);

    const loadCookies = useGetCookies();
    const loadToppings = useGetToppings();

    const {
        token: { colorBgContainer }
    } = theme.useToken();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const data = await loadCookies(filter);
            setCookies(data);
        };

        fetchData();
    }, [filter]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const data = await loadToppings();
            setToppings(data);
        };

        fetchData();
    }, []);

    const handleFilterChange = useCallback(
        (f: ICookieFilter | null) => {
            setFilter(f ?? DEFAULT_COOKIE_FILTER);
        },
        [filter]
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width="30vw" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Filter filter={filter} toppings={toppings} handleFilterChange={handleFilterChange}></Filter>
            </Sider>

            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>Welcome to cookie store</Header>
                <Content className="product-content">
                    <div className="product-content__container">
                        {cookies.map((cookie: ICookie) => (
                            <Cookie key={cookie.id} item={cookie}></Cookie>
                        ))}
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>Cookie Store ©2023 Created by Diana Murdasova</Footer>
            </Layout>
        </Layout>
    );
}

export default App;
