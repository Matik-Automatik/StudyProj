//@ts-check
import { Easing } from '@tweenjs/tween.js'
import { time, doTween} from './index.js'
import * as PIXI from 'pixi.js'
import { getAsset } from './assets.js'
export default class Button extends PIXI.Container {
    #sprite = new PIXI.Sprite(getAsset('button_en'))
    #scaleContainer = new PIXI.Container()

    constructor() {
        super()

        this.addChild(this.#scaleContainer)
        this.#scaleContainer.addChild(this.#sprite)
        this.interactive = true
        this.#sprite.anchor.set(0.5)
        this.#sprite.visible = false
    }

    show() {
        this.#sprite.visible = true
        this.#scaleContainer.scale.set(0)
        doTween(this.#scaleContainer.scale)
            .to({ x: 1, y: 1 }, 500)
            .easing(Easing.Back.Out)
            .start(time.currTime)
            .onComplete(() => {
                this.annimation()
            })
    }

    annimation() {  
        doTween(this.#scaleContainer)
        .to({scale:{x: 1.2, y: 1.2}}, 1200)
            .easing(Easing.Quadratic.InOut)
            .repeat(Infinity)
            .delay(50)
            .yoyo(true)
            .start()
    }
}