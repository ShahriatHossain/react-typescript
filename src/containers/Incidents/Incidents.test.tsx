import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Incidents } from './Incidents';
import { Filter } from '../../components/UI/Filter/Filter';
import Incident from '../../components/Incident/Incident';
import CommonHeader from '../../components/UI/CommonHeader/CommonHeader';

configure({ adapter: new Adapter() });

describe('<Incidents />', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallow(<Incidents loading={false}  incidents={[{}]} location={{}} onFetchIncidents={() => { }} />);
    });

    it('should render <CommonHeader />', () => {
        expect(wrapper.find(CommonHeader)).toHaveLength(1);
    });

    it('should render <Filter />', () => {
        expect(wrapper.find(Filter)).toHaveLength(1);
    });

    it('should render <Incident />', () => {
        wrapper.setState({ currentIncidents: [{}] });
        expect(wrapper.find(Incident)).toHaveLength(1);
    });
});