import React, { FC, useContext, useEffect, useState } from 'react';
import { ReactComponent as Phone } from '../../img/phone.svg';
import { ReactComponent as Mail } from '../../img/mail.svg';
import { Context } from "../../index";

import './panel.css'

interface User {
    name: string,
    phone: string,
    email: string,
    address: string,
    position_name: string,
    department: string,
    hire_date: string
}

const Panel: FC = () => {
    const { store } = useContext(Context);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchData = async (searchQuery: string) => {
        try {
            let response;

            if (searchQuery === '') {
                response = await store.fetchUsers();
            } else {
                response = await store.fetchSortUsers(searchQuery);
            }

            // @ts-ignore
            setUsers(response);
        } catch (error) {
            console.error('Ошибка при загрузке данных', error);
        }
    };

    useEffect(() => {
        fetchData(search);
        // eslint-disable-next-line
    }, [search, store]);


    const handleCardClick = (name: string) => {
        const user = users.find(user => user.name === name);
        setSelectedUser(user || null);
    };

    const handleClosePopup = () => {
        setSelectedUser(null);
    };

    const handlePopupClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClosePopup();
        }
    };

    return (
        <div>
            <header className="search">
                <div className="search-content wrapper">
                    <input
                        className="search-input"
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                        type="text"
                    />
                </div>
            </header>

            <main>
                <section className="cards">
                    <div className="cards-content wrapper">
                        {users.map(({ name, phone, email }, index) => (
                            <article key={index} className="cards-card" onClick={() => handleCardClick(name)}>
                                <h3 className="cards-card-name">{name}</h3>
                                <ul className="cards-card-info">
                                    <li className="cards-card-info-row"><span className="cards-card-info-row-icon"><Phone /></span><small>{phone}</small></li>
                                    <li className="cards-card-info-row"><span className="cards-card-info-row-icon"><Mail /></span><small>{email}</small></li>
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            {selectedUser && (
                <div className="popup" onClick={handlePopupClick}>
                    <div className="popup-content">
                        <span className="popup-close" onClick={handleClosePopup}></span>
                        <h3 className="popup-name">{selectedUser.name}</h3>
                        <ul className="popup-info">
                            <li className="popup-info-row"><h6>Телефон: </h6><p className="popup-info-row-text">{selectedUser.phone}</p></li>
                            <li className="popup-info-row"><h6>Почта: </h6><p className="popup-info-row-text">{selectedUser.email}</p></li>
                            <li className="popup-info-row"><h6>Дата приема: </h6><p className="popup-info-row-text">{selectedUser.hire_date}</p></li>
                            <li className="popup-info-row"><h6>Должность: </h6><p className="popup-info-row-text">{selectedUser.position_name}</p></li>
                            <li className="popup-info-row"><h6>Подразделение: </h6><p className="popup-info-row-text">{selectedUser.department}</p></li>
                        </ul>
                        <div className="popup-description">
                            <h6 className="popup-description-title">Дополнительная информация:</h6>
                            <p className="popup-description-text">Разработчики используют текст в качестве заполнителя макта страницы. Разработчики используют текст в качестве заполнителя макта страницы.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Panel;
