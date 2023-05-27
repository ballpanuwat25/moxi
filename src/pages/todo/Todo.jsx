import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './Todo.css'

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: '1rem 1rem 1rem 0',
  margin: '0 1.5rem .5rem 0',
  borderBottom: '1px solid black',

  ...draggableStyle,
});

const getListStyle = () => ({
  padding: '8px 0 0 0',
  width: '100%',
  height: '100%',
});

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedCompleted = JSON.parse(localStorage.getItem("completed")) || [];

    setTasks(storedTasks);
    setCompleted(storedCompleted);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [tasks, completed]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const reorderedItems = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === 'droppable') {
        setTasks(reorderedItems);
      } else {
        setCompleted(reorderedItems);
      }

    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setTasks(result.droppable);
      setCompleted(result.droppable2);
    }
  };

  const getList = (id) => {
    if (id === 'droppable') {
      return tasks;
    } else {
      return completed;
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    datetime: "",
    color: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      const updatedTasks = tasks.map((item) =>
        item.id === formData.id ? formData : item
      );

      const updatedCompleted = completed.map((item) =>
        item.id === formData.id ? formData : item
      );

      setTasks(updatedTasks);
      setCompleted(updatedCompleted);

      setIsEditing(false);
    } else {
      const newTask = {
        ...formData,
        id: new Date().getTime().toString(),
      };
      setTasks([...tasks, newTask]);
    }
    setFormData({
      id: "",
      name: "",
      datetime: "",
      color: "",
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
      name: "",
      datetime: "",
      color: "",
    });
  };

  const handleDelete = (itemId) => {
    const updatedTasks = tasks.filter((item) => item.id !== itemId);
    const updatedCompleted = completed.filter((item) => item.id !== itemId);

    setTasks(updatedTasks);
    setCompleted(updatedCompleted);

  };

  const handleComplete = (task) => {
    const updatedTasks = tasks.filter((item) => item.id !== task.id);
    const updatedCompleted = [...completed, task];

    setTasks(updatedTasks);
    setCompleted(updatedCompleted);
  };

  const countCompletedTasks = () => {
    const unCompletedTasks = tasks.length;
    const completedTasks = completed.length;
    const totalTasks = unCompletedTasks + completedTasks;

    return `${completedTasks}/${totalTasks}`
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

  const filteredTasks = searchTerm
    ? tasks.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : tasks;

  const filteredCompleted = searchTerm
    ? completed.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : completed;

  return (
    <div className="todo-container">
      <div className="todo-header">
        <NavLink end to="/" className="footer-prev underline">
          <div className="todo-header-title">TO-DO</div>
        </NavLink>
        <div className="todo-header-group">
          <div className="todo-header-icon">
            <i className='bx bx-search' ></i>
          </div>
          <input
            type="text"
            placeholder="search"
            className="todo-search"
            value={searchTerm}
            onChange={handleSearch}
          />

        </div>
      </div>

      <div className="todo-main">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="todo-main-left">

            <div className="todo-main-list">
              <span className="todo-main-list-highlight">List </span>
              Add your tasks.
            </div>

            <form onSubmit={handleSubmit}>

              <div className="todo-addtask-input">
                <label className="todo-task-text">Topic:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}

                  className="todo-task-input"
                />

                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}

                  className="todo-color-input"
                />
              </div> <br />

              <div className="todo-deadline-input">
                <label className="todo-deadline-text">Deadline:</label>
                <input
                  type="datetime-local"
                  name="datetime"
                  value={formData.datetime}
                  onChange={handleInputChange}

                  className="todo-datetime-input"
                />

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

            </form>
            <div className="todo-tasks-display-left">
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {filteredTasks.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >

                            <div className="todo-taskname-group">
                              {item.name}
                              <div className="todo-button-group">
                                <button className="todo-done-button underline" onClick={() => handleComplete(item)}>Done</button>
                                <button className="todo-edit-button" onClick={() => handleEdit(item)}><i className='bx bxs-pencil'></i></button>
                                <button className="todo-delete-button" onClick={() => handleDelete(item.id)}><i className='bx bxs-trash-alt'></i></button>
                              </div>
                            </div>

                            <div className="todo-datetime-group">
                              {item.datetime && (
                                <span>
                                  {new Date(item.datetime).toLocaleTimeString("en-US", {
                                    hour12: false,
                                    hour: "numeric",
                                    minute: "numeric",
                                  })}
                                  ,{" "}
                                  {new Date(item.datetime).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              )}
                              <div style={{ backgroundColor: item.color, width: "25px", height: "25px", marginLeft: ".75rem" }}></div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
          <div className="todo-main-right">
            <div className="todo-main-list">
              <span className="todo-main-list-highlight">Done </span>
              when your tasks completed.
            </div>

            <div className="todo-tasks-completed">
              <label>Completed</label>
              <div>{countCompletedTasks()}</div>
            </div>

            <div className="todo-tasks-display-right">
              <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {filteredCompleted.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >

                            <div className="todo-taskname-group">
                              {item.name}
                              <div className="todo-button-group">
                                <button className="todo-done-button underline" onClick={() => handleComplete(item)}>Done</button>
                                <button className="todo-edit-button" onClick={() => handleEdit(item)}><i className='bx bxs-pencil' ></i></button>
                                <button className="todo-delete-button" onClick={() => handleDelete(item.id)}><i className='bx bxs-trash-alt'></i></button>
                              </div>
                            </div>

                            <div className="todo-datetime-group">
                              {item.datetime && (
                                <span>
                                  {new Date(item.datetime).toLocaleTimeString("en-US", {
                                    hour12: false,
                                    hour: "numeric",
                                    minute: "numeric",
                                  })}
                                  ,{" "}
                                  {new Date(item.datetime).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              )}
                              <div style={{ backgroundColor: item.color, width: "25px", height: "25px", marginLeft: ".75rem" }}></div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>

      <div className="footer">
        <NavLink end to="/" className="footer-prev underline">

          <i className='bx bx-left-arrow-alt'></i>

          <label className="footer-prev-text">Home</label>
        </NavLink>

        <NavLink to="/classtimer" className="footer-next underline">
          <label className="footer-next-text">Class Timer</label>

          <i className='bx bx-right-arrow-alt' ></i>
        </NavLink>
      </div>
    </div>
  );
}

export default Todo;