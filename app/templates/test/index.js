import test from 'ava';
import <%= root_component_name %> from '../src';
import React from 'react'
import { shallow, mount } from 'enzyme';

test('component renders correctly',t=>{
  const wrapper = shallow(<<%= root_component_name %>/>);
  t.is(wrapper.find('p').length,1);
});
