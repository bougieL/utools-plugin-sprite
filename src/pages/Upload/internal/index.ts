export function getBase64(file: File) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = function () {
      reader.result && resolve(reader.result)
    }
    reader.onerror = function (error) {
      reject(error)
    }
  })
}