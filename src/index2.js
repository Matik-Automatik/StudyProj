import AssetUrl from '../assets/table.png'

const Rad2Deg = 180.0 / Math.PI
const Deg2Rad = Math.PI / 180.0

const canvas = document.createElement('canvas')
document.getElementById('root').appendChild(canvas)
canvas.style.backgroundColor = "#000"
canvas.style.border = "1px solid red"
canvas.style.boxSizing = 'border-box'
canvas.style.margin = "10px"

canvas.style.width = "calc(100% - 20px)"
canvas.style.height = "calc(100% - 20px)"
const context = canvas.getContext('2d')

const img = new Image()

img.onload = () => {

    const resizeImage1 = (w, h, imgW, imgH) => {
        let width = imgW
        let height = imgH
        const imgRatio = imgW / imgH

        if (imgW > w) {
            width = w
            height = width / imgRatio
        }

        if (imgH > h && height > h) {
            height = h
            width = height * imgRatio
        } 

        return { width, height }
    }

    const resizeImage2 = (w, h, imgW, imgH) => {
        let width = imgW
        let height = imgH
        const imgRatio = imgW / imgH

        if (width > w) {
           width = w 
           height = width / imgRatio
        }

        if (height > h) {
           height = h
           width = imgRatio * height 
        }

        return { width, height }

    }

    const doResizedRedraw = (width, height) => {
        const cx = width / 2
        const cy = height / 2

        context.clearRect(0, 0, width, height)
        canvas.width = width
        canvas.height = height

        // const imgSize = resizeImage1(width, height, img.width, img.height)
        // context.drawImage(img, cx - imgSize.width / 2, cy - imgSize.height / 2, imgSize.width, imgSize.height)
        const imgSize = resizeImage2(width, height, img.width, img.height)   
        context.drawImage(img, cx - imgSize.width / 2, cy - imgSize.height / 2, imgSize.width, imgSize.height)     
    }

    doResizedRedraw(window.innerWidth - 20, window.innerHeight - 20)

    window.addEventListener('resize', () => {
        doResizedRedraw(window.innerWidth - 20, window.innerHeight - 20)
    })
}

img.src = AssetUrl



