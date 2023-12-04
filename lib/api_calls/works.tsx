// const serverURL = process.env.NEXT_PUBLIC_SERVER_URL
// const worksURL = serverURL + "/works/"
// const ratingURL = worksURL + "/ratings/"
// const uploadFilesURL = serverURL + "/upload_files/"
// const commentsURL = serverURL + "/comments/"

// export async function fetchGallery() {
//     const res = await fetch(worksURL)
//     return res.json()
// }
// export async function deleteWork(workId: number) {
//     const deleteURL = worksURL + workId
//     const res = await fetch(deleteURL, {
//         method: "DELETE",
//     })
//     return res.json()
// }

// export const createWork = async (formData: any) => {
//     return await axios.post(worksURL, formData)
// }

// export const updateWorkFiles = async (work_id: number, formData: object) => {
//     const requestURL = uploadFilesURL + work_id
//     return await axios.patch(requestURL, formData)
// }

// export const createComment = async (requestOBJ: any) => {
//     return await axios.post(commentsURL, requestOBJ)
// }
