/* globals describe, beforeEach, it */
'use strict'

var expect = require('expect.js')
var Wlist = require('../index')

describe('Wlist Test', function () {
  var wlist

  beforeEach(function () {
    wlist = new Wlist()
  })

  it('should be able to insert items without weight', function (done) {
    wlist.put('item1')
    wlist.put('item2')

    var items = wlist.get()
    var expected = [ 'item1', 'item2' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be able to insert items with weight', function (done) {
    wlist.put('item1', 0)
    wlist.put('item2', 0)

    var items = wlist.get()
    var expected = [ 'item1', 'item2' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be return items ordered by weight', function (done) {
    wlist.put('item1', 3)
    wlist.put('item2', 2)
    wlist.put('item3', 1)

    var items = wlist.get()
    var expected = [ 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be able to insert items with weight and name', function (done) {
    wlist.put('item1', 'item1-name', 0)
    wlist.put('item2', 'item2-name', 0)

    var items = wlist.get()
    var expected = [ 'item1', 'item2' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be able to get item by name', function (done) {
    wlist.put('item1', 'item1-name', 0)
    wlist.put('item2', 'item2-name', 0)

    var item = wlist.get('item2-name')
    var expected = 'item2'

    expect(item).to.be.eql(expected)
    done()
  })

  it('should be able to put an item on top', function (done) {
    wlist.put('item1', 'item1-name', 3)
    wlist.put('item2', 'item2-name', 2)
    wlist.put('item3', 'item3-name', -1)

    var items = wlist.get()
    var expected = [ 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)

    wlist.before(null, 'item4')

    items = wlist.get()
    expected = [ 'item4', 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be able to put an item on top in an empty wlist', function (done) {
    wlist.before(null, 'item4')

    var items = wlist.get()
    var expected = [ 'item4' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be able to put an item first and then put another first', function (done) {
    wlist.put('item1', 'item1-name', 3)
    wlist.put('item2', 'item2-name', 2)
    wlist.put('item3', 'item3-name', -1)

    var items = wlist.get()
    var expected = [ 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)

    wlist.before(null, 'item4')

    items = wlist.get()
    expected = [ 'item4', 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)

    wlist.before(null, 'item5')

    items = wlist.get()
    expected = [ 'item5', 'item4', 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be able to put an item before other', function (done) {
    wlist.put('item1', 'item1-name', 3)
    wlist.put('item2', 'item2-name', 2)
    wlist.put('item3', 'item3-name', -1)

    var items = wlist.get()
    var expected = [ 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)

    wlist.before('item2-name', 'item4')

    items = wlist.get()
    expected = [ 'item3', 'item4', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be able to put an item last', function (done) {
    wlist.put('item1', 'item1-name', 3)
    wlist.put('item2', 'item2-name', 2)
    wlist.put('item3', 'item3-name', -1)

    var items = wlist.get()
    var expected = [ 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)

    wlist.after(null, 'item4')

    items = wlist.get()
    expected = [ 'item3', 'item2', 'item1', 'item4' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be able to put an item last and then put another last', function (done) {
    wlist.put('item1', 'item1-name', 3)
    wlist.put('item2', 'item2-name', 2)
    wlist.put('item3', 'item3-name', -1)

    var items = wlist.get()
    var expected = [ 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)

    wlist.after(null, 'item4')

    items = wlist.get()
    expected = [ 'item3', 'item2', 'item1', 'item4' ]

    expect(items).to.be.eql(expected)

    wlist.after(null, 'item5')

    items = wlist.get()
    expected = [ 'item3', 'item2', 'item1', 'item4', 'item5' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be able to put an item after other', function (done) {
    wlist.put('item1', 'item1-name', 3)
    wlist.put('item2', 'item2-name', 2)
    wlist.put('item3', 'item3-name', -1)

    var items = wlist.get()
    var expected = [ 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)

    wlist.after('item2-name', 'item4')

    items = wlist.get()
    expected = [ 'item3', 'item2', 'item4', 'item1' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should overwrite an item if the name is the same', function (done) {
    wlist.put('item1', 'item1-name', 0)
    wlist.put('item2', 'item2-name', 0)

    var items = wlist.get()
    var expected = [ 'item1', 'item2' ]

    expect(items).to.be.eql(expected)

    wlist.put('item3', 'item2-name', 0)

    items = wlist.get()
    expected = [ 'item1', 'item3' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be able to put an item before other replacing the item with the same name', function (done) {
    wlist.put('item1', 'item1-name', 3)
    wlist.put('item2', 'item2-name', 2)
    wlist.put('item3', 'item3-name', -1)

    var items = wlist.get()
    var expected = [ 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)

    wlist.before('item1-name', 'item4', 'item3-name')

    items = wlist.get()
    expected = [ 'item2', 'item4', 'item1' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be able to put an item after other replacing the item with the same name', function (done) {
    wlist.put('item1', 'item1-name', 3)
    wlist.put('item2', 'item2-name', 2)
    wlist.put('item3', 'item3-name', -1)

    var items = wlist.get()
    var expected = [ 'item3', 'item2', 'item1' ]

    expect(items).to.be.eql(expected)

    wlist.after('item3-name', 'item4', 'item1-name')

    items = wlist.get()
    expected = [ 'item3', 'item4', 'item2' ]

    expect(items).to.be.eql(expected)
    done()
  })

  it('should be find item by name', function (done) {
    wlist.put('item1', 'item1-name', 0)
    wlist.put('item2', 'item2-name', 0)

    var hasItem = wlist.hasItem('item2-name')

    expect(hasItem).to.be.true

    hasItem = wlist.hasItem('item3-name')

    expect(hasItem).to.be.false
    done()
  })

  it('should throw an Error if method put is called without arguments', function (done) {
    expect(function () {
      wlist.put()
    }).throwError(new Error('No item is set'))
    done()
  })

  it('should throw an Error if method "before" or "after" is called without arguments', function (done) {
    wlist.put('item1', 'item1-name', 3)
    wlist.put('item2', 'item2-name', 2)
    wlist.put('item3', 'item3-name', -1)

    expect(function () {
      wlist.before('item2-name')
    }).throwError(new Error('Parameter "item" is mandatory'))

    expect(function () {
      wlist.after('item2-name')
    }).throwError(new Error('Parameter "item" is mandatory'))

    done()
  })

  it('should return undefined if there is no items', function (done) {
    expect(wlist.get('item-1')).to.be.undefined
    done()
  })
})
