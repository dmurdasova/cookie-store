import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox, Collapse, Form, Input, Space } from 'antd';
import { ChangeEvent, useState } from 'react';
import { ITopping } from 'src/domain/entities';
import { ICookieFilter } from 'src/domain/ports';
import { useWidthWatcher } from 'src/secondary';
import './Filter.scss';

const { Panel } = Collapse;

export interface IFliterProps {
    filter: ICookieFilter;
    toppings: readonly ITopping[];
    handleFilterChange: (filter: ICookieFilter | null) => void;
}

const BREAKPOINT = 620;

export function Filter(props: IFliterProps): JSX.Element {
    const { filter, toppings, handleFilterChange } = props;
    const [form] = Form.useForm();

    const [currentFilter, setCurrentFilter] = useState<ICookieFilter>({ ...filter });

    console.log('filter ', filter);
    console.log('current ', currentFilter);

    const width = useWidthWatcher();
    const isMoblie = width < BREAKPOINT;

    const buttonsWidth = { width: isMoblie ? '100%' : 'auto' };

    const handleCurrentFilterChange = <T extends ICookieFilter, K extends keyof ICookieFilter>(
        key: K,
        value: T[K]
    ): void => {
        const updated = { ...currentFilter, [key]: value };
        setCurrentFilter(updated);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {
            target: { value }
        } = event;

        console.log('value ', value);
        handleCurrentFilterChange('term', value);
    };

    const Wrapper = (child: JSX.Element): JSX.Element =>
        isMoblie ? (
            <Collapse style={{ backgroundColor: '#fff' }}>
                <Panel showArrow={false} header="Filters" key="1">
                    {child}
                </Panel>
            </Collapse>
        ) : (
            child
        );

    const FilterForm = (
        <Form className="filter" form={form} layout="vertical">
            <Form.Item label="Search" tooltip={{ title: 'Enter someting...', icon: <SearchOutlined /> }}>
                <Input value={filter.term} onChange={handleInputChange} />
            </Form.Item>

            <Form.Item label="Quick filter">
                <Space direction={isMoblie ? 'vertical' : 'horizontal'} style={{ width: '100%' }}>
                    <Button style={buttonsWidth}>Price: high to low</Button>
                    <Button style={buttonsWidth}>Price: low to high</Button>
                    <Button style={buttonsWidth}>Popular first</Button>
                </Space>
            </Form.Item>

            <Form.Item label="Toppings" name="toppingValues">
                <Checkbox.Group>
                    {toppings.map((topping: ITopping) => {
                        const checked = !!filter.selectedToppings.find((id: number) => id === topping.id);

                        return (
                            <Checkbox key={topping.id} value={topping.id} checked={checked}>
                                {topping.name}
                            </Checkbox>
                        );
                    })}
                </Checkbox.Group>
            </Form.Item>

            <Form.Item>
                <Space direction={isMoblie ? 'vertical' : 'horizontal'} style={{ width: '100%' }}>
                    <Button
                        style={buttonsWidth}
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={() => handleFilterChange(filter)}>
                        Search
                    </Button>
                    <Button style={buttonsWidth} icon={<DeleteOutlined />} onClick={() => handleFilterChange(null)}>
                        Clear
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );

    return Wrapper(FilterForm);
}
