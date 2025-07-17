//@ts-check
import { Easing, Tween } from '@tweenjs/tween.js'
import {getAsset, doTween} from './index.js'
import * as PIXI from 'pixi.js'

export default class NotCake extends PIXI.Container{
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
        this.#sprite.anchor.set(0.5)
        this.#sprite.scale.set(0.3)
        this.interactive = true
        
        doTween(this.#scaleContainer) 
            .to({scale:{x: 1.1, y: 1.1}}, 700)
            .easing(Easing.Quadratic.InOut)
            .delay(50)
            .repeat(Infinity)
            .yoyo(true)
            .start()
            
    }
} 
