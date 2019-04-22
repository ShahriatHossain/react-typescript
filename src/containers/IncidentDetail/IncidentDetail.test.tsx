import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { IncidentDetail } from './IncidentDetail';
import CommonHeader from '../../components/UI/CommonHeader/CommonHeader';
import IncidentDescribe from '../../components/IncidentDescribe/IncidentDescribe';

configure({ adapter: new Adapter() });

describe('<IncidentDetail />', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallow(<IncidentDetail loading={false} match={{params: {id: 1}}}  location={{}} onFetchIncident={() => { }} />);
    });

    it('should render <CommonHeader />', () => {
        expect(wrapper.find(CommonHeader)).toHaveLength(1);
    });

    it('should render <IncidentDescribe />', () => {
        expect(wrapper.find(IncidentDescribe)).toHaveLength(1);
    });
});