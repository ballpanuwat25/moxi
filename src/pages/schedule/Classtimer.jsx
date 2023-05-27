import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { NavLink } from 'react-router-dom'

import 'swiper/css';
import "swiper/css/scrollbar";
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

import './Classtimer.css'

function Classtimer() {
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem("items");

        if (storedItems) {
            return JSON.parse(storedItems);
        } else {
            return [];
        }
    });

    const [activeSlide, setActiveSlide] = useState(() => {
        const storedSlide = localStorage.getItem('activeSlide');
        return storedSlide ? parseInt(storedSlide) : 0;
    });

    const [formData, setFormData] = useState({
        id: "",
        course: "",
        column: "",
        classroom: "",
        classtime: "",
    });

    const [searchTerm, setSearchTerm] = useState('');

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
        localStorage.setItem('activeSlide', activeSlide);
    }, [items, activeSlide]);

    const handleSlideChange = (swiper) => {
        setActiveSlide(swiper.realIndex);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            const updatedItems = items.map((item) =>
                item.id === formData.id ? formData : item
            );
            setItems(updatedItems);
            setIsEditing(false);
        } else {
            const newItem = {
                ...formData,
                id: new Date().getTime().toString(),
            };
            setItems([...items, newItem]);
        }
        setFormData({
            id: "",
            course: "",
            column: "",
            classroom: "",
            classtime: "",
        });
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setFormData(item);
    };

    const handleCancel = () => {
        setIsEditing(false)
        setFormData({
            id: "",
            course: "",
            column: "",
            classroom: "",
            classtime: "",
        });
    };

    const handleDelete = (itemId) => {
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
    };

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode) {
            setDarkMode(JSON.parse(savedDarkMode));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        switchColors();
    }, [darkMode]);

    const switchColors = () => {
        const root = document.documentElement;
        if (darkMode) {
            root.style.setProperty('--first-color', '#101010');
            root.style.setProperty('--second-color', '#dddddd');
        } else {
            root.style.setProperty('--first-color', '#dddddd');
            root.style.setProperty('--second-color', '#101010');
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCourse = searchTerm
        ? items.filter((item) =>
            item.course.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : items;

    return (
        <div className="classtimer-container">
            <div className="classtimer-header">
                <NavLink end to="/" className="footer-prev underline">
                    <div className="classtimer-header-title">Class Timer</div>
                </NavLink>
                <div className="classtimer-header-group">
                    <div className="classtimer-header-icon">
                        <i className='bx bx-search' ></i>
                    </div>
                    <input
                        type="text"
                        placeholder="search"
                        className="classtimer-search"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="classtimer-main">
                <form onSubmit={handleSubmit} className="classtimer-form">

                    <div className="classtimer-form-group">
                        <label> Course: </label>
                        <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleInputChange}

                            className="classtimer-input"
                        />
                    </div>

                    <div className="classtimer-form-group">
                        <label> Classroom: </label>
                        <input
                            type="text"
                            name="classroom"
                            value={formData.classroom}
                            onChange={handleInputChange}

                            className="classtimer-input"
                        />
                    </div>

                    <div className="classtimer-form-group">
                        <div className="classtimer-label-group">
                            <label className="classtime-text-show"> Classtime: </label>
                            <label className="classtime-text-hide"> Date: </label>

                            <div className="classtimer-select-opts">
                                <input
                                    type="radio"
                                    name="column"
                                    id="column1"
                                    value="column1"
                                    checked={formData.column === "column1"}
                                    onChange={handleInputChange}

                                    className="classtimer-opt"
                                />

                                <input
                                    type="radio"
                                    name="column"
                                    id="column2"
                                    value="column2"
                                    checked={formData.column === "column2"}
                                    onChange={handleInputChange}

                                    className="classtimer-opt"
                                />

                                <input
                                    type="radio"
                                    name="column"
                                    id="column3"
                                    value="column3"
                                    checked={formData.column === "column3"}
                                    onChange={handleInputChange}

                                    className="classtimer-opt"
                                />

                                <input
                                    type="radio"
                                    name="column"
                                    id="column4"
                                    value="column4"
                                    checked={formData.column === "column4"}
                                    onChange={handleInputChange}

                                    className="classtimer-opt"
                                />

                                <input
                                    type="radio"
                                    name="column"
                                    id="column5"
                                    value="column5"
                                    checked={formData.column === "column5"}
                                    onChange={handleInputChange}

                                    className="classtimer-opt"
                                />
                                <input
                                    type="radio"
                                    name="column"
                                    id="column6"
                                    value="column6"
                                    checked={formData.column === "column6"}
                                    onChange={handleInputChange}

                                    className="classtimer-opt"
                                />

                                <input
                                    type="radio"
                                    name="column"
                                    id="column7"
                                    value="column7"
                                    checked={formData.column === "column7"}
                                    onChange={handleInputChange}

                                    className="classtimer-opt"
                                />
                            </div>
                        </div>

                        <div className="classtime-timer-group">
                            <input
                                type="time"
                                name="classtime"
                                value={formData.classtime}
                                onChange={handleInputChange}

                                className="classtimer-input"
                            />

                            <div className="todo-button-group">
                                <button className="todo-buttons" type="submit">
                                    {isEditing ?

                                        <div className="todo-update-button">
                                            <i className='bx bx-check'></i>
                                        </div>
                                        :
                                        <div className="todo-add-button">
                                            <i className='bx bx-plus'></i>
                                        </div>

                                    }

                                </button>

                                {isEditing && (
                                    <button className="cancel-button" type="button" onClick={() => handleCancel()}>
                                        <i className='bx bx-x'></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="classtimer-form-group-hide">
                        <label className="classtime-text-hide">Classtime:</label>
                        <div className="classtime-timer-group-hide">
                            <input
                                id="myDateTimeInput"
                                type="time"
                                name="classtime"
                                value={formData.classtime}
                                onChange={handleInputChange}

                                className="classtimer-input"
                            />

                            <div className="todo-button-group">
                                <button className="todo-buttons" type="submit">
                                    {isEditing ?

                                        <div className="todo-update-button">
                                            <i className='bx bx-check'></i>
                                        </div>
                                        :
                                        <div className="todo-add-button">
                                            <i className='bx bx-plus'></i>
                                        </div>

                                    }

                                </button>

                                {isEditing && (
                                    <button className="cancel-button" type="button" onClick={() => handleCancel()}>
                                        <i className='bx bx-x'></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                </form>

                <div className="classtimer-display-columns">
                    <Swiper
                        loop={true}
                        grabCursor={true}
                        onSlideChange={handleSlideChange}
                        initialSlide={activeSlide}
                        slidesPerView={3}
                        spaceBetween={30}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            1200: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1500: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className="classtimer-column">
                                <div className="classtimer-day-text">MONDAY</div>
                                <div className="classtimer-course-display">
                                    {filteredCourse.map(
                                        (item) =>
                                            item.column === "column1" && (
                                                <div className="item" key={item.id}>
                                                    <div className="item-tab-mon"></div>
                                                    <div className="item-group">
                                                        <div className="item-course">
                                                            <span className="item-course-text">{item.course}</span>
                                                            <div className="item-button-group">
                                                                <button className="item-edit-button" onClick={() => handleEdit(item)}><i className='bx bxs-pencil sm'></i></button>
                                                                <button className="item-delete-button" onClick={() => handleDelete(item.id)}><i className='bx bxs-trash-alt sm'></i></button>
                                                            </div>
                                                        </div>

                                                        <div className="item-class">
                                                            <span className="item-class-text">{item.classroom}</span>
                                                            <span className="item-class-text">{item.classtime}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="classtimer-column">
                                <div className="classtimer-day-text">TUESDAY</div>
                                <div className="classtimer-course-display">
                                    {filteredCourse.map(
                                        (item) =>
                                            item.column === "column2" && (
                                                <div className="item" key={item.id}>
                                                    <div className="item-tab-tue"></div>
                                                    <div className="item-group">
                                                        <div className="item-course">
                                                            <span className="item-course-text">{item.course}</span>
                                                            <div className="item-button-group">
                                                                <button className="item-edit-button" onClick={() => handleEdit(item)}><i className='bx bxs-pencil sm'></i></button>
                                                                <button className="item-delete-button" onClick={() => handleDelete(item.id)}><i className='bx bxs-trash-alt sm'></i></button>
                                                            </div>
                                                        </div>

                                                        <div className="item-class">
                                                            <span className="item-class-text">{item.classroom}</span>
                                                            <span className="item-class-text">{item.classtime}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="classtimer-column">
                                <div className="classtimer-day-text">WEDNESDAY</div>
                                <div className="classtimer-course-display">
                                    {filteredCourse.map(
                                        (item) =>
                                            item.column === "column3" && (
                                                <div className="item" key={item.id}>
                                                    <div className="item-tab-wed"></div>
                                                    <div className="item-group">
                                                        <div className="item-course">
                                                            <span className="item-course-text">{item.course}</span>
                                                            <div className="item-button-group">
                                                                <button className="item-edit-button" onClick={() => handleEdit(item)}><i className='bx bxs-pencil sm'></i></button>
                                                                <button className="item-delete-button" onClick={() => handleDelete(item.id)}><i className='bx bxs-trash-alt sm'></i></button>
                                                            </div>
                                                        </div>

                                                        <div className="item-class">
                                                            <span className="item-class-text">{item.classroom}</span>
                                                            <span className="item-class-text">{item.classtime}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="classtimer-column">
                                <div className="classtimer-day-text">THURSDAY</div>
                                <div className="classtimer-course-display">
                                    {filteredCourse.map(
                                        (item) =>
                                            item.column === "column4" && (
                                                <div className="item" key={item.id}>
                                                    <div className="item-tab-thu"></div>
                                                    <div className="item-group">
                                                        <div className="item-course">
                                                            <span className="item-course-text">{item.course}</span>
                                                            <div className="item-button-group">
                                                                <button className="item-edit-button" onClick={() => handleEdit(item)}><i className='bx bxs-pencil sm'></i></button>
                                                                <button className="item-delete-button" onClick={() => handleDelete(item.id)}><i className='bx bxs-trash-alt sm'></i></button>
                                                            </div>
                                                        </div>

                                                        <div className="item-class">
                                                            <span className="item-class-text">{item.classroom}</span>
                                                            <span className="item-class-text">{item.classtime}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="classtimer-column">
                                <div className="classtimer-day-text">FRIDAY</div>
                                <div className="classtimer-course-display">
                                    {filteredCourse.map(
                                        (item) =>
                                            item.column === "column5" && (
                                                <div className="item" key={item.id}>
                                                    <div className="item-tab-fri"></div>
                                                    <div className="item-group">
                                                        <div className="item-course">
                                                            <span className="item-course-text">{item.course}</span>
                                                            <div className="item-button-group">
                                                                <button className="item-edit-button" onClick={() => handleEdit(item)}><i className='bx bxs-pencil sm'></i></button>
                                                                <button className="item-delete-button" onClick={() => handleDelete(item.id)}><i className='bx bxs-trash-alt sm'></i></button>
                                                            </div>
                                                        </div>

                                                        <div className="item-class">
                                                            <span className="item-class-text">{item.classroom}</span>
                                                            <span className="item-class-text">{item.classtime}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="classtimer-column">
                                <div className="classtimer-day-text">SATURDAY</div>
                                <div className="classtimer-course-display">
                                    {filteredCourse.map(
                                        (item) =>
                                            item.column === "column6" && (
                                                <div className="item" key={item.id}>
                                                    <div className="item-tab-sat"></div>
                                                    <div className="item-group">
                                                        <div className="item-course">
                                                            <span className="item-course-text">{item.course}</span>
                                                            <div className="item-button-group">
                                                                <button className="item-edit-button" onClick={() => handleEdit(item)}><i className='bx bxs-pencil sm'></i></button>
                                                                <button className="item-delete-button" onClick={() => handleDelete(item.id)}><i className='bx bxs-trash-alt sm'></i></button>
                                                            </div>
                                                        </div>

                                                        <div className="item-class">
                                                            <span className="item-class-text">{item.classroom}</span>
                                                            <span className="item-class-text">{item.classtime}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="classtimer-column">
                                <div className="classtimer-day-text">SUNDAY</div>
                                <div className="classtimer-course-display">
                                    {filteredCourse.map(
                                        (item) =>
                                            item.column === "column7" && (
                                                <div className="item" key={item.id}>
                                                    <div className="item-tab-sun"></div>
                                                    <div className="item-group">
                                                        <div className="item-course">
                                                            <span className="item-course-text">{item.course}</span>
                                                            <div className="item-button-group">
                                                                <button className="item-edit-button" onClick={() => handleEdit(item)}><i className='bx bxs-pencil sm'></i></button>
                                                                <button className="item-delete-button" onClick={() => handleDelete(item.id)}><i className='bx bxs-trash-alt sm'></i></button>
                                                            </div>
                                                        </div>

                                                        <div className="item-class">
                                                            <span className="item-class-text">{item.classroom}</span>
                                                            <span className="item-class-text">{item.classtime}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

            <div className="footer">
                <NavLink to="/todo" className="footer-prev underline">

                    <i className='bx bx-left-arrow-alt'></i>

                    <label className="footer-prev-text">TO-DO</label>
                </NavLink>

                <NavLink to="/memo" className="footer-next underline">
                    <label className="footer-next-text">Memo</label>

                    <i className='bx bx-right-arrow-alt' ></i>
                </NavLink>
            </div>

        </div>
    );
}

export default Classtimer;