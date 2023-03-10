import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox, CheckboxOptionType, Collapse, Form, Input, Space } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { ITopping } from 'src/domain/entities';
import { ICookieFilter, SortOrder, SortType } from 'src/domain/ports';
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

    const [currentFilter, setCurrentFilter] = useState<ICookieFilter>({} as ICookieFilter);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    console.log(currentFilter);

    useEffect(() => {
        setCurrentFilter(filter);
    }, [filter]);

    const width = useWidthWatcher();
    const isMoblie = width < BREAKPOINT;

    const buttonsWidth = { width: isMoblie ? '100%' : 'auto' };

    const toppingOptions: CheckboxOptionType[] = useMemo(() => {
        return toppings.map((t) => ({ label: t.name, value: t.id } as CheckboxOptionType));
    }, [toppings]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {
            target: { value }
        } = event;

        const updated: ICookieFilter = { ...currentFilter, term: value };
        setCurrentFilter(updated);
    };

    const handleCheckboxChanges = (checkedValues: CheckboxValueType[]): void => {
        const selectedToppings = structuredClone(checkedValues) as number[];
        const updated: ICookieFilter = { ...currentFilter, selectedToppings };
        setCurrentFilter(updated);
    };

    const handleQuickFilter = (selectedButton: string, type: SortType, order?: SortOrder): void => {
        const updated: ICookieFilter = {
            ...currentFilter,
            sortType: type,
            sortOrder: order ?? currentFilter.sortOrder
        };
        setCurrentFilter(updated);
        setSelectedButton(selectedButton);
    };

    const clearFilter = (): void => {
        handleFilterChange(null);
        setSelectedButton(null);
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
                <Input value={currentFilter.term} onChange={handleInputChange} />
            </Form.Item>

            <Form.Item label="Quick filter">
                <Space direction={isMoblie ? 'vertical' : 'horizontal'} style={{ width: '100%' }}>
                    <Button
                        itemID="price-high-low"
                        type={selectedButton === 'price-high-low' ? 'primary' : 'default'}
                        onClick={() => handleQuickFilter('price-high-low', 'price', 'descending')}
                        style={buttonsWidth}>
                        Price: high to low
                    </Button>
                    <Button
                        itemID="price-low-high"
                        type={selectedButton === 'price-low-high' ? 'primary' : 'default'}
                        onClick={() => handleQuickFilter('price-low-high', 'price', 'ascending')}
                        style={buttonsWidth}>
                        Price: low to high
                    </Button>
                    <Button
                        itemID="rating"
                        type={selectedButton === 'rating' ? 'primary' : 'default'}
                        onClick={() => handleQuickFilter('rating', 'rating', 'descending')}
                        style={buttonsWidth}>
                        Popular first
                    </Button>
                </Space>
            </Form.Item>

            <Form.Item label="Toppings" name="toppingValues">
                <Checkbox.Group
                    value={currentFilter.selectedToppings}
                    options={toppingOptions}
                    onChange={handleCheckboxChanges}></Checkbox.Group>
            </Form.Item>

            <Form.Item>
                <Space direction={isMoblie ? 'vertical' : 'horizontal'} style={{ width: '100%' }}>
                    <Button
                        style={buttonsWidth}
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={() => handleFilterChange(currentFilter)}>
                        Search
                    </Button>
                    <Button style={buttonsWidth} icon={<DeleteOutlined />} onClick={() => clearFilter()}>
                        Clear
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );

    return Wrapper(FilterForm);
}
