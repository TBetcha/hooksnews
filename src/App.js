/** @format */

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function App() {
	const [results, setResults] = useState([])
	const [query, setQuery] = useState('react hooks')
	const [loading, setLoading] = useState(false)
	const searchInputRef = useRef()

	useEffect(() => {
		getResults()
		// .then(response => {
		// 	console.log(response.data)
		// 	setResults(response.data.hits)
		// })
		//since we want onChange to be called when the param changes put the param(query) in here
	}, [query])

	const getResults = async () => {
		setLoading(true)
		const response = await axios.get(
			`http://hn.algolia.com/api/v1/search_by_date?query=${query}`
		)
		setResults(response.data.hits)
		setLoading(false)
	}
	const handleSubmit = event => {
		event.preventDefault()
		getResults()
	}

	const handleClear = () => {
		setQuery('')
		searchInputRef.current.focus()
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={query}
					onChange={event => setQuery(event.target.value)}
					ref={searchInputRef}
				/>
				<button type='submit'>Search</button>
				<button type='button' onClick={handleClear}>
					Clear
				</button>
			</form>
			{loading ? (
				<div> Loading Results </div>
			) : (
				<ul>
					{results.map(result => (
						<li key={result.objectID}>
							<a href={result.url}>{result.title}</a>
						</li>
					))}
				</ul>
			)}
		</>
	)
}
