import test from 'ava';
import MyComponent from '../src';
import React from 'react'
import { shallow, mount } from 'enzyme';

test('component renders correctly',t=>{
  const wrapper = shallow(<MyComponent/>);
  t.is(wrapper.find('p').length,1);
});
