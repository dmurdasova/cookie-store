import { SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { ITopping } from 'src/domain/entities';
import { ICookieFilter } from 'src/domain/ports';

export interface IFliterProps {
    filter: ICookieFilter;
    toppings: readonly ITopping[];
    handleFilterChange: (filter: ICookieFilter | null) => void;
}

export function Filter(props: IFliterProps): JSX.Element {
    const { filter, toppings, handleFilterChange } = props;
    const [form] = Form.useForm();

    return (
        <Form form={form} layout="vertical">
            <Form.Item label="Color" name="colorValue">
                <Checkbox.Group>
                    {toppings.map((topping: ITopping) => {
                        const checked = !!filter.selectedToppings.find((id: number) => id === topping.id);

                        return (
                            <Checkbox value={topping.id} checked={checked}>
                                {topping.name}
                            </Checkbox>
                        );
                    })}
                </Checkbox.Group>
            </Form.Item>

            <Form.Item label="Field A" required tooltip="This is a required field">
                <Input placeholder="input placeholder" />
            </Form.Item>

            <Form.Item label="Field B" tooltip={{ title: 'Tooltip with customize icon', icon: <SearchOutlined /> }}>
                <Input placeholder="input placeholder" />
            </Form.Item>

            <Form.Item label="Quick filter">
                <Button>Price: high to low</Button>
                <Button>Price: low to high</Button>
                <Button>Popular first</Button>
            </Form.Item>

            <Form.Item>
                <Button type="primary" icon={<SearchOutlined />} onClick={() => handleFilterChange(filter)}>
                    Search
                </Button>
                <Button onClick={() => handleFilterChange(null)}>Clear</Button>
            </Form.Item>
        </Form>
    );
}
