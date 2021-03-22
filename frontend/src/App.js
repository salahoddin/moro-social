import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'

// import register from './screens/register'
import Login from './screens/login'
import Home from './screens/home'
import Register from './screens/register'
import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'
import Alert from './components/alert/Alert'
import Header from './components/header/Header'

const App = () => {
	const { auth } = useSelector((state) => state)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(refreshToken())
	}, [dispatch])
	return (
		<Router>
			<Alert></Alert>
			<input type='checkbox' id='theme' />
			<div className='App'>
				<div className='main'>
					{auth && auth.token && <Header></Header>}
					<Route exact path='/' component={auth.token ? Home : Login}></Route>
					<Route exact path='/register' component={Register}></Route>
					<PrivateRouter
						exact
						path='/:page'
						component={PageRender}
					></PrivateRouter>
					<PrivateRouter
						exact
						path='/:page/:id'
						component={PageRender}
					></PrivateRouter>
				</div>
			</div>
		</Router>
	)
}

export default App
