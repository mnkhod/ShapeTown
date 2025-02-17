export const characterConfig = {
    skin: {
        total: 3,
        prefix: 'PlayerWalking_V',
        // ['PlayerWalking_V01.png', 'PlayerWalking_V02.png', 'PlayerWalking_V03.png']
        getOptions: () => Array.from({ length: 3 }, (_, i) => 
            `${characterConfig.skin.prefix}${String(i + 1).padStart(2, '0')}.png`
        ),
        // 'PlayerWalking_V01'
        getAssetKey: (index) => `${characterConfig.skin.prefix}${String(index + 1).padStart(2, '0')}`
    },
    hair: {
        total: 3,
        prefix: 'PlayerHairWalking_',
        // ['PlayerHairWalking_01.png', 'PlayerHairWalking_02.png', 'PlayerHairWalking_03.png']
        getOptions: () => Array.from({ length: 3 }, (_, i) => 
            `${characterConfig.hair.prefix}${String(i + 1).padStart(2, '0')}.png`
        ),
        // 'PlayerHairWalking_01'
        getAssetKey: (index) => `${characterConfig.hair.prefix}${String(index + 1).padStart(2, '0')}`
    },
    clothing: {
        total: 20,
        prefix: 'CharacterOutfit_',
        // ['CharacterOutfit_1.png', 'CharacterOutfit_2.png', ...]
        getOptions: () => Array.from({ length: 20 }, (_, i) => 
            `${characterConfig.clothing.prefix}${i + 1}.png`
        ),
        // 'CharacterOutfit_1'
        getAssetKey: (index) => `${characterConfig.clothing.prefix}${index + 1}`
    }
};