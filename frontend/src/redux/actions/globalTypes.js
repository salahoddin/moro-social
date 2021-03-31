export const GLOBAL_TYPES = {
	AUTH: 'AUTH',
	ALERT: 'ALERT',
	THEME: 'THEME',
}

export const deleteData = (data, id) => {
	const newData = data.filter((item) => item._id !== id)
	return newData
}

export const editData = (data, id, post) => {
	const newData = data.map((item) => (item._id === id ? post : item))
	return newData
}
