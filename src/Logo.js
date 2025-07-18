//@ts-check
import { Easing } from '@tweenjs/tween.js'
import { getAsset, time, doTween } from './index.js'
import * as PIXI from 'pixi.js'
import Button from './Button.js'


export default class Logo extends PIXI.Container {
    #sprite = new PIXI.Sprite(getAsset('logo'))
    #buttonEnd = new Button()
    #scaleContainer = new PIXI.Container()

    constructor() {
        super()

        this.addChild(this.#scaleContainer)
        this.#scaleContainer.addChild(this.#sprite, this.#buttonEnd)

        this.#sprite.scale.set(0.5)
        this.#sprite.anchor.set(0.5)
        this.#sprite.visible = false
        
        this.#buttonEnd.scale.set(0.5)
        this.#buttonEnd.visible = false
        this.#buttonEnd.position.set(this.#sprite.x, ++this.#sprite.height)
        this.#buttonEnd.on('pointerdown', () => {this.onPointerDown()})
    }

    show() {
        this.#sprite.visible = true
        this.#buttonEnd.visible = true
        this.#scaleContainer.scale.set(0)
        doTween(this.#scaleContainer.scale)
            .to({ x: 1, y: 1 }, 500)
            .easing(Easing.Back.Out)
            .delay(100)
            .start(time.currTime)
            .yoyo(true)
            .onComplete(() => {
                this.#buttonEnd.show()
            })
    }
    
    onPointerDown() {
        window.open('https://lesta.ru/shop/wot/main')
        
    }

}
