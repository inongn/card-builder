# Conversion Guidelines

This document describes how to port features and traits from D&D 5.5e material to the yaml property system used by this project.

Every feature or trait translates to one or more properties

## Property Types

- Effect
- Slot
- Activity
- Extra
- Resource
- Reference

# Effect


## Activity Writing Style

All activity descriptions must follow the following format:

[trigger] (optional), [flavor]. [test] (optional), [effect], [extra] (optional)

- trigger is usually reserverd for reactions, but may apply to any activity that requires a specific trigger
- Flavor text is mostly non-mechanical, but usually specifies the range and/or target of the activity
- test is optional but almost always present, and always involves a d20 test: an attack roll, a saving throw, or an ability check
- effect is purely mechanical, may be its own sentence or appended to the mechanical test (often for saves)
- extra is optional and may contain any additional mechanical information for more complex activities, and often immitates the format of other elements

### Examples:

Ice Kife
- Flavor: You create a shard of ice and fling it at one creature within range
- test: Make a ranged spell attack against the target
- effect: On a hit, the target takes 1d10 Piercing damage
- extra: Hit or miss, the shard then explodes. The target and each creature within 5 feet of it must succeed on a Dexterity saving throw or take 2d6 Cold damage.

Fire Ball
- Flavor: A bright streak flashes from you to a point you choose within range and then blossoms with a low roar into a fiery explosion. 
- test: Each creature in a 20-foot-radius Sphere centered on that point makes a Dexterity saving throw,
- effect: taking 8d6 Fire damage on a failed save or half as much damage on a successful one.
- extra: Flammable objects in the area that aren’t being worn or carried start burning.

Shield
- trigger: When you are hit by an attack roll or targeted by the Magic Missile spell,
- flavor: an imperceptible barrier of magical force protects you.
- effect: Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from Magic Missile.

Hellish Rebuke
- trigger: When you take damage from a creature that you can see within range,
- flavor: the creature that damaged you is momentarily surrounded by green flames.
- test: It makes a Dexterity saving throw,
- effect: taking 2d10 Fire damage on a failed save or half as much damage on a successful one.


### Conversion notes:

The language of the game when detailing class, subclass, species, feat, etc. features is somewhat different from the language used in activities.

Often, the language is passive, the action type is explicit, the description is optional

Second Wind, in the Fighter class description: "You have a limited well of physical and mental stamina that you can draw on. As a Bonus Action, you can use it to regain Hit Points equal to 1d10 plus your Fighter level."
Second Wind, as an activity: "You draw on a well of physical and mental stamina. Regain 1d10+$(meta.level) Hit Points."

