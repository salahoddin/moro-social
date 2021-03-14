import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import register from './screens/register'
// import login from './screens/login'
import PageRender from './PageRender'

const App = () => {
	return (
		<Router>
			<input type='checkbox' id='theme' />
			<div className='App'>
				<div className='main'>
					<Route exact path='/:page' component={PageRender}></Route>
					<Route exact path='/:page/:id' component={PageRender}></Route>
				</div>
			</div>
		</Router>
	)
}

export default App
