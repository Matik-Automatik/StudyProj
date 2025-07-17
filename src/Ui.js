//@ts-check
import { Easing, Tween } from '@tweenjs/tween.js'
import {getAsset, time, doTween} from './index.js'
import * as PIXI from 'pixi.js'
import rightCount from './Scene.js'

export default class Ui extends PIXI.Container {
    #scaleContainer = new PIXI.Container()
    #sprite = new PIXI.Sprite(getAsset('cake_ui'))
    #counter = new PIXI.Text('0 / 3', {
        fill: "#ffffff",
        fontFamily: "Impact, Charcoal, sans-serif",
        fontSize: 55,
        fontStyle: "italic",
        lineJoin: "round",
        miterLimit: 2,
        padding: 20,
        strokeThickness: 2
    })
    
    constructor() {
        super()

        this.addChild(this.#scaleContainer)
        this.#scaleContainer.addChild(this.#sprite, this.#counter)
        
        this.#sprite.scale.set(0.2)
        this.#sprite.anchor.set(1)

        this.#counter.scale.set(0.6)
        this.#counter.anchor.set(0.5)
        this.#counter.position.set(-100, -45) 
        // console.log('counter', this.#counter)
    }

    start() {
    
                
    }

     updatetext(count) {
        this.#counter.text = `${count} / 3`
    }
}