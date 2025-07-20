//@ts-check
import * as PIXI from 'pixi.js'
//@ts-ignore
import atlasTexture from '../assets/texture.png'
import atlasData from '../assets/texture.json'
//@ts-ignore
import backTexture from '../assets/back.jpg'

const sharedLoader = PIXI.Loader.shared
/** @type {any} */
const sharedAssets = sharedLoader.resources
/** @type {PIXI.Spritesheet} */
let sheet

/** @param {() => void} callback */
export const loadAssets = (callback) => {
    sheet = new PIXI.Spritesheet(PIXI.BaseTexture.from(atlasTexture), atlasData)
    sheet.parse().then(() => {
        sharedLoader.add('back', backTexture)
        sharedLoader.load(callback)
    })
}

/**
 * @param {string} name - имя ассета 
 * @returns {PIXI.Texture}
 */
export const getAsset = (name) => {
    if (sharedAssets[name]) {
        return sharedAssets[name].texture
    }

    if (!sheet.textures[name]) {
        throw new Error("cannot get asset: " + name)     
    }

    return sheet.textures[name]
}