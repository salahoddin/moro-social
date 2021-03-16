import React from 'react'

const Toast = ({ message, handleShow, bgColor }) => {
	return (
		<div
			className={`toast show position-fixed text-light ${bgColor}`}
			style={{ top: '5px', right: '5px', minWidth: '200px', zIndex: 50 }}
		>
			<div className={`toast-header text-light ${bgColor}`}>
				<strong className='mr-auto text-light'>{message.title}</strong>
				<button
					className='ml-2 mb-1 close'
					data-dismiss='toast'
					style={{ outline: 'none' }}
					onClick={handleShow}
				>
					&times;
				</button>
			</div>
			<div className='toast-body'>{message.body}</div>
		</div>
	)
}

export default Toast
