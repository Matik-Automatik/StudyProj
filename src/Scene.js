// @ts-check
import * as PIXI from 'pixi.js'
import WrongMark from './WrongMark.js'
import RightMark from './RightMark.js'
import NotCake from './NotCake.js'
import { doTween } from './index.js'
import Broom from './Broom.js'
import Kettle from './Kettle.js'
import Cupcake from './Cupcake.js'
import Logo from './Logo.js'
import Character from './Character.js'
import { Easing } from '@tweenjs/tween.js'
import Ui from './Ui.js'
import { getAsset } from './assets.js'

export default class Scene extends PIXI.Container {
    #back = new PIXI.Sprite(getAsset('back'))
    #mainContainerWrong = new PIXI.Container()
    #mainContainerRight = new PIXI.Container()
    #rightMark = new RightMark()
    #wrongMark = new WrongMark()
    #board = new NotCake(getAsset('board'))
    #table = new PIXI.Sprite(getAsset('table'))
    #book = new NotCake(getAsset('book'))
    #knife = new NotCake(getAsset('knife'))
    #radio = new NotCake(getAsset('radio'))
    #scoop = new NotCake(getAsset('scoop'))
    #broom = new Broom(getAsset('broom'))
    #feather = new NotCake(getAsset('feather'))
    #kettle = new Kettle(getAsset('kettle'))
    #glass = new Kettle(getAsset('glass'))
    #lamp = new NotCake(getAsset('lamp'))
    #cake = new NotCake(getAsset('cake'))
    #cupcake_1 = new Cupcake(getAsset('cupcake_1'))
    #cupcake_2 = new Cupcake(getAsset('cupcake_2'))
    #cupcake_3 = new Cupcake(getAsset('cupcake_3'))
    #character = new Character()
    #ui = new Ui()
    #logo = new Logo()
    #charMask = new PIXI.Graphics()

    rightCount = 0

    constructor() {
        super()

        this.addChild(
            this.#mainContainerWrong,
            this.#mainContainerRight,
            this.#character,
            this.#charMask,
            this.#logo,                 
        )

        this.#mainContainerWrong.addChild(
            this.#back,
            this.#board,
            this.#table,
            this.#book,
            this.#knife,
            this.#radio,
            this.#scoop,
            this.#broom,
            this.#feather,
            this.#kettle,
            this.#glass,
            this.#lamp,
            this.#cake,
            this.#wrongMark,
            this.#ui,
        )

        this.#mainContainerRight.addChild(
            this.#cupcake_1,
            this.#cupcake_2,
            this.#cupcake_3,
            this.#rightMark,    
        )

        this.#character.mask = this.#charMask

        this.#mainContainerWrong.interactive = true
        this.#mainContainerRight.interactive = true
        this.interactive = true
        
        this.#back.scale.set(0.25)
        this.#back.anchor.set(0.5)
        this.#back.interactive = true

        this.#charMask
            .beginFill(0xFFFF00)
            .drawRect(-this.#back.width / 2, -this.#back.height / 2, this.#back.width, this.#back.height)  
            .endFill()

        this.#board.position.set(-16, -55)

        this.#table.position.set(-117, 100)
        this.#table.anchor.set(0.5)
        this.#table.scale.set(0.23)

        this.#book.position.set(-118.5, 75)
        this.#book.scale.set(0.75)

        this.#knife.position.set(-122, 106)
        this.#knife.scale.set(0.8)

        this.#radio.position.set(-40, 150)
        this.#radio.scale.set(0.9)

        this.#scoop.position.set(120, 150)

        this.#broom.position.set(75, 155)

        this.#feather.position.set(77, -111)

        this.#kettle.position.set(0, 35)

        this.#glass.position.set(112, -36)
        this.#glass.scale.set(0.9)

        this.#lamp.position.set(202, -15)
        this.#lamp.scale.set(0.9)
       
        this.#cake.position.set(-63, -203)
        this.#cake.scale.set(0.85)

        this.#cupcake_1.position.set(43, -191)
        this.#cupcake_2.position.set(147, -141)

        this.#cupcake_3.position.set(-40, 48)

        this.#ui.position.set((this.#back.width / 2) - 10, (this.#back.height / 2) - 10)
        this.#character.position.set(-this.#back.width / 2, 0)
                
        this.#mainContainerWrong.children.forEach((element) => {
            element.on('pointerdown', (event) => { this.#onPointerDownWrong(event) })
        })
        
        this.#mainContainerRight.children.forEach((element) => {
            element.once('pointerdown', (event) => { this.#onPointerDownRight(event) })
        })
        
        this.#character.characterShowOnLoad()
        this.once('pointerdown', () => { this.#characterHide() })
        this.on('pointerdown', () => { this.#ui.updatetext(this.rightCount) })
    }

    /**
     * 
     * @param {PIXI.InteractionEvent} event
     */
    #onPointerDownWrong(event) {
        const localPos = this.#mainContainerWrong.toLocal(event.data.global)
        this.#wrongMark.position.copyFrom(localPos)
        this.#wrongMark.show()
    }

    /**
     * 
     * @param {PIXI.InteractionEvent} event
     */
    #onPointerDownRight(event) {
        const localPos = this.#mainContainerWrong.toLocal(event.data.global)
        const RightPointer = new RightMark()
        
        RightPointer.position.copyFrom(localPos)
        this.#mainContainerRight.addChild(RightPointer)
        RightPointer.show()
        

        this.rightCount++ 
        
        if (this.rightCount == 3) {
            this.#logo.position.copyFrom(this.#mainContainerWrong)
            this.#logo.show() 
        }   
    }

    #characterHide() {
        doTween(this.#character.scale)
            .to({ x: 0, y: 0 }, 500)
            .easing(Easing.Back.In)
            .start()
    }

    resize(width, height) {
        this.position.set(width / 2, height / 2)

        const sx = width / this.#back.width
        const sy = height / this.#back.height
        this.scale.set(Math.min(sx, sy))
    }    
}
