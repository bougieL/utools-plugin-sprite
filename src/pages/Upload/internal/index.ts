export function getBase64(file: File, scale: number = 1): Promise<{
  base64: string
  width: number
  height: number
}> {
  return new Promise((resolve: any, reject: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (evt: ProgressEvent) => {
      const img = new Image()
      img.src = evt.target!.result
      img.onload = () => {
        const width = img.width * scale
        const height = img.height * scale
        const elem = document.createElement('canvas')
        elem.width = width
        elem.height = height
        const ctx = elem.getContext('2d')
        if (!ctx) {
          reject()
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        resolve({ base64: elem.toDataURL('image.jpeg'), width, height })
      }
    }
    reader.onerror = reject
  })
}

export async function resovleBase64List(files: File[]) {
  const filesBase64 = files.map(async (file) => {
    return await getBase64(file)
  })
  return await Promise.all(filesBase64)
}

export async function resolveSortedBase64List({
  fileList,
  type  = 'auto',
  space = 10
}: {
  fileList: File[],
  type?: 'auto' | 'vertical' | 'horizontal' | 'tilt',
  space?: number
}) {
  const base64List = await resovleBase64List(fileList)
  // console.log(base64List)
}