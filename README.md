# postURL
URL message exchange tool

## writing
```
postURL.write('hello!');
//http://blahblah.com/index.html#hello!

postURL.write('itshappened', {
  count : "11",
  enabled : false,
  list : [1, 2, 3]
});
//http://blahblah.com/index.html#itshappened::{"count":"11","enabled":false,"list":[1,2,3]}
```

## setting action\data splitter
```
postURL.splitter = '>>';
postURL.splitter = '++';
```

## reading 
```
postURL.read();
//{ action : 'hello!}
```

## listening
```
postURL.onMessage = function(data){
  console.log(data);
  //{ action : 'itshappened', data : Object }
}
```
