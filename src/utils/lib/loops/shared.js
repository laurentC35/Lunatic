import * as C from '../../../constants';

export const getRosterForLoopInitLines = (components) =>
	Array.isArray(components)
		? components.reduce(
				(_, c) =>
					c.response
						? c.response.values[C.COLLECTED].length > _
							? c.response.values[C.COLLECTED].length
							: _
						: _,
				0
		  )
		: 0;

export const getInvolvedVariables = (parentComponents) =>
	Array.isArray(parentComponents)
		? parentComponents
				.reduce((_, c) => {
					const { response, responses, components } = c;
					if (response && response.name) return [..._, response.name];
					if (responses || components)
						return [..._, getInvolvedVariables(responses || components)];
					return _;
				}, [])
				.flat()
		: [];

export const lastRosterForLoopLineIsEmpty = (bindings) => (involvedVariables) =>
	bindings && involvedVariables
		? involvedVariables.filter((iv) => bindings[iv][bindings[iv].length - 1])
				.length === 0
		: true;

export const getDataVectors = (parentComponents) =>
	Array.isArray(parentComponents)
		? parentComponents.reduce((acc, { response, responses, components }) => {
				if (response)
					return {
						...acc,
						[response.name]: response.values[C.COLLECTED],
					};
				if (responses || components)
					return {
						...acc,
						...getDataVectors(responses || components),
					};
				return acc;
		  }, {})
		: {};
