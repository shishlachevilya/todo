import React, {Component} from 'react';
import List from '../List';
import Tasks from '../Tasks';
import Popup from '../Popup';
import {Route} from 'react-router-dom';

import './app.scss';

import axios from 'axios';

export type TaskType = {
  id: string
  itemId: string
  text: string
  completed: boolean
}

type IconType = {
  path: string
  color: string
}

export type ItemType = {
  id: string
  title: string
  active: boolean
  icon: IconType
  tasks: Array<TaskType>
}

interface IApp {
  items: Array<ItemType>
  itemAll: Array<ItemType>
  itemAdd: Array<ItemType>
  currentTask?: ItemType
  isLoading: boolean
  isVisible: boolean
}

class App extends Component<{}, IApp> {

  state = {
    items: [],
    itemAll: [],
    itemAdd: [],
    currentTask: undefined,
    isLoading: true,
    isVisible: false
  };

  componentDidMount() {
    axios.get('http://localhost:3001/db')
    .then(({data}: any) => {
      this.setState(() => {
        return {
          items: data.items,
          itemAll: data.itemAll,
          itemAdd: data.itemAdd
        }
      })
    });
  }

  handlerOne = () => {
    console.log('handlerOne');
  };

  handlerTwo = (item: ItemType) => {
    this.setState(() => {
      return {
        currentTask: item
      }
    })
  };

  removeTask = (id: string) => {
    if (window.confirm('Удалить задачу?')) {
      axios.delete(`http://localhost:3001/items/${id}`)
      .then(() => {
        const filteredItems = this.state.items.filter((item: ItemType) => item.id !== id);
        this.setState(() => {
          return {
            items: filteredItems
          }
        })
      })
    }
  };

  onTogglePopup = () => {
    this.setState({isVisible: !this.state.isVisible})
  };

  onSubmitHandler = (obj: { value: string, color: string }) => {
    this.setState(() => {
      return {
        isLoading: false
      }
    });

    axios.post('http://localhost:3001/items', {
      icon: {
        path: 'M35 0C15.67 0 0 15.6703 0 35C0 54.3299 15.67 70 35 70C54.3299 70 70 54.3299 70 35C70 15.6703 54.33 0 35 0V0Z',
        color: obj.color,
      },
      title: obj.value,
      tasks: [],
      active: false
    })
    .then(({data}) => {
      const newItems = [
        ...this.state.items,
        data
      ];

      this.setState(() => {
        return {
          items: newItems
        }
      });
    })
    .catch(() => alert('Произошла ошибка'))
    .finally(() => {
      this.setState(() => {
        return {
          isLoading: true
        }
      });
    });
  };

  onChangeTitle = (title: string, itemId: string) => {
    const newItems = this.state.items.filter((item: ItemType) => {
      if (item.id === itemId) {
        item.title = title;
      }
      return item;
    });

    this.setState(() => {
      return {
        items: newItems
      }
    })
  };

  onAddNewTask = (id: string, obj: TaskType) => {
    const newList = this.state.items.map((item: ItemType) => {
      if (item.id === obj.itemId) {
        item.tasks = [...item.tasks, obj];
      }

      return item;
    });

    axios.patch(`http://localhost:3001/items/${id}`, this.state.currentTask)
    .catch(() => alert('Произошла ошибка!'));

    this.setState({items: newList});
  };

  render() {
    const {items, isVisible, isLoading, itemAll, itemAdd, currentTask} = this.state;

    return (
      <div className='app'>
        <div className='app__sidebar'>
          <List
            clickHandler={this.handlerOne}
            items={itemAll}
          />

          <List
            clickHandler={this.handlerTwo}
            clickRemoveHandler={this.removeTask}
            activeItem={currentTask}
            items={items}
            isRemovable
          />

          <List
            clickHandler={this.onTogglePopup}
            items={itemAdd}
          />

          {isVisible && <Popup
            isLoading={isLoading}
            closePopup={this.onTogglePopup}
            onSubmitHandler={this.onSubmitHandler}
          />}
        </div>

        <div className='app__content'>
          <Route exact path='/'>
            {items && items.map((item) => {
              return (
                <Tasks
                  onChangeTitle={this.onChangeTitle}
                  onAddNewTask={this.onAddNewTask}
                  task={item}
                />
              )
            })}
          </Route>
          {/*{currentTask ?*/}
          {/*  <Tasks*/}
          {/*    onChangeTitle={this.onChangeTitle}*/}
          {/*    onToggleShowForm={this.onToggleShowForm}*/}
          {/*    onAddNewTask={this.onAddNewTask}*/}
          {/*    task={currentTask}*/}
          {/*    isShow={isShow}*/}
          {/*  />*/}
          {/*  :*/}
          {/*  'выбери задачу'}*/}
        </div>
      </div>
    );
  }
}

export default App;
