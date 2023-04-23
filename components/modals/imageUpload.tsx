import { useState } from "react"
import { storage } from "@/libs/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
interface Props {
  onImageUpload: (url: string) => void
}
export const ImageUpload = () => {
  const [imageUpload, setImageUpload] = useState<File>()
  const [url, setURL] = useState("")

  const handleUpload = async () => {
    if (imageUpload == null) return
    const imageRef = ref(storage, `images/${imageUpload.name}`)

    const myUpload = uploadBytesResumable(imageRef, imageUpload, {
      contentType: "image/png",
    })
      .then(() => {
        alert("Image Uploaded")
      })
      .then(() => getDownloadURL(ref(storage, `images/${imageUpload.name}`)))
      .then((url) => {
        setURL(url)
      })
  }

  return (
    <>
      <input
        id="dropzone-file"
        type="file"
        onChange={(e: any) => {
          setImageUpload(e.target.files[0])
        }}
      />
      <button onClick={handleUpload}>upload</button>
    </>
  )
}