/**
 * Auto-pick preset definitions for character building.
 * Organized by class and subclass, providing prioritized options for:
 * - Stats (Point buy allocation + priority ranking)
 * - Feats (defaults to ASI if available, falls back to priority feats)
 * - Skills
 * - Expertise
 * - Tools
 * - Equipment (Armor, weapons, shields)
 * - Spellcasting (Cantrips and leveled spells)
 * - Lineage
 * - Class Options (Invocations, metamagic, fighting styles, orders, etc.)
 */

export const AUTO_PICK_PRESETS = {
    barbarian: {
        stats: {
            priority: ['str', 'con', 'dex', 'wis', 'int', 'cha'],
            allocated: { str: 7, con: 7, dex: 5, wis: 2, int: 0, cha: 0 }
        },
        skills: ['athleticsProficiency', 'intimidationProficiency', 'survivalProficiency', 'perceptionProficiency', 'natureProficiency', 'animalHandlingProficiency'],
        expertise: ['athleticsExpertise', 'intimidationExpertise', 'survivalExpertise', 'perceptionExpertise'],
        feats: ['greatWeaponMaster', 'crusher', 'alert', 'tough', 'sentinel', 'charger', 'speedy', 'savageAttacker'],
        tools: ['smithsToolsProficiency', 'woodcarversToolsProficiency', 'leatherworkersToolsProficiency', 'herbalismKitProficiency'],
        equipment: {
            armor: ['unarmored', 'hideArmor'],
            armament: ['greatsword', 'greataxe', 'javelin', 'handaxe']
        },
        spellcasting: [],
        classOptions: {
            primalKnowledge: ['athleticsProficiency', 'intimidationProficiency']
        },
        subclasses: {
            berserker: {
                equipment: { armament: ['maul', 'greatclub', 'handaxe', 'javelin'] },
                feats: ['crusher', 'greatWeaponMaster', 'charger', 'sentinel']
            },
            wildHeart: {
                equipment: { armament: ['greataxe', 'javelin', 'handaxe'] },
                feats: ['durable', 'charger', 'alert']
            },
            worldTree: {
                equipment: { armament: ['halberd', 'pike', 'javelin'] },
                feats: ['speedy', 'sentinel', 'polearmMaster']
            },
            zealot: {
                equipment: { armament: ['greatsword', 'greataxe', 'javelin'] },
                feats: ['greatWeaponMaster', 'sentinel', 'resilient']
            },
            ancestralGuardian: {
                equipment: { armament: ['greataxe', 'shieldEquipment', 'javelin'] },
                feats: ['sentinel', 'tough', 'alert']
            },
            lament: {
                equipment: { armament: ['greataxe', 'javelin', 'handaxe'] },
                feats: ['greatWeaponMaster', 'tough', 'resilient']
            }
        }
    },

    bard: {
        stats: {
            priority: ['cha', 'dex', 'con', 'wis', 'int', 'str'],
            allocated: { cha: 7, dex: 7, con: 5, wis: 2, int: 0, str: 0 }
        },
        skills: ['persuasionProficiency', 'deceptionProficiency', 'performanceProficiency', 'insightProficiency', 'acrobaticsProficiency', 'stealthProficiency', 'perceptionProficiency'],
        expertise: ['persuasionExpertise', 'deceptionExpertise', 'performanceExpertise', 'stealthExpertise', 'insightExpertise', 'perceptionExpertise'],
        feats: ['inspiringLeader', 'warCaster', 'feyTouched', 'alert', 'lucky', 'telekinetic', 'actor', 'speedy'],
        tools: ['luteProficiency', 'fluteProficiency', 'drumProficiency', 'disguiseKitProficiency', 'thievesToolsProficiency'],
        equipment: {
            armor: ['studdedLeatherArmor', 'leatherArmor', 'paddedArmor'],
            armament: ['rapier', 'shortsword', 'dagger', 'lightCrossbow']
        },
        spellcasting: [
            'viciousMockery', 'prestidigitation', 'minorIllusion', 'message', 'dancingLights',
            'healingWord', 'cureWounds', 'dissonantWhispers', 'faerieFire', 'thunderwave', 'disguiseSelf', 'detectMagic', 'charmPerson',
            'invisibility', 'shatter', 'suggestion', 'holdPerson', 'silence', 'mirrorImage', 'lesserRestoration',
            'hypnoticPattern', 'slow', 'dispelMagic', 'majorImage', 'fear',
            'dimensionDoor', 'polymorph', 'compulsion', 'greaterInvisibility'
        ],
        classOptions: {},
        subclasses: {
            dance: {
                equipment: {
                    armor: ['unarmored', 'studdedLeatherArmor'],
                    armament: ['rapier', 'shortsword', 'dagger']
                },
                feats: ['speedy', 'mobile', 'warCaster', 'alert']
            },
            valor: {
                equipment: {
                    armor: ['breastplate', 'scaleMail', 'studdedLeatherArmor'],
                    armament: ['longsword', 'shieldEquipment', 'rapier', 'javelin']
                },
                feats: ['warCaster', 'shieldMaster', 'tough']
            },
            moon: {
                feats: ['telekinetic', 'feyTouched', 'warCaster']
            },
            spirits: {
                feats: ['shadowTouched', 'warCaster', 'feyTouched']
            },
            glamour: {
                feats: ['inspiringLeader', 'actor', 'telekinetic']
            },
            lore: {
                feats: ['alert', 'keenMind', 'skilled', 'lucky']
            }
        }
    },

    cleric: {
        stats: {
            priority: ['wis', 'con', 'str', 'dex', 'int', 'cha'],
            allocated: { wis: 7, con: 7, str: 5, dex: 2, int: 0, cha: 0 }
        },
        skills: ['insightProficiency', 'religionProficiency', 'medicineProficiency', 'historyProficiency', 'persuasionProficiency', 'perceptionProficiency'],
        expertise: ['insightExpertise', 'religionExpertise', 'medicineExpertise', 'perceptionExpertise'],
        feats: ['warCaster', 'resilient', 'sentinel', 'telekinetic', 'feyTouched', 'heavyArmorMaster', 'alert', 'tough'],
        tools: ['herbalismKitProficiency', 'calligraphersToolsProficiency', 'smithsToolsProficiency'],
        equipment: {
            armor: ['plateArmor', 'chainMail', 'breastplate', 'scaleMail', 'studdedLeatherArmor', 'shieldEquipment'],
            armament: ['warhammer', 'greatsword', 'mace', 'quarterstaff', 'lightCrossbow', 'sacredFlame', 'shieldEquipment']
        },
        spellcasting: [
            'guidance', 'sacredFlame', 'thaumaturgy', 'tollTheDead', 'wordOfRadiance',
            'bless', 'healingWord', 'cureWounds', 'guidingBolt', 'inflictWounds', 'shieldOfFaith', 'sanctuary', 'command',
            'spiritualWeapon', 'holdPerson', 'lesserRestoration', 'aid', 'prayerOfHealing', 'silence', 'blindnessDeafness',
            'spiritGuardians', 'revivify', 'dispelMagic', 'massHealingWord', 'beaconOfHope'
        ],
        classOptions: {
            divineOrder: ['protector', 'thaumaturge'],
            blessedStrikes: ['divineStrike', 'potentSpellcastingCleric']
        },
        subclasses: {
            lifeDomain: {
                equipment: {
                    armor: ['plateArmor', 'chainMail', 'splintArmor', 'breastplate', 'scaleMail'],
                    armament: ['warhammer', 'mace', 'shieldEquipment']
                },
                classOptions: { divineOrder: ['protector', 'thaumaturge'] },
                feats: ['warCaster', 'heavyArmorMaster', 'tough']
            },
            warDomain: {
                equipment: {
                    armor: ['plateArmor', 'chainMail', 'breastplate', 'scaleMail'],
                    armament: ['warhammer', 'greatsword', 'mace', 'shieldEquipment']
                },
                classOptions: { divineOrder: ['protector', 'thaumaturge'] },
                feats: ['greatWeaponMaster', 'sentinel', 'warCaster']
            },
            lightDomain: {
                classOptions: { divineOrder: ['thaumaturge'] },
                feats: ['feyTouched', 'warCaster', 'elementalAdept']
            },
            trickeryDomain: {
                stats: {
                    priority: ['wis', 'dex', 'con', 'cha', 'int', 'str'],
                    allocated: { wis: 7, dex: 7, con: 5, cha: 2, int: 0, str: 0 }
                },
                equipment: {
                    armor: ['studdedLeatherArmor', 'breastplate'],
                    armament: ['rapier', 'shortbow', 'shieldEquipment', 'dagger']
                },
                classOptions: { divineOrder: ['thaumaturge'] },
                feats: ['shadowTouched', 'warCaster', 'skulker']
            },
            knowledge: {
                classOptions: { divineOrder: ['thaumaturge'] },
                feats: ['keenMind', 'observant', 'telekinetic']
            }
        }
    },

    druid: {
        stats: {
            priority: ['wis', 'con', 'dex', 'int', 'str', 'cha'],
            allocated: { wis: 7, con: 7, dex: 5, int: 2, str: 0, cha: 0 }
        },
        skills: ['natureProficiency', 'survivalProficiency', 'perceptionProficiency', 'animalHandlingProficiency', 'insightProficiency', 'medicineProficiency'],
        expertise: ['natureExpertise', 'perceptionExpertise', 'survivalExpertise', 'animalHandlingExpertise'],
        feats: ['warCaster', 'resilient', 'telekinetic', 'feyTouched', 'observant', 'alert', 'tough', 'lucky'],
        tools: ['herbalismKitProficiency', 'woodcarversToolsProficiency', 'poisonersKitProficiency'],
        equipment: {
            armor: ['halfPlateArmor', 'breastplate', 'scaleMail', 'hideArmor', 'leatherArmor', 'shieldEquipment'],
            armament: ['quarterstaff', 'scimitar', 'sickle', 'dagger', 'produceFlame', 'shieldEquipment']
        },
        spellcasting: [
            'shillelagh', 'guidance', 'produceFlame', 'thornWhip', 'starryWisp',
            'entangle', 'healingWord', 'cureWounds', 'fogCloud', 'thunderwave', 'goodberry', 'faerieFire', 'speakWithAnimals',
            'spikeGrowth', 'passWithoutTrace', 'moonbeam', 'barkskin', 'heatMetal', 'flamingSphere', 'lesserRestoration',
            'callLightning', 'sleetStorm', 'plantGrowth', 'dispelMagic', 'waterBreathing'
        ],
        classOptions: {
            primalOrder: ['magician', 'warden'],
            elementalFury: ['primalStrike', 'potentSpellcasting']
        },
        subclasses: {
            circleOfTheMoon: {
                classOptions: { primalOrder: ['warden'] },
                equipment: { armament: ['scimitar', 'quarterstaff', 'shieldEquipment'] },
                feats: ['warCaster', 'durable', 'sentinel', 'tough']
            },
            circleOfTheSea: {
                classOptions: { primalOrder: ['warden'] },
                equipment: { armament: ['trident', 'scimitar', 'quarterstaff', 'shieldEquipment'] },
                feats: ['observant', 'warCaster', 'elementalAdept']
            },
            circleOfTheLand: {
                classOptions: { primalOrder: ['magician'] },
                feats: ['telekinetic', 'feyTouched', 'warCaster']
            },
            circleOfTheStars: {
                classOptions: { primalOrder: ['magician'] },
                feats: ['spellSniper', 'warCaster', 'feyTouched']
            }
        }
    },

    fighter: {
        stats: {
            priority: ['str', 'con', 'dex', 'wis', 'int', 'cha'],
            allocated: { str: 7, con: 7, dex: 5, wis: 2, int: 0, cha: 0 }
        },
        skills: ['athleticsProficiency', 'acrobaticsProficiency', 'intimidationProficiency', 'perceptionProficiency', 'survivalProficiency', 'historyProficiency'],
        expertise: ['athleticsExpertise', 'perceptionExpertise', 'intimidationExpertise'],
        feats: ['greatWeaponMaster', 'polearmMaster', 'sentinel', 'heavyArmorMaster', 'tough', 'alert', 'crusher', 'slasher', 'sharpshooter'],
        tools: ['smithsToolsProficiency', 'carpentersToolsProficiency', 'leatherworkersToolsProficiency', 'gamingSetProficiency'],
        equipment: {
            armor: ['plateArmor', 'chainMail', 'splintArmor', 'shieldEquipment'],
            armament: ['greatsword', 'halberd', 'longsword', 'shieldEquipment', 'javelin', 'heavyCrossbow']
        },
        spellcasting: [],
        classOptions: {
            fightingStyle: ['greatWeaponFighting', 'defense', 'dueling', 'twoWeaponFighting', 'archery', 'protection', 'interception']
        },
        subclasses: {
            battleMaster: {
                equipment: { armament: ['halberd', 'glaive', 'greatsword', 'javelin'] },
                feats: ['sentinel', 'polearmMaster', 'greatWeaponMaster'],
                classOptions: { fightingStyle: ['greatWeaponFighting', 'defense'] }
            },
            champion: {
                equipment: { armament: ['greatsword', 'greataxe', 'maul', 'javelin'] },
                feats: ['greatWeaponMaster', 'crusher', 'slasher', 'tough'],
                classOptions: { fightingStyle: ['greatWeaponFighting', 'defense'] }
            },
            eldritchKnight: {
                stats: {
                    priority: ['str', 'int', 'con', 'dex', 'wis', 'cha'],
                    allocated: { str: 7, int: 7, con: 5, dex: 2, wis: 0, cha: 0 }
                },
                equipment: { armament: ['longsword', 'shieldEquipment', 'javelin'] },
                feats: ['warCaster', 'elementalAdept', 'heavyArmorMaster'],
                classOptions: { fightingStyle: ['dueling', 'defense'] },
                spellcasting: ['fireBolt', 'boomingBlade', 'shield', 'magicMissile', 'absorbElements', 'mistyStep', 'shadowBlade']
            },
            psiWarrior: {
                stats: {
                    priority: ['str', 'int', 'con', 'dex', 'wis', 'cha'],
                    allocated: { str: 7, int: 7, con: 5, dex: 2, wis: 0, cha: 0 }
                },
                equipment: { armament: ['greatsword', 'longsword', 'shieldEquipment'] },
                feats: ['keenMind', 'telekinetic', 'greatWeaponMaster'],
                classOptions: { fightingStyle: ['greatWeaponFighting', 'defense'] }
            },
            banneret: {
                equipment: { armament: ['longsword', 'shieldEquipment', 'javelin'] },
                feats: ['inspiringLeader', 'shieldMaster', 'tough'],
                classOptions: { fightingStyle: ['dueling', 'protection'] }
            }
        }
    },

    monk: {
        stats: {
            priority: ['dex', 'wis', 'con', 'str', 'int', 'cha'],
            allocated: { dex: 7, wis: 7, con: 5, str: 2, int: 0, cha: 0 }
        },
        skills: ['acrobaticsProficiency', 'athleticsProficiency', 'stealthProficiency', 'insightProficiency', 'perceptionProficiency', 'religionProficiency'],
        expertise: ['acrobaticsExpertise', 'stealthExpertise', 'athleticsExpertise', 'perceptionExpertise'],
        feats: ['speedy', 'mobile', 'alert', 'crusher', 'athlete', 'tough', 'resilient', 'sentinel'],
        tools: ['calligraphersToolsProficiency', 'herbalismKitProficiency', 'woodcarversToolsProficiency', 'fluteProficiency'],
        equipment: {
            armor: ['unarmored'],
            armament: ['quarterstaff', 'spear', 'shortsword', 'dagger', 'dart']
        },
        spellcasting: [],
        classOptions: {},
        subclasses: {
            shadows: {
                equipment: { armament: ['shortsword', 'dagger', 'quarterstaff'] },
                feats: ['skulker', 'alert', 'shadowTouched', 'mobile']
            },
            openHand: {
                equipment: { armament: ['quarterstaff', 'spear'] },
                feats: ['crusher', 'charger', 'mobile', 'speedy']
            },
            elements: {
                equipment: { armament: ['quarterstaff', 'spear'] },
                feats: ['elementalAdept', 'mobile', 'resilient']
            },
            mercy: {
                equipment: { armament: ['quarterstaff', 'spear', 'shortsword'] },
                feats: ['athlete', 'mobile', 'healer', 'tough']
            }
        }
    },

    paladin: {
        stats: {
            priority: ['str', 'cha', 'con', 'wis', 'dex', 'int'],
            allocated: { str: 7, cha: 7, con: 5, wis: 2, dex: 0, int: 0 }
        },
        skills: ['athleticsProficiency', 'persuasionProficiency', 'religionProficiency', 'insightProficiency', 'intimidationProficiency'],
        expertise: ['athleticsExpertise', 'persuasionExpertise', 'religionExpertise', 'intimidationExpertise'],
        feats: ['greatWeaponMaster', 'polearmMaster', 'sentinel', 'heavyArmorMaster', 'shieldMaster', 'warCaster', 'tough', 'inspiringLeader'],
        tools: ['smithsToolsProficiency', 'leatherworkersToolsProficiency', 'carpentersToolsProficiency'],
        equipment: {
            armor: ['plateArmor', 'chainMail', 'splintArmor', 'shieldEquipment'],
            armament: ['longsword', 'greatsword', 'halberd', 'shieldEquipment', 'javelin']
        },
        spellcasting: [
            'bless', 'heroism', 'cureWounds', 'shieldOfFaith', 'thunderousSmite', 'wrathfulSmite', 'divineFavor', 'command',
            'findSteed', 'aid', 'lesserRestoration', 'shiningSmite', 'magicWeapon'
        ],
        classOptions: {
            fightingStyle: ['defense', 'dueling', 'greatWeaponFighting', 'interception', 'protection', 'blessedWarrior']
        },
        subclasses: {
            ancients: {
                equipment: { armament: ['halberd', 'glaive', 'shieldEquipment', 'longsword'] },
                feats: ['polearmMaster', 'sentinel', 'greatWeaponMaster'],
                classOptions: { fightingStyle: ['defense', 'greatWeaponFighting'] }
            },
            vengeance: {
                equipment: { armament: ['greatsword', 'greataxe', 'javelin'] },
                feats: ['greatWeaponMaster', 'sentinel', 'slasher'],
                classOptions: { fightingStyle: ['greatWeaponFighting', 'defense'] }
            },
            devotion: {
                equipment: { armament: ['longsword', 'shieldEquipment', 'javelin'] },
                feats: ['shieldMaster', 'heavyArmorMaster', 'warCaster'],
                classOptions: { fightingStyle: ['dueling', 'defense'] }
            },
            glory: {
                equipment: { armament: ['longsword', 'shieldEquipment', 'spear'] },
                feats: ['charger', 'shieldMaster', 'athlete'],
                classOptions: { fightingStyle: ['dueling', 'defense'] }
            },
            nobleGenies: {
                equipment: { armament: ['scimitar', 'shieldEquipment', 'javelin'] },
                feats: ['feyTouched', 'warCaster', 'elementalAdept'],
                classOptions: { fightingStyle: ['defense', 'dueling'] }
            }
        }
    },

    ranger: {
        stats: {
            priority: ['dex', 'wis', 'con', 'str', 'int', 'cha'],
            allocated: { dex: 7, wis: 7, con: 5, str: 2, int: 0, cha: 0 }
        },
        skills: ['stealthProficiency', 'survivalProficiency', 'perceptionProficiency', 'natureProficiency', 'athleticsProficiency', 'animalHandlingProficiency'],
        expertise: ['stealthExpertise', 'perceptionExpertise', 'survivalExpertise', 'natureExpertise'],
        feats: ['sharpshooter', 'alert', 'speedy', 'crossbowExpert', 'skulker', 'resilient', 'tough', 'warCaster'],
        tools: ['herbalismKitProficiency', 'woodcarversToolsProficiency', 'leatherworkersToolsProficiency', 'navigatorsToolsProficiency'],
        equipment: {
            armor: ['breastplate', 'scaleMail', 'studdedLeatherArmor'],
            armament: ['longbow', 'handCrossbow', 'shortsword', 'rapier', 'dagger']
        },
        spellcasting: [
            'huntersMark', 'goodberry', 'longstrider', 'fogCloud', 'cureWounds', 'ensnaringStrike', 'absorbElements', 'animalFriendship',
            'passWithoutTrace', 'spikeGrowth', 'darkvision', 'silence', 'aid', 'lesserRestoration',
            'conjureBarrage', 'lightningArrow', 'waterBreathing'
        ],
        classOptions: {
            fightingStyle: ['archery', 'twoWeaponFighting', 'defense', 'dueling', 'druidicWarrior']
        },
        subclasses: {
            gloomStalker: {
                equipment: { armament: ['longbow', 'shortsword', 'dagger'] },
                feats: ['sharpshooter', 'alert', 'skulker'],
                classOptions: { fightingStyle: ['archery'] }
            },
            hunter: {
                equipment: { armament: ['handCrossbow', 'shortsword', 'dagger'] },
                feats: ['sharpshooter', 'crossbowExpert', 'speedy'],
                classOptions: { fightingStyle: ['archery'] }
            },
            beastMaster: {
                equipment: { armament: ['longbow', 'shortsword', 'dagger'] },
                feats: ['alert', 'sharpshooter', 'mountedCombatant'],
                classOptions: { fightingStyle: ['archery'] }
            },
            feyWanderer: {
                equipment: { armament: ['rapier', 'shortbow', 'shieldEquipment'] },
                feats: ['feyTouched', 'skillExpert', 'alert'],
                classOptions: { fightingStyle: ['dueling', 'archery'] }
            },
            winterWalker: {
                equipment: { armament: ['longbow', 'scimitar', 'dagger'] },
                feats: ['slasher', 'sharpshooter', 'elementalAdept'],
                classOptions: { fightingStyle: ['archery'] }
            }
        }
    },

    rogue: {
        stats: {
            priority: ['dex', 'con', 'int', 'wis', 'cha', 'str'],
            allocated: { dex: 7, con: 7, int: 5, wis: 2, cha: 0, str: 0 }
        },
        skills: ['stealthProficiency', 'sleightOfHandProficiency', 'acrobaticsProficiency', 'perceptionProficiency', 'deceptionProficiency', 'investigationProficiency', 'insightProficiency'],
        expertise: ['stealthExpertise', 'thievesToolsExpertise', 'sleightOfHandExpertise', 'perceptionExpertise', 'deceptionExpertise', 'acrobaticsExpertise'],
        feats: ['alert', 'skulker', 'speedy', 'lucky', 'defensiveDuelist', 'sharpshooter', 'piercer', 'mobile'],
        tools: ['thievesToolsProficiency', 'disguiseKitProficiency', 'forgeryKitProficiency', 'poisonersKitProficiency'],
        equipment: {
            armor: ['studdedLeatherArmor', 'leatherArmor'],
            armament: ['rapier', 'shortsword', 'dagger', 'shortbow', 'handCrossbow']
        },
        spellcasting: [],
        classOptions: {},
        subclasses: {
            assassin: {
                equipment: { armament: ['rapier', 'shortbow', 'dagger'] },
                feats: ['piercer', 'alert', 'skulker', 'poisoner']
            },
            soulknife: {
                equipment: { armament: ['dagger', 'shortsword'] },
                feats: ['speedy', 'alert', 'telepathic', 'mobile']
            },
            thief: {
                equipment: { armament: ['rapier', 'shortbow', 'dagger'] },
                feats: ['defensiveDuelist', 'alert', 'speedy', 'lucky']
            },
            arcaneTrickster: {
                stats: {
                    priority: ['dex', 'int', 'con', 'wis', 'cha', 'str'],
                    allocated: { dex: 7, int: 7, con: 5, wis: 2, cha: 0, str: 0 }
                },
                equipment: { armament: ['rapier', 'shortbow', 'dagger'] },
                feats: ['warCaster', 'feyTouched', 'shadowTouched'],
                spellcasting: ['mageHand', 'boomingBlade', 'minorIllusion', 'shield', 'disguiseSelf', 'silentImage', 'findFamiliar', 'mistyStep', 'invisibility', 'mirrorImage']
            },
            scionOfTheThree: {
                equipment: { armament: ['rapier', 'shortsword', 'dagger'] },
                feats: ['observant', 'alert', 'piercer']
            }
        }
    },

    sorcerer: {
        stats: {
            priority: ['cha', 'con', 'dex', 'wis', 'int', 'str'],
            allocated: { cha: 7, con: 7, dex: 5, wis: 2, int: 0, str: 0 }
        },
        skills: ['arcanaProficiency', 'deceptionProficiency', 'persuasionProficiency', 'intimidationProficiency', 'insightProficiency'],
        expertise: ['persuasionExpertise', 'deceptionExpertise', 'arcanaExpertise'],
        feats: ['warCaster', 'feyTouched', 'spellSniper', 'elementalAdept', 'alert', 'lucky', 'telekinetic'],
        tools: ['alchemistsSuppliesProficiency', 'calligraphersToolsProficiency'],
        equipment: {
            armor: ['unarmored'],
            armament: ['dagger', 'quarterstaff', 'lightCrossbow']
        },
        spellcasting: [
            'fireBolt', 'mindSliver', 'prestidigitation', 'shockingGrasp', 'rayOfFrost', 'minorIllusion',
            'shield', 'magicMissile', 'chromaticOrb', 'thunderwave', 'disguiseSelf', 'burningHands',
            'scorchingRay', 'mistyStep', 'shatter', 'mirrorImage', 'web', 'holdPerson', 'blur',
            'fireball', 'haste', 'counterspell', 'lightningBolt', 'hypnoticPattern', 'fly'
        ],
        classOptions: {
            metamagic: ['quickenedSpell', 'twinnedSpell', 'subtleSpell', 'heightenedSpell', 'extendedSpell', 'empoweredSpell', 'carefulSpell', 'seekingSpell', 'transmutedSpell', 'distantSpell']
        },
        subclasses: {
            draconic: {
                classOptions: { metamagic: ['empoweredSpell', 'transmutedSpell', 'quickenedSpell'] },
                feats: ['spellSniper', 'elementalAdept', 'warCaster']
            },
            aberrant: {
                classOptions: { metamagic: ['heightenedSpell', 'subtleSpell', 'quickenedSpell'] },
                feats: ['feyTouched', 'telepathic', 'warCaster']
            },
            clockwork: {
                classOptions: { metamagic: ['carefulSpell', 'extendedSpell', 'twinnedSpell'] },
                feats: ['warCaster', 'tough', 'lucky']
            },
            wildMagic: {
                classOptions: { metamagic: ['quickenedSpell', 'seekingSpell', 'twinnedSpell'] },
                feats: ['alert', 'lucky', 'elementalAdept']
            },
            spellfire: {
                classOptions: { metamagic: ['distantSpell', 'twinnedSpell', 'empoweredSpell'] },
                feats: ['feyTouched', 'spellSniper', 'elementalAdept']
            }
        }
    },

    warlock: {
        stats: {
            priority: ['cha', 'con', 'dex', 'wis', 'int', 'str'],
            allocated: { cha: 7, con: 7, dex: 5, wis: 2, int: 0, str: 0 }
        },
        skills: ['deceptionProficiency', 'intimidationProficiency', 'arcanaProficiency', 'historyProficiency', 'investigationProficiency', 'natureProficiency'],
        expertise: ['deceptionExpertise', 'intimidationExpertise', 'arcanaExpertise'],
        feats: ['warCaster', 'spellSniper', 'feyTouched', 'shadowTouched', 'resilient', 'telekinetic', 'alert', 'moderatelyArmored'],
        tools: ['forgeryKitProficiency', 'poisonersKitProficiency', 'calligraphersToolsProficiency'],
        equipment: {
            armor: ['leatherArmor', 'studdedLeatherArmor'],
            armament: ['dagger', 'lightCrossbow', 'quarterstaff']
        },
        spellcasting: [
            'eldritchBlast', 'prestidigitation', 'minorIllusion', 'chillTouch',
            'hex', 'hellishRebuke', 'armorOfAgathys', 'armsOfHadar', 'witchBolt',
            'mistyStep', 'shatter', 'holdPerson', 'invisibility', 'darkness', 'mirrorImage',
            'hungerOfHadar', 'dispelMagic', 'counterspell', 'fly', 'hypnoticPattern', 'fear'
        ],
        classOptions: {
            eldritchInvocations: ['agonizingBlast', 'repellingBlast', 'armorOfShadows', 'eldritchMind', 'devilSight', 'fiendishVigor', 'maskOfManyFaces', 'mistyVisions', 'pactOfTheBladeFolder', 'pactOfTheTomeFolder', 'pactOfTheChainFolder', 'thirstingBlade', 'eldritchSmite', 'ascendantStep'],
            pactBoon: ['pactOfTheBladeFolder', 'pactOfTheTomeFolder', 'pactOfTheChainFolder']
        },
        subclasses: {
            fiendPatron: {
                classOptions: {
                    eldritchInvocations: ['pactOfTheBladeFolder', 'thirstingBlade', 'eldritchSmite', 'devilSight', 'agonizingBlast', 'eldritchMind']
                },
                feats: ['elementalAdept', 'warCaster', 'greatWeaponMaster']
            },
            archfeyPatron: {
                classOptions: {
                    eldritchInvocations: ['pactOfTheChainFolder', 'investmentOfTheChainMaster', 'armorOfShadows', 'agonizingBlast', 'repellingBlast', 'ascendantStep']
                },
                feats: ['spellSniper', 'feyTouched', 'warCaster']
            },
            celestialPatron: {
                classOptions: {
                    eldritchInvocations: ['pactOfTheTomeFolder', 'fiendishVigor', 'maskOfManyFaces', 'mistyVisions', 'giftOfTheDepths', 'agonizingBlast']
                },
                feats: ['resilient', 'healer', 'warCaster']
            },
            greatOldOnePatron: {
                classOptions: {
                    eldritchInvocations: ['eldritchSpear', 'lessonsOfTheFirstOnes', 'oneWithShadows', 'agonizingBlast', 'repellingBlast', 'devilSight']
                },
                feats: ['observant', 'telepathic', 'spellSniper']
            }
        }
    },

    wizard: {
        stats: {
            priority: ['int', 'con', 'dex', 'wis', 'str', 'cha'],
            allocated: { int: 7, con: 7, dex: 5, wis: 2, str: 0, cha: 0 }
        },
        skills: ['arcanaProficiency', 'historyProficiency', 'investigationProficiency', 'religionProficiency', 'insightProficiency', 'medicineProficiency'],
        expertise: ['arcanaExpertise', 'historyExpertise', 'investigationExpertise'],
        feats: ['warCaster', 'alert', 'resilient', 'telekinetic', 'keenMind', 'observant', 'spellSniper', 'feyTouched'],
        tools: ['calligraphersToolsProficiency', 'alchemistsSuppliesProficiency'],
        equipment: {
            armor: ['unarmored'],
            armament: ['dagger', 'quarterstaff', 'lightCrossbow']
        },
        spellcasting: [
            'fireBolt', 'prestidigitation', 'mageHand', 'rayOfFrost', 'minorIllusion', 'tollTheDead', 'shockingGrasp',
            'shield', 'mageArmor', 'magicMissile', 'absorbElements', 'detectMagic', 'findFamiliar', 'thunderwave', 'featherFall', 'sleep',
            'mistyStep', 'mirrorImage', 'web', 'shatter', 'scorchingRay', 'holdPerson', 'invisibility', 'seeInvisibility', 'blur',
            'fireball', 'counterspell', 'dispelMagic', 'haste', 'slow', 'fly', 'lightningBolt', 'hypnoticPattern'
        ],
        classOptions: {},
        subclasses: {
            abjurer: {
                feats: ['alert', 'warCaster', 'tough']
            },
            bladesinger: {
                stats: {
                    priority: ['dex', 'int', 'con', 'wis', 'str', 'cha'],
                    allocated: { dex: 7, int: 7, con: 5, wis: 2, str: 0, cha: 0 }
                },
                equipment: {
                    armor: ['studdedLeatherArmor', 'leatherArmor'],
                    armament: ['rapier', 'shortsword', 'dagger']
                },
                feats: ['warCaster', 'mobile', 'resilient', 'defensiveDuelist']
            },
            diviner: {
                feats: ['observant', 'lucky', 'alert']
            },
            evoker: {
                feats: ['elementalAdept', 'spellSniper', 'warCaster']
            },
            illusionist: {
                feats: ['shadowTouched', 'feyTouched', 'alert']
            }
        }
    },

    artificer: {
        stats: {
            priority: ['int', 'con', 'dex', 'str', 'wis', 'cha'],
            allocated: { int: 7, con: 7, dex: 5, str: 2, wis: 0, cha: 0 }
        },
        skills: ['arcanaProficiency', 'investigationProficiency', 'historyProficiency', 'medicineProficiency', 'natureProficiency', 'perceptionProficiency', 'sleightOfHandProficiency'],
        expertise: ['arcanaExpertise', 'investigationExpertise', 'thievesToolsExpertise'],
        feats: ['warCaster', 'keenMind', 'heavyArmorMaster', 'sentinel', 'alert', 'elementalAdept', 'resilient'],
        tools: ['tinkersToolsProficiency', 'thievesToolsProficiency', 'smithsToolsProficiency', 'alchemistsSuppliesProficiency'],
        equipment: {
            armor: ['breastplate', 'scaleMail', 'studdedLeatherArmor', 'shieldEquipment'],
            armament: ['lightCrossbow', 'quarterstaff', 'dagger', 'shieldEquipment']
        },
        spellcasting: [
            'mending', 'fireBolt', 'guidance', 'prestidigitation', 'rayOfFrost', 'shockingGrasp',
            'cureWounds', 'healingWord', 'absorbElements', 'shield', 'sanctuary', 'faerieFire', 'grease', 'detectMagic',
            'aid', 'lesserRestoration', 'heatMetal', 'web', 'enhanceAbility', 'seeInvisibility', 'invisibility',
            'dispelMagic', 'revivify', 'haste', 'fly'
        ],
        classOptions: {
            armorModel: ['guardianModel', 'infiltratorModel', 'dreadnaughtModel']
        },
        subclasses: {
            armorer: {
                equipment: {
                    armor: ['plateArmor', 'chainMail'],
                    armament: ['shieldEquipment', 'quarterstaff', 'dagger']
                },
                classOptions: { armorModel: ['guardianModel'] },
                feats: ['heavyArmorMaster', 'sentinel', 'warCaster']
            },
            artillerist: {
                equipment: {
                    armor: ['breastplate', 'scaleMail'],
                    armament: ['lightCrossbow', 'pistol', 'dagger', 'shieldEquipment']
                },
                feats: ['elementalAdept', 'spellSniper', 'warCaster']
            },
            alchemist: {
                feats: ['alert', 'keenMind', 'healer']
            },
            cartographer: {
                feats: ['telekinetic', 'observant', 'alert']
            },
            reanimator: {
                feats: ['warCaster', 'resilient', 'tough']
            }
        }
    },

    psion: {
        stats: {
            priority: ['int', 'dex', 'con', 'wis', 'cha', 'str'],
            allocated: { int: 7, dex: 7, con: 5, wis: 2, cha: 0, str: 0 }
        },
        skills: ['arcanaProficiency', 'insightProficiency', 'investigationProficiency', 'perceptionProficiency', 'historyProficiency', 'persuasionProficiency'],
        expertise: ['arcanaExpertise', 'insightExpertise', 'perceptionExpertise'],
        feats: ['telekinetic', 'keenMind', 'warCaster', 'speedy', 'alert', 'lucky'],
        tools: ['calligraphersToolsProficiency', 'herbalismKitProficiency'],
        equipment: {
            armor: ['unarmored', 'studdedLeatherArmor', 'leatherArmor'],
            armament: ['dagger', 'quarterstaff', 'lightCrossbow']
        },
        spellcasting: [
            'mindSliver', 'mageHand', 'prestidigitation',
            'shield', 'mageArmor', 'dissonantWhispers', 'detectThoughts',
            'mindSpike', 'mistyStep', 'shatter', 'holdPerson', 'invisibility', 'levitate',
            'hypnoticPattern', 'haste', 'fly', 'telekinesis', 'dimensionDoor'
        ],
        classOptions: {},
        subclasses: {
            metamorph: {
                equipment: { armament: ['shortsword', 'dagger', 'quarterstaff'] },
                feats: ['warCaster', 'mobile', 'speedy']
            },
            psykinetic: {
                feats: ['telekinetic', 'spellSniper', 'alert']
            },
            psiWarper: {
                feats: ['speedy', 'mobile', 'alert']
            },
            seer: {
                feats: ['keenMind', 'observant', 'alert']
            },
            shaper: {
                feats: ['telekinetic', 'warCaster', 'tough']
            },
            telepath: {
                feats: ['keenMind', 'telepathic', 'actor']
            }
        }
    }
};

/**
 * Normalizes a class or subclass key into lowercase alphanumeric.
 */
export function normalizeKey(str) {
    if (!str) return '';
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Finds the preset configuration for a character based on class and subclass.
 */
export function getPresetForCharacter(characterData) {
    const rawClass = characterData?.meta?.class || characterData?.class?.id || characterData?.class?.name || (typeof characterData?.class === 'string' ? characterData.class : '') || '';
    const rawSub = characterData?.meta?.sub || characterData?.subclass?.id || characterData?.subclass?.name || (typeof characterData?.subclass === 'string' ? characterData.subclass : '') || '';

    const cleanClass = normalizeKey(rawClass);
    if (!cleanClass) return null;

    // Look for matching base class
    let basePreset = AUTO_PICK_PRESETS[cleanClass];
    if (!basePreset) {
        // Try substring match on class keys
        const classKey = Object.keys(AUTO_PICK_PRESETS).find(k => cleanClass.includes(k) || k.includes(cleanClass));
        if (classKey) {
            basePreset = AUTO_PICK_PRESETS[classKey];
        }
    }

    if (!basePreset) return null;

    // Resolve subclass overrides
    const cleanSub = normalizeKey(rawSub);
    let subPreset = null;

    if (cleanSub && basePreset.subclasses) {
        // Direct key match
        subPreset = basePreset.subclasses[cleanSub];
        if (!subPreset) {
            // Find key where subclass name contains key or key contains subclass name
            const subKey = Object.keys(basePreset.subclasses).find(k => {
                const normK = normalizeKey(k);
                return cleanSub.includes(normK) || normK.includes(cleanSub);
            });
            if (subKey) {
                subPreset = basePreset.subclasses[subKey];
            }
        }
    }

    // Merge basePreset and subPreset
    const merged = {
        ...basePreset,
        stats: subPreset?.stats || basePreset.stats,
        feats: subPreset?.feats ? [...subPreset.feats, ...(basePreset.feats || [])] : basePreset.feats,
        equipment: {
            armor: Array.from(new Set([
                ...(subPreset?.equipment?.armor || []),
                ...(basePreset.equipment?.armor || [])
            ])),
            armament: Array.from(new Set([
                ...(subPreset?.equipment?.armament || []),
                ...(basePreset.equipment?.armament || [])
            ]))
        },
        classOptions: {
            ...(basePreset.classOptions || {}),
            ...(subPreset?.classOptions || {})
        },
        spellcasting: subPreset?.spellcasting
            ? [...subPreset.spellcasting, ...(basePreset.spellcasting || [])]
            : basePreset.spellcasting,
        skills: subPreset?.skills ? [...subPreset.skills, ...(basePreset.skills || [])] : basePreset.skills,
        expertise: subPreset?.expertise ? [...subPreset.expertise, ...(basePreset.expertise || [])] : basePreset.expertise,
        tools: subPreset?.tools ? [...subPreset.tools, ...(basePreset.tools || [])] : basePreset.tools
    };

    return merged;
}
