import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AlsoViewedItem from '../../client/src/components/AlsoViewedItem';

Enzyme.configure({ adapter: new Adapter() });

describe('AlsoViewedItem Component', () => {
  test('renders component', () => {
    const props = {};
    props.alsoViewedItem = {
      id: 1,
      image: 'https://picsum.photos/id/1/200/200',
      title: 'Fantastic Granite Shirt',
      itemurl: 'https://picsum.photos/id/1/200/200',
      oldprice: null,
      currentprice: 5480.8,
      freeshipping: 1,
      shippingcost: null,
      categoryid: 1,
    };
    props.click = true;
    const wrapper = shallow(<AlsoViewedItem {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});
