import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NotFound from '../components/NotFound'

const generatePage = (pageName) => {
	const component = () => require(`../screens/${pageName}`).default

	try {
		return React.createElement(component())
	} catch (err) {
		return <NotFound></NotFound>
	}
}

const PageRender = () => {
	const { page, id } = useParams()
	const { auth } = useSelector((state) => state)

	let pageName = ''

	if (auth && auth.token) {
		if (id) {
			pageName = `${page}/[id]`
		} else {
			pageName = page
		}
	}

	return generatePage(pageName)
}
export default PageRender
