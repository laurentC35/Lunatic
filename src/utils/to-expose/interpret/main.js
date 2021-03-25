import { interpretVTL, interpretVTLWithEmptyDefault } from './vtl';
import { interpretMD } from './md';

export const interpret = (features) => (bindings, doNotReplaceNullBindings) => (
	expression
) => {
	if (!expression) return '';
	if (!Array.isArray(features)) return expression;
	if (features.includes('VTL')) {
		const vtl = interpretVTL(bindings, doNotReplaceNullBindings)(expression);
		if (features.includes('MD')) {
			return interpretMD(vtl);
		}
		return vtl;
	}
	return expression;
};

export const interpretWithEmptyDefault = (features) => (
	bindings,
	doNotReplaceNullBindings
) => (expression) => {
	if (!expression) return '';
	if (!Array.isArray(features)) return '';
	if (features.includes('VTL')) {
		const vtl = interpretVTLWithEmptyDefault(
			bindings,
			doNotReplaceNullBindings
		)(expression);
		if (features.includes('MD')) {
			return interpretMD(vtl);
		}
		return vtl;
	}
	return '';
};