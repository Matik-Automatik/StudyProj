//@ts-check
import { Easing } from '@tweenjs/tween.js'
import { doTween } from './index.js'
import * as PIXI from 'pixi.js'

export default class Broom extends PIXI.Container {
    #sprite
    #scaleContainer = new PIXI.Container()
    /**
     * 
     * @param {PIXI.Texture} texture 
     */
    constructor(texture) {
        super()
        this.#sprite = new PIXI.Sprite(texture)
        this.addChild(this.#scaleContainer)
        this.#scaleContainer.addChild(this.#sprite)
        this.#sprite.anchor.set(0.3, 0.2)
        this.#sprite.scale.set(0.3)
        this.interactive = true
        
        doTween(this.#scaleContainer) 
            .to({ angle: 40 }, 700)
            .easing(Easing.Quadratic.InOut)
            .delay(50)
            .repeat(Infinity)
            .yoyo(true)
            .start()   
    }
} 
