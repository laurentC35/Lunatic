import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import LunaticSuggester from './lunatic-suggester';
import { searching } from './searching';
import CheckStore from './check-store';

function createSearching(storeName, version) {
	return async function (search, max) {
		return searching(search, storeName, version, max);
	};
}

function IDBSuggester({
	storeName,
	idbVersion,
	id,
	className,
	labelledBy,
	optionRenderer,
	labelRenderer,
	onSelect,
	onChange,
	max,
}) {
	const [store, setStore] = useState(undefined);
	const search = useMemo(
		function () {
			if (store) {
				return createSearching(storeName, idbVersion);
			}
			return () => [];
		},
		[storeName, idbVersion, store]
	);

	return (
		<CheckStore
			storeName={storeName}
			idbVersion={idbVersion}
			setStore={setStore}
		>
			<LunaticSuggester
				id={id}
				className={className}
				labelledBy={labelledBy}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				onSelect={onSelect}
				onChange={onChange}
				searching={search}
				max={max}
			/>
		</CheckStore>
	);
}

IDBSuggester.propTypes = {
	storeName: PropTypes.string.isRequired,
	idbVersion: PropTypes.string.isRequired,
	id: PropTypes.string,
	className: PropTypes.string,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.func,
	labelRenderer: PropTypes.func,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
	max: PropTypes.number,
};

export default IDBSuggester;
