//@ts-check
import { doTween } from './index.js'
import * as PIXI from 'pixi.js'

export default class Kettle extends PIXI.Container{
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
        this.#sprite.anchor.set(0.5, 0.65)
        this.#sprite.scale.set(0.3)
        this.interactive = true
        
        doTween(this.#scaleContainer) 
            .to({angle: [5, 0, -5, 0]}, 200)
            .delay(50)
            .repeat(Infinity)
            .start()   
    }
} 
