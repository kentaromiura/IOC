IOC
===

This is the third rewrite of my really old js IOC container:
http://mykenta.blogspot.it/2007/09/kentaioc-js-ioc-library.html.

How to use
----------

To directly use the IOC container with manual injection:

```js
// Construction injection example

import {IOC} from 'IOC';
import Samurai from './Samurai';
import Shuriken from './Shuriken';
import Sword from './Sword';

const container = new IOC();
container.register("samurai", Samurai);

const warrior1 = container.byConstructor("samurai", new Shuriken);
const warrior2 = container.byConstructor("samurai", new Sword);

warrior1.attack("The evildoers") // Pierced The evildoers armor
warrior2.attack("The evildoers") // Chopped The evildoers in half

```

```js
// Setter injection example
import {IOC} from 'IOC';
import Samurai from './Samurai';
import Shuriken from './Shuriken';
import Sword from './Sword';

const container = new IOC();
container.register("samurai", Samurai);

const warrior1 = container.bySetter("samurai", { weapon: new Shuriken });
const warrior2 = container.bySetter("samurai", { weapon: new Sword });

warrior1.attack("The evildoers") // Pierced The evildoers armor
warrior2.attack("The evildoers") // Chopped The evildoers in half
```

Alternatively it's possible to get a Ninject style configuration using Unit:

```js
import {Unit} from 'IOC';

import Shuriken from './Shuriken';
import Sword from './Sword';

// This is the contract.
class IWeapon { attack(who){ throw 'not implemented'; } }

class Shuriken extends IWeapon {
    attack(who) { return `Pierced ${who} armor`; }
}
class Sword extends Iweapon {
    attack(who) { return `Chopped ${who} in half`; }
}

const unit1 = new Unit();
const unit2 = new Unit();

class Samurai {
    // This is where the class defines its contract.
    static weapon = IWeapon;

    attack(who) {
        return this.weapon.hit(who);
    }
}

// In unit 1 we will configure IWeapon to be Sword instance...
unit1.bind(IWeapon).to(Sword);
// ...while in unit 2 it will be Shuriken.
unit2.bind(IWeapon).to(Shuriken);

unit1.get(Samurai).attack('The evildoers'); // Chopped The evildoers in half
unit2.get(Samurai).attack('The evildoers'); // Pierced The evildoers armor
```
