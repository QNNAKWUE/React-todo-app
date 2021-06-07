import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { v4 as uuidv4 } from 'uuid';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList'



class App extends Component{
  //the state is a special property in react component. It is an object that contains data that our App need 
  state = {
    items: [],
    id: uuidv4(),
    item: '',
    editItem: false
  }

  handleChange = (e)=>{
    this.setState({
      item: e.target.value
    });
  };

  //This method would accept the event 'e' in order to make changes in the state
  handleSubmit = e =>{
    //To prevent the default behavior of the browser
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item
    };
  
    //using the spread operator to combine the items and newItem arrays
  const updatedItems = [...this.state.items, newItem];

  //we use the setState method to make update to the state object
this.setState({
  items: updatedItems,
  item: '',
  id: uuidv4(),
  editItem: false
})
};

clearList = () =>{
  this.setState({
    items: []
  })
}

handleDelete = (id)=>{
  const filterdItems = this.state.items.filter(item => item.id !== id)
  this.setState({
    items: filterdItems
  });
};

handleEdit = id =>{
  const filterdItems = this.state.items.filter(item => item.id !== id)
  

  const selectedItem = this.state.items.find(item =>
    item.id === id);
    
    console.log(selectedItem);

    this.setState({
      items: filterdItems,
      item: selectedItem.title,
      editItem: true,
      id: id
    });

}
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">todo input</h3>
            <TodoInput 
            item = {this.state.item} 
            handleChange= {this.handleChange} 
            handleSubmit = {this.handleSubmit}
            editItem = {this.state.editItem}
            />
            < TodoList 
            items = {this.state.items} 
            clearList = {this.clearList} 
            handleDelete = {this.handleDelete}
            handleEdit= {this.handleEdit}
            />
        </div>
      </div>
      </div>
    )
  }
}

export default App;
