'use strict';

var expect = require('expect.js'),
    Wlist = require('../index');

describe('Wlist Test', function () {

    var wlist;

    beforeEach(function () {
        wlist = new Wlist();
    });

    it('should be able to insert items without weight', function (done) {
        wlist.put('item1');
        wlist.put('item2');

        var items = wlist.get();
        var expected = ['item1', 'item2'];

        expect(items).to.be.eql(expected);
        done();
    });

    it('should be able to insert items with weight', function (done) {
        wlist.put('item1', 0);
        wlist.put('item2', 0);

        var items = wlist.get();
        var expected = ['item1', 'item2'];

        expect(items).to.be.eql(expected);
        done();
    });

    it('should be return items ordered by weight', function (done) {
        wlist.put('item1', 3);
        wlist.put('item2', 2);
        wlist.put('item3', 1);

        var items = wlist.get();
        var expected = ['item3', 'item2', 'item1'];

        expect(items).to.be.eql(expected);
        done();
    });

    it('should be able to insert items with weight and name', function (done) {
        wlist.put('item1', 'item1-name', 0);
        wlist.put('item2', 'item2-name', 0);

        var items = wlist.get();
        var expected = ['item1', 'item2'];

        expect(items).to.be.eql(expected);
        done();
    });

    it('should be able to get item by name', function (done) {
        wlist.put('item1', 'item1-name', 0);
        wlist.put('item2', 'item2-name', 0);

        var item = wlist.get('item2-name');
        var expected = 'item2';

        expect(item).to.be.eql(expected);
        done();
    });

});