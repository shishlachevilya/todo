import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import List from '../List';
import Task from '../Task';
import Popup from '../Popup';
import Title from '../Title';
import AddTask from '../AddTask';
import NotFound from "../NotFound";
import './app.scss';

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
  isLoading: boolean
  isVisible: boolean
}

class App extends Component<{}, IApp> {

  state = {
    items: [],
    isLoading: true,
    isVisible: false
  };

  componentDidMount() {
    axios.get('http://localhost:3001/db')
    .then(({data}: any) => {
      this.setState(() => {
        return {
          items: data.items
        }
      })
    });
  }

  onCompletedTask = (id: string, taskId: string, completed: boolean) => {
    const filteredTasks: Array<ItemType> = this.state.items.map((item: ItemType) => {
      if (item.id === id) {
        item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item
    });

    const activeItem: ItemType | undefined = this.state.items.find((item: ItemType) => item.id === id);

    axios.patch(`http://localhost:3001/items/${id}`, activeItem)
    .catch(() => {
      alert('Произошла ошибка!')
    });

    this.setState({items: filteredTasks});
  };

  onEditTask = (id: string, taskObj: { id: string, text: string }) => {
    const newTaskText: string | null = window.prompt('Изменить название задачи', taskObj.text);

    if (!newTaskText) return;

    const filteredTasks: Array<ItemType> = this.state.items.map((item: ItemType) => {
      if (item.id === id) {
        item.tasks.map((task) => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return item
    });

    const activeItem: ItemType | undefined = this.state.items.find((item: ItemType) => item.id === id);

    axios.patch(`http://localhost:3001/items/${id}`, activeItem)
    .catch(() => {
      alert('Произошла ошибка!')
    });

    this.setState({items: filteredTasks});
  };

  onRemoveTask = (taskId: string, activeCategoryId: string) => {
    if (window.confirm('Удалить задачу?')) {
      const filteredTasks: Array<ItemType> = this.state.items.map((item: ItemType) => {
        if (item.id === activeCategoryId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }

        return item
      });

      const activeItem: ItemType | undefined = this.state.items.find((item: ItemType) => item.id === activeCategoryId);

      axios.patch(`http://localhost:3001/items/${activeCategoryId}`, activeItem)
      .catch(() => {
        alert('Произошла ошибка!')
      });

      this.setState({items: filteredTasks});
    }
  };

  onRemoveCategory = (id: string) => {
    if (window.confirm('Удалить категорию?')) {
      axios.delete(`http://localhost:3001/items/${id}`)
      .then(() => {
        const filteredCategories: Array<ItemType> = this.state.items.filter((item: ItemType) => item.id !== id);
        this.setState({items: filteredCategories})
      })
    }
  };

  onTogglePopup = () => {
    this.setState({isVisible: !this.state.isVisible})
  };

  onSubmitHandler = (obj: { value: string, color: string }) => {
    this.setState({isLoading: false});

    axios.post('http://localhost:3001/items', {
      icon: {
        path: 'M35 0C15.67 0 0 15.6703 0 35C0 54.3299 15.67 70 35 70C54.3299 70 70 54.3299 70 35C70 15.6703 54.33 0 35 0V0Z',
        color: obj.color,
      },
      title: obj.value,
      tasks: []
    })
    .then(({data}) => {
      const newItems = [
        ...this.state.items,
        data
      ];

      this.setState({items: newItems});
    })
    .catch(() => {
      alert('Произошла ошибка');
    })
    .finally(() => {
      this.setState({isLoading: true});
    });
  };

  onChangeTitle = (title: string, itemId: string) => {
    const newItems: Array<ItemType> = this.state.items.filter((item: ItemType) => {
      if (item.id === itemId) {
        item.title = title;
      }
      return item;
    });

    this.setState({items: newItems})
  };

  onAddNewTask = (id: string, obj: TaskType) => {
    const newList: Array<ItemType> = this.state.items.map((item: ItemType) => {
      if (item.id === obj.itemId) {
        item.tasks = [...item.tasks, obj];
      }

      return item;
    });

    const activeItem: ItemType | undefined = this.state.items.find((item: ItemType) => item.id === id);

    axios.patch(`http://localhost:3001/items/${id}`, activeItem)
    .catch(() => {
      alert('Произошла ошибка!')
    });

    this.setState({items: newList});
  };

  render() {
    const {items, isVisible, isLoading} = this.state;

    return (
      <div className='app'>
        <div className='app__sidebar'>
          <Title/>

          <List
            onRemoveCategory={this.onRemoveCategory}
            items={items}
          />

          <AddTask
            clickHandler={this.onTogglePopup}
          />

          {isVisible && <Popup
            isLoading={isLoading}
            closePopup={this.onTogglePopup}
            onSubmitHandler={this.onSubmitHandler}
          />}
        </div>

        <div className='app__content'>
          <Switch>
            <Route exact path='/' render={({match}) =>
              <Task
                match={match}
                onChangeTitle={this.onChangeTitle}
                onAddNewTask={this.onAddNewTask}
                onEditTask={this.onEditTask}
                onCompletedTask={this.onCompletedTask}
                onRemoveTask={this.onRemoveTask}
                items={items}
              />
            }>
            </Route>

            <Route exact path='/task/:id' render={({match}) =>
              <Task
                match={match}
                onChangeTitle={this.onChangeTitle}
                onAddNewTask={this.onAddNewTask}
                onEditTask={this.onEditTask}
                onRemoveTask={this.onRemoveTask}
                onCompletedTask={this.onCompletedTask}
                items={items}
              />
            }>
            </Route>

            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
