import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRouter = (props) => {
	const firstLogin = localStorage.getItem('firstLogin')
	return firstLogin ? <Route {...props}></Route> : <Redirect to='/'></Redirect>
}

export default PrivateRouter
