'use strict';

var _ = require('lodash');

/**
 * Creates a new Weight List
 * @constructor
 */
function Wlist() {
    this.items = [];
}

/**
 * @example
 * wlist.put('myitem'); //Adds 'myitem' with weight 0
 *
 * @example
 * wlist.put('myitem', 3); //Adds 'myitem' with weight 3
 *
 * @example
 * wlist.put({key: value}, 'myitem', 3); //Adds {key: value} with name 'myitem' with weight 3
 *
 * @param {...*} args One param: Item value. Weight set to 0. Two params: Item value and weight. Three params: Item value, item name and weight
 * @returns {Number} New length of items list
 */
Wlist.prototype.put = function (args) {
    if (!arguments) {
        throw new Error('No item is set')
    }

    var item = arguments[0];
    var name = arguments.length > 2 ? arguments[1] : undefined;
    var weight = arguments.length > 2 ? arguments[2] : arguments[1];

    var newItem = {
        item: item,
        weight: isNaN(weight) ? 0 : parseInt(weight)
    };

    if (name) {
        newItem.name = '' + name;
    }

    return this.items.push(newItem);
};

/**
 *
 * @param {String} [name] Item name to find
 * @returns {Array|*} If name is provided returns the item with that name, else returns the item list ordered by weight from lowest to greatest
 */
Wlist.prototype.get = function (name) {
    if (name) {
        var foundItem = _.find(this.items, {name: name});
        return foundItem ? foundItem.item : undefined;
    }

    this.items.sort(compare);

    return this.items.map(function (item) {
        return item.item;
    });
};

/**
 * @private
 * @param item1
 * @param item2
 * @returns {number}
 */
function compare(item1, item2) {
    return item1.weight - item2.weight;
}

module.exports = Wlist;
