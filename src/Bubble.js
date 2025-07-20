//@ts-check
import { Easing } from '@tweenjs/tween.js'
import { time, doTween} from './index.js'
import * as PIXI from 'pixi.js'
import { getAsset } from './assets.js'
export default class Bubble extends PIXI.Container {
    #sprite = new PIXI.Sprite(getAsset('bubble_en'))
    #scaleContainer = new PIXI.Container()

    constructor() {
        super()

        this.addChild(this.#scaleContainer)
        this.#scaleContainer.addChild(this.#sprite)
        this.#sprite.anchor.set(0, 1)
        this.#sprite.visible = false
        this.#sprite.scale.set(0.25)
    }

    show() {
        this.#sprite.visible = true
        this.#scaleContainer.scale.set(0)
        doTween(this.#scaleContainer.scale)
            .to({ x: 1, y: 1 }, 600)
            .delay(250)
            .easing(Easing.Back.Out)
            .start(time.currTime)
    }
}