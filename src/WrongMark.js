//@ts-check
import { Easing, Tween } from '@tweenjs/tween.js'
import { time, doTween, getAsset } from './index.js'
import * as PIXI from 'pixi.js'

export default class WrongMark extends PIXI.Container {
    #sprite = new PIXI.Sprite(getAsset('wrong_sprite'))
    #scaleContainer = new PIXI.Container()

    /** @type {Tween | null} */
    #tweenScaleUp = null

    /** @type {Tween | null} */
    #tweenScaleDown = null

    constructor() {
        super()

        this.addChild(this.#scaleContainer)
        this.#scaleContainer.addChild(this.#sprite)

        this.#sprite.scale.set(0.35)
        this.#sprite.anchor.set(0.5)
        this.#sprite.visible = false
    }
    
    show() {
        this.#stopActiveTweens()
        this.#sprite.visible = true
        this.#scaleContainer.scale.set(0)
        
        this.#tweenScaleUp = doTween(this.#scaleContainer.scale)
            .to({ x: 1, y: 1 }, 500)
            .easing(Easing.Back.Out)
            .delay(100)
            .onComplete(() => {
                this.#tweenScaleUp = null
                this.#hide() 
            })
            .start(time.currTime) 
    }

    #hide() {
        this.#tweenScaleDown = doTween(this.#scaleContainer.scale)
        .to({ x: 0, y: 0 }, 500)
        .easing(Easing.Back.In)
        .delay(100)
        .start(time.currTime)
        .onComplete(() => {
            this.#tweenScaleDown = null
            this.#sprite.visible = false
        })                      

    }

    #stopActiveTweens() {
        if (this.#tweenScaleUp) {
            this.#tweenScaleUp.stop()
            this.#tweenScaleUp = null
        }
        if (this.#tweenScaleDown) {
            this.#tweenScaleDown.stop()
            this.#tweenScaleDown = null
        }
    }
}
