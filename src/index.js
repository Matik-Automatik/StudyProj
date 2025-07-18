//@ts-check
import * as PIXI from 'pixi.js'
import Scene from './Scene.js'
import { Group, Tween } from '@tweenjs/tween.js'

const canvas = document.createElement('canvas')
canvas.width = 1
canvas.height = 1
const app = new PIXI.Application({ view: canvas, antialias: true })

document.body.append(canvas)

//@ts-ignore
const assetsArray = require.context('../assets', false, /\.png|jpg$/).keys()

/** loader */
const sharedLoader = PIXI.Loader.shared 

/**
 * @type {any}
 */
const sharedAssets = sharedLoader.resources
/**
 * @param {string} name - имя ассета 
 * @returns {PIXI.Texture}
 */
const getAsset = (name) => {
    const asset = sharedAssets[name]
    if (!asset) {
        throw new Error("cannot get asset: " + name)     
    }
    return asset.texture
}

for (let i = 0; i < assetsArray.length; i++) {
    const slicedName = assetsArray[i].slice(2, -4)
    sharedLoader.add(slicedName, assetsArray[i])
}
sharedLoader.onComplete.once(main)
sharedLoader.load()

const time = { currTime: 0 }

const group = new Group()
const doTween = (target) => {
    return new Tween(target, group)  
}

const update = () => {
    const deltaTime = app.ticker.deltaMS
    time.currTime += deltaTime 
    group.update(time.currTime)    
}   
     
function main() { 
    const scene = new Scene()
    app.stage.addChild(scene)
    app.ticker.add(update)
    app.start()
    
    const doResize = (width, height) => {
        scene.resize(width, height)
        app.renderer.resize(width, height)   
    }
    
    doResize(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', () => {
        doResize(window.innerWidth, window.innerHeight)
    })
}

export { app, time, getAsset, doTween }