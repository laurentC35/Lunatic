import React from 'react';
import { shallow, mount } from 'enzyme';
import { CheckboxGroup } from 'components';

describe('checkbox-group', () => {
	const handleChange = jest.fn();
	const responses = [
		{
			id: '1',
			response: { name: 'a', values: { COLLECTED: true } },
			label: 'France',
		},
		{
			id: '2',
			response: { name: 'b', values: { COLLECTED: false } },
			label: 'Italy',
		},
	];
	const defaultProps = { id: 'id', handleChange, responses };

	it('renders without crashing', () => {
		mount(<CheckboxGroup {...defaultProps} keyboardSelection />);
	});

	it('returns tooltip component', () => {
		shallow(<CheckboxGroup {...defaultProps} tooltip />);
	});

	it('returns disabled component', () => {
		shallow(<CheckboxGroup {...defaultProps} label="label" disabled />);
	});

	it('renders firing useEffect', () => {
		const wrapper = mount(<CheckboxGroup {...defaultProps} />);
		wrapper.setProps({ focused: true });
	});

	it('should trigger the change event', () => {
		const wrapper = shallow(<CheckboxGroup {...defaultProps} />);
		wrapper
			.find('input')
			.first()
			.simulate('change', {
				target: {
					checked: false,
				},
			});
		expect(handleChange).toHaveBeenCalled();
		expect(handleChange).toHaveBeenCalledWith({ a: false });
	});
});
