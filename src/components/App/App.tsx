import React, {Component} from 'react';
import List from '../List';
import Form from '../Form';
import Icon from '../Icon';
import Tasks from '../Tasks';
import axios from 'axios';
import './app.scss';

type TaskType = {
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
  currentTask: ItemType
  isLoading: boolean
  isVisible: boolean
}

class App extends Component<{}, IApp> {

  state = {
    items: [],
    itemAll: [],
    itemAdd: [],
    currentTask: {},
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

  handlerTree = () => {
    this.setState(() => {
      return {
        isVisible: true
      }
    })
  };

  removeTask = (id: string) => {
    if (window.confirm('Удалить задачу?')) {
      axios.delete('http://localhost:3001/items/' + id)
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

  closePopup = () => {
    this.setState(() => {
      return {
        isVisible: false
      }
    })
  };

  onSubmitHandler = (obj: {value: string, color: string}) => {
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
      .finally(() => {
        this.setState(() => {
          return {
            isLoading: true
          }
        });
      });
  };

  render() {
    const {items, isVisible, isLoading, itemAll, itemAdd, currentTask} = this.state;
    console.log(currentTask);

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
            items={items}
            isRemovable
          />

          <List
            clickHandler={this.handlerTree}
            items={itemAdd}
          />

          {isVisible && (
            <div className='popup'>
              <button
                className='popup__close'
                onClick={this.closePopup}
              >
                <Icon
                  viewBox='0 0 15 15'
                  color='#000'
                  path='M8.75256 7.87207L13.7404 12.8599C14.2065 13.326 14.2065 14.0563 13.7404 14.5225C13.2742 14.9886 12.5439 14.9886 12.0778 14.5225L7.08997 9.53467L2.10217 14.5225C1.63603 14.9886 0.905726 14.9886 0.439577 14.5225C-0.0265714 14.0563 -0.0265714 13.326 0.439577 12.8599L5.42737 7.87207L0.439577 2.88428C-0.0265714 2.41813 -0.0265714 1.68783 0.439577 1.22168C0.905726 0.755533 1.63603 0.755533 2.10217 1.22168L7.08997 6.20947L12.0778 1.22168C12.5439 0.755533 13.2742 0.755533 13.7404 1.22168C14.2065 1.68783 14.2065 2.41813 13.7404 2.88428L8.75256 7.87207Z'/>
              </button>

              <Form
                onSubmitHandler={this.onSubmitHandler}
                isLoading={isLoading}
              />
            </div>)}
        </div>

        <div className='app__content'>
          {Object.keys(currentTask).length > 0 && <Tasks task={currentTask}/>}
        </div>
      </div>
    );
  }
}

export default App;
