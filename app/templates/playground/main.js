import <%= root_component_name %> from '../src';
import React from 'react';
import {render} from 'react-dom';

class Main extends React.Component{
  render(){
    return <div>
      <h1>Welcome</h1>
      <<%= root_component_name %>/>
    </div>;
  }
}

render(<Main/>,document.getElementById('app'));