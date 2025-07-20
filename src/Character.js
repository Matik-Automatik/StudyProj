//@ts-check
import { Easing } from '@tweenjs/tween.js'
import { time, doTween } from './index.js'
import * as PIXI from 'pixi.js'
import Bubble from './Bubble.js'
import { getAsset } from './assets.js'
export default class Character extends PIXI.Container {
    #sprite = new PIXI.Sprite(getAsset('character'))
    #bubble = new Bubble()
    
    #scaleContainer = new PIXI.Container()

    constructor() {
        super()
        
        this.addChild(this.#scaleContainer)
        this.#scaleContainer.addChild(
            this.#sprite,
            this.#bubble,
        )

        this.#sprite.scale.set(0.4)
        this.#sprite.anchor.set(0.5)
        this.#sprite.visible = false
        this.#bubble.position.set(this.#sprite.width / 2, 0)   
    }

    show() {
        this.#sprite.visible = true
        this.#scaleContainer.scale.set(0)
        doTween(this.#scaleContainer.scale)
            .to({ x: 1, y: 1 }, 600)
            .easing(Easing.Back.Out)
            .delay(100)
            .start(time.currTime)
            .onComplete(() => {
                this.#bubble.show()
            })
    }

    hide() {
        doTween(this.#scaleContainer.scale)
            .to({ x: 0, y: 0 }, 500)
            .easing(Easing.Back.In)
            .delay(3500)
            .start(time.currTime)
    }

    characterShowOnLoad() {        
        doTween(this)
            .to({ x: -110 }, 500)
            .easing(Easing.Quadratic.InOut)
            .start()
            .onStart(() => {
                this.show()
            })
            .onComplete(() => {
                this.hide()   
            })           
    }
}