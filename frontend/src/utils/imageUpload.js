export const checkImage = (file) => {
	let err = ''

	if (!file) return (err = 'File does not exist')

	if (file.size > 1024 * 1024) err = 'Only 1mb image is allowed'

	if (file.type !== 'image/jpeg' && file.type !== 'image/png')
		err = 'Image format is not supported'

	return err
}

export const imageUpload = async (images) => {
	let imageArr = []
	for (const item of images) {
		const formData = new FormData()
		formData.append('file', item)

		formData.append('upload_preset', 'ljur5ppc')
		formData.append('cloud_name', 'dhenabod')

		const res = await fetch(
			'https://api.cloudinary.com/v1_1/dhenabod/image/upload',
			{
				method: 'POST',
				body: formData,
			}
		)

		const data = await res.json()
		imageArr.push({ public_id: data.public_id, url: data.secure_url })
	}
	return imageArr
}
