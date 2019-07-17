import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AlsoViewedItemsCard from '../../client/src/components/AlsoViewedItemsCard';
import AlsoViewedItemsList from '../../client/src/components/AlsoViewedItemsList';

Enzyme.configure({ adapter: new Adapter() });

describe('AlsoViewedItemsCard Component', () => {
  test('renders component', () => {
    const wrapper = shallow(<AlsoViewedItemsCard />);
    expect(wrapper.exists()).toBe(true);
  });

  test('mounts component', () => {
    const wrapper = mount(<AlsoViewedItemsCard />);
    expect(wrapper.children().find(AlsoViewedItemsList).length).toEqual(1);
    expect(wrapper.state().alsoViewedItems).toEqual([]);
  });
});
