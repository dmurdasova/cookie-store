import { Card, Image } from 'antd';
import { ICookie } from '../../domain/entities';
import './Cookie.scss';

export interface ICookieProps {
    item: ICookie;
}

const HEIGHT = '220px';

export function Cookie({ item }: ICookieProps): JSX.Element {
    return (
        <Card className="cookie-card" title={item.title}>
            <div className="cookie-body">
                <div className="cookie-body__image">
                    <Image width="100%" height={HEIGHT} src="/cookie.png" preview={false}></Image>
                </div>
                {item.description && (
                    <div className="cookie-body__info">
                        <i>{item.description}</i>
                    </div>
                )}
                <div className="cookie-body__footer">
                    <p>
                        Price: <b>{item.price}</b>
                    </p>
                    <p>
                        Rating: <b>{item.rating ?? 0}</b>
                    </p>
                </div>
            </div>
        </Card>
    );
}
