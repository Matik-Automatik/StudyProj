//@ts-check
import { getAsset } from './index.js'
import * as PIXI from 'pixi.js'

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
        padding: 10,
        strokeThickness: 2
    })
    
    constructor() {
        super()

        this.addChild(this.#scaleContainer)
        this.#scaleContainer.addChild(this.#sprite, this.#counter)
        
        this.#sprite.scale.set(0.4)
        this.#sprite.anchor.set(1)

        this.#counter.scale.set(0.6)
        this.#counter.anchor.set(0.5)
        this.#counter.position.set(-105, -45) 
    }

    updatetext(count) {
        this.#counter.text = `${count} / 3`
    }
}