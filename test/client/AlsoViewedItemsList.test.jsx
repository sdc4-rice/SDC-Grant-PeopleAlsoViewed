import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AlsoViewedItemsList from '../../client/src/components/AlsoViewedItemsList';

Enzyme.configure({ adapter: new Adapter() });

describe('AlsoViewedItemsList Component', () => {
  test('renders component', () => {
    const props = {};
    props.alsoViewedItems = [];
    props.startIndex = 0;
    props.endIndex = 0;
    props.click = true;
    const wrapper = shallow(<AlsoViewedItemsList {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});
