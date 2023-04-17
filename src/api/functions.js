// Node Modules
const { readdirSync, writeFileSync } = require('node:fs');
const { homedir } = require('node:os');
const { join } = require('node:path');

// Resources
const currentConfig = require(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json'));

const { appBackground, wallpapersPath, appConfig } = currentConfig;

function getGlobalData() {
    const { type, colorBackground, wallpaper, brightness } = appBackground;
    const { hardwareAcceleration, trayMenu } = appConfig;

    return {
        type: type,
        colorBackground: colorBackground,
        wallpaper: wallpapersPath,
        name: wallpaper,
        brightness,
        hardwareAcceleration,
        trayMenu
    }
};
function getGlobalResources() {
    const files = readdirSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources'));

    let responce = {}

    for (let file of files) {
        responce[file] = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources', file);
    }

    return responce
};
function setConfig(value) {
    writeFileSync(
        join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json'),
        JSON.stringify(value, null, 4),
        { encoding: 'utf-8' }
    )
};
function compareConfig() {
    const { type, colorBackground, wallpaper } = require(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json')).appBackground;

    return {
        type: type,
        colorBackground: colorBackground,
        wallpaper: join(wallpapersPath, `${wallpaper}.png`),
        name: wallpaper
    }
};
function getGlobalWallpapers() {

    const walls = readdirSync(
        wallpapersPath,
        { encoding: 'utf-8' }
    );
    let responce = [];
    walls.map(file => {
        responce.push(file.split('.png')[0]);
    })

    return {
        wallpapers: responce
    }
};
function getAllConfig() {
    return currentConfig;
}

module.exports = {
    getGlobalData,
    getGlobalResources,
    setConfig,
    compareConfig,
    getAllConfig,
    getGlobalWallpapers
}