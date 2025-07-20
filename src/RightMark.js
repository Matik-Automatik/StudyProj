//@ts-check
import { Easing } from '@tweenjs/tween.js'
import { time, doTween } from './index.js'
import * as PIXI from 'pixi.js'
import { getAsset } from './assets.js'

export default class RightMark extends PIXI.Container {
    #sprite = new PIXI.Sprite(getAsset('right_sprite'))
    #scaleContainer = new PIXI.Container()

    constructor() {
        super()

        this.addChild(this.#scaleContainer)
        this.#scaleContainer.addChild(this.#sprite)

        this.#sprite.scale.set(0.35)
        this.#sprite.anchor.set(0.5)
        this.#sprite.visible = false       
    }

    show() {
        this.#sprite.visible = true
        this.#scaleContainer.scale.set(0)
        doTween(this.#scaleContainer.scale)
            .to({ x: 1, y: 1 }, 500)
            .easing(Easing.Back.Out)
            .delay(100)
            .start(time.currTime)
    }
}
