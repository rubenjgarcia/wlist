'use strict'

/**
 * Creates a new Weight List
 * @constructor
 */
function Wlist () {
  this.items = []
}

function insertNewItem (newItem, items) {
  if (newItem.name) {
    var foundItem = find(newItem.name, items)
    if (foundItem) {
      foundItem.weight = newItem.weight
      foundItem.item = newItem.item
      return items.length
    }
  }

  return items.push(newItem)
}

/**
 * @example
 * wlist.put('myitem'); //Adds 'myitem' with weight 0
 *
 * @example
 * wlist.put('myitem', 3); //Adds 'myitem' with weight 3
 *
 * @example
 * wlist.put({key: value}, 'myitem', 3); //Adds {key: value} with name 'myitem' with weight 3. If an item with name 'myitem' exists it will be replaced
 *
 * @param {...*} args One param: Item value. Weight set to 0. Two params: Item value and weight. Three params: Item value, item name and weight
 * @returns {Number} Length of item's list
 */
Wlist.prototype.put = function (args) {
  if (!arguments || !arguments[ 0 ]) {
    throw new Error('No item is set')
  }

  var item = arguments[ 0 ]
  var name = arguments.length > 2 ? arguments[ 1 ] : undefined
  var weight = arguments.length > 2 ? arguments[ 2 ] : arguments[ 1 ]

  var newItem = {
    item: item,
    weight: isNaN(weight) ? 0 : parseInt(weight, 10) * 100,
    name: (name ? '' + name : undefined)
  }

  return insertNewItem(newItem, this.items)
}

function insert (items, before, search, item, name) {
  if (!item) {
    throw new Error('Parameter "item" is mandatory')
  }

  var weight
  if (!search) {
    weight = items.length ? items[ (before ? 0 : items.length - 1) ].weight + (before ? -1 : 1) : 0
  } else {
    var foundItem = find(search, items)
    weight = foundItem.weight + (before ? -1 : 1)
  }

  var newItem = {
    item: item,
    weight: weight,
    name: (name ? '' + name : undefined)
  }

  return insertNewItem(newItem, items)
}

/**
 * @example
 * wlist.before('myitem-name', 'mynewitem'); //Adds 'mynewitem' before 'myitem-name'
 *
 * @example
 * wlist.before('myitem-name', 'mynewitem', 'mynewitem-name'); //Adds 'mynewitem' before 'myitem-name' with name 'mynewitem-name'. If an item with name 'mynewitem-name' exists it will be replaced
 *
 * @param [before] {String} Name of the searched item. If null it will be inserted first
 * @param item {*} Our new item
 * @param [name] {String} Item name
 * @returns {Number} Length of item's list
 */
Wlist.prototype.before = function (before, item, name) {
  return insert(this.items, true, before, item, name)
}

/**
 * @example
 * wlist.after('myitem-name', 'mynewitem'); //Adds 'mynewitem' before 'myitem-name'
 *
 * @example
 * wlist.after('myitem-name', 'mynewitem', 'mynewitem-name'); //Adds 'mynewitem' before 'myitem-name' with name 'mynewitem-name'. If an item with name 'mynewitem-name' exists it will be replaced
 *
 * @param [after] {String} Name of the searched item. If null it will be inserted last
 * @param item {*} Our new item
 * @param [name] {String} Item name
 * @returns {Number} Length of item's list
 */
Wlist.prototype.after = function (after, item, name) {
  return insert(this.items, false, after, item, name)
}

/**
 * @private
 * @param name
 * @param items
 * @returns {*}
 */
function find (name, items) {
  if (!items || !items.length || items.length === 0) {
    return null
  }

  for (var i = 0; i < items.length; i++) {
    if (items[i].name && items[i].name === name) {
      return items[i]
    }
  }

  return null
}

/**
 *
 * @param {String} [name] Item name to find
 * @returns {Array|*} If name is provided returns the item with that name, else returns the item list ordered by weight from lowest to greatest
 */
Wlist.prototype.get = function (name) {
  if (name) {
    var foundItem = find(name, this.items)
    return foundItem ? foundItem.item : undefined
  }

  this.items.sort(compare)

  return this.items.map(function (item) {
    return item.item
  })
}

/**
 * @private
 * @param item1
 * @param item2
 * @returns {number}
 */
function compare (item1, item2) {
  return item1.weight - item2.weight
}

/**
 *
 * @param {String} name Item name to find
 * @returns {boolean} Returns if the list has an item with the provided name
 */
Wlist.prototype.hasItem = function (name) {
  return find(name, this.items) !== null
}

module.exports = Wlist
