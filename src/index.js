//@ts-check
import * as PIXI from 'pixi.js'
import Scene from './Scene.js'
import { Group, Tween } from '@tweenjs/tween.js'
import { loadAssets } from './assets.js'

const canvas = document.createElement('canvas')
canvas.width = 1
canvas.height = 1
const app = new PIXI.Application({ 
    view: canvas,
    antialias: true,
    resolution: window.devicePixelRatio || 1 
})
document.body.append(canvas)

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
loadAssets(main)

export { app, time, doTween }