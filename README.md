# wlist
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A library to order lists in Node based on weight

Install using npm

````
npm install wlist
````

Generate Jsdoc

````
gulp jsdoc
````

Test module

````
gulp test
````
    
# Usage examples

* Order lists

````
var Wlist = require('wlist');
var wlist = new Wlist();

wlist.put('item1', 3);
wlist.put('item2', 2);
wlist.put('item3', 1);

var items = wlist.get(); // items -> ['item3', 'item2', 'item1']
````

* Order lists and get items by name

````
var Wlist = require('wlist');
var wlist = new Wlist();

wlist.put('item1', 'item1-name', 3);
wlist.put('item2', 'item2-name', 2);
wlist.put('item3', 'item3-name', -1);

var items = wlist.get(); // items -> ['item3', 'item2', 'item1']
var item = wlist.get('item2-name'); // item -> 'item2'
````

* Insert items before or after other

````
var Wlist = require('wlist');
var wlist = new Wlist();

wlist.put('item1', 'item1-name', 3);
wlist.put('item2', 'item2-name', 2);
wlist.put('item3', 'item3-name', -1);

var items = wlist.get(); // items -> ['item3', 'item2', 'item1']

wlist.before('item2-name', 'item4');
items = wlist.get(); // items -> ['item3', 'item4', 'item2', 'item1']

wlist.after('item2-name', 'item5');
items = wlist.get(); // items -> ['item3', 'item4', 'item2', 'item5', 'item1']
````

For more information see the JSDoc