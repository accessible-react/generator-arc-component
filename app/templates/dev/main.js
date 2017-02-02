import MyComponent from '../src';
import React from 'react';
import {render} from 'react-dom';

class Main extends React.Component{
  render(){
    return <div>
      <h1>Welcome</h1>
      <MyComponent/>
    </div>;
  }
}

render(<Main/>,document.getElementById('app'));
