#  flutter 创建页面

```dart
import 'package:flutter/material.dart';


//顶部导航
 class MyAppBar extends StatelessWidget {

  MyAppBar({this.title});
  final Widget title;

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
   return new Container(
    height:106.0,
    padding: const EdgeInsets.symmetric(horizontal: 8.0),
    decoration: new BoxDecoration(color: Colors.blue[500]),
    child: new Row(
     children: <Widget>[
      new IconButton(icon: new Icon(Icons.menu),tooltip: '导航菜单', onPressed: null),
      new Expanded(child: title),
      new IconButton(icon: new  Icon(Icons.search),tooltip: '搜索', onPressed: null)
     ],
    ),

   );
  }
 }

 //页面

class MyScafffold  extends StatelessWidget {

  @override
 Widget build(BuildContext context) {
    // TODO: implement build
    return  new Material(
     child: new Column(
      children: <Widget>[
       new MyAppBar(title: new Text('测试title', style: Theme.of(context).primaryTextTheme.title)),
       new Expanded(child:new Center(child: new Text('hello word')))
      ],
     ),
    );
  }
}

void main() {
  runApp(new MaterialApp(
   title: 'my App',
   home: new MyScafffold(),
  ));
}
import 'package:flutter/material.dart';


//顶部导航
 class MyAppBar extends StatelessWidget {

  MyAppBar({this.title});
  final Widget title;

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
   return new Container(
    height:106.0,
    padding: const EdgeInsets.symmetric(horizontal: 8.0),
    decoration: new BoxDecoration(color: Colors.blue[500]),
    child: new Row(
     children: <Widget>[
      new IconButton(icon: new Icon(Icons.menu),tooltip: '导航菜单', onPressed: null),
      new Expanded(child: title),
      new IconButton(icon: new  Icon(Icons.search),tooltip: '搜索', onPressed: null)
     ],
    ),

   );
  }
 }

 //页面

class MyScafffold  extends StatelessWidget {

  @override
 Widget build(BuildContext context) {
    // TODO: implement build
    return  new Material(
     child: new Column(
      children: <Widget>[
       new MyAppBar(title: new Text('测试title', style: Theme.of(context).primaryTextTheme.title)),
       new Expanded(child:new Center(child: new Text('hello word')))
      ],
     ),
    );
  }
}

void main() {
  runApp(new MaterialApp(
   title: 'my App',
   home: new MyScafffold(),
  ));
}

```


# appBar 写在页面里面

``` dart
import 'package:flutter/material.dart';

void main(){
  runApp(
   new MaterialApp(
    title: '测试App',
    home:new TutorialHome()

   )
  );
}

class TutorialHome extends  StatelessWidget {
 @override
 Widget build(BuildContext context) {
    // TODO: implement build
    return new Scaffold(
     appBar: new AppBar(
      leading: new IconButton(icon: new Icon(Icons.menu), tooltip: '导航菜单' ,onPressed: null),
      title: new Text('测试App'),
      actions: <Widget>[
       new IconButton(icon: new Icon(Icons.search),tooltip: '搜索', onPressed: null)
      ],
     ),
     body: new Center(child: new Text('hello  joe')),
     floatingActionButton: new FloatingActionButton(onPressed: null, tooltip: '添加',child: new Icon(Icons.add)),
    );
  }
}

```


# 处理手势

```dart
class MyButton  extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return new GestureDetector(
      onTap: () {
        print('myButton was tripped');
      },
      child:new Container(
        height: 36.0,
        padding:const EdgeInsets.all(8.0),
        margin: const EdgeInsets.symmetric(horizontal: 8.0),
        decoration: new BoxDecoration(
          borderRadius: new BorderRadius.circular(5.0),
          color: Colors.lightGreen[500]
        ),
        child: new Center(
          child: new Text('Engage'),
        ),
      )
    );
    
  }
}
```

# 状态组件

```dart
import 'package:flutter/material.dart';

void main(){
  runApp(
   new MaterialApp(
    title: '测试App',
    home:new Counter()
   )
  );
}


class Counter extends StatefulWidget {

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return new _CounterState();
  }

}


class _CounterState extends State<Counter> {


  int _counter = 0;

  void _increment(){
    setState(() {
      _counter++;
    });
  }

 @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Row(
      children: <Widget>[
        new RaisedButton(
          onPressed: _increment,
          child: new Text('增加'),

        ),
        new Text('你好$_counter')

      ],
    );
  }


}

```


# 状态分离

```dart
import 'package:flutter/material.dart';

void main(){
  runApp(
   new MaterialApp(
    title: '测试App',
    home:new CounterDisplay()
   )
  );
}


//展示型组件
 class CounterDisplay extends StatelessWidget {

   CounterDisplay({this.count});

   final int count;

  @override
   Widget build(BuildContext context){
    return new Text('Count:$count');
  }
 }


 //展示型组件
 class CounterIncrementor extends StatelessWidget {

   CounterIncrementor({this.onPressed});

   final VoidCallback onPressed;

   @override
   Widget build(BuildContext context) {
    return new RaisedButton(
      onPressed: onPressed,
      child: new Text('增加'),
    );
  }


 }

class Counter extends StatefulWidget{
  @override
  _CounterState createState() => new _CounterState();

}

class _CounterState extends State<Counter> {
  int _counter = 0;
  void increment(){
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Row(
     children: <Widget>[
       new CounterIncrementor(onPressed: increment),
       new CounterDisplay(count: _counter)
     ],
    );
  }

}
```

# 构建一个简单的应用

```dart
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        title: 'Startup Name Generator',
//        theme: new ThemeData(primaryColor: Colors.white),
        home: new RandomWords());
  }
}

class RandomWords extends StatefulWidget {
  @override
  createState() => new RadomWordsState();
}

class RadomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[];
  final bigFont = const TextStyle(fontSize: 18.0);
  final _saved = new Set<WordPair>();

  void _pushSaved() {
    Navigator.of(context).push(new MaterialPageRoute(builder: (context) {
      final tiles = _saved.map((pair) {
        return new ListTile(
            title: new Text(
          pair.asPascalCase,
          style: bigFont,
        ));
      });

      final divided =
          ListTile.divideTiles(context: context, tiles: tiles).toList();

      return new Scaffold(
          appBar: new AppBar(
            title: new Text('Saved Suggestions'),
          ),
          body: new ListView(children: divided));
    }));
  }

  Widget _buildSugestions() {
    return new ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemBuilder: (context, i) {
        if (i.isOdd) return new Divider();
        final index = i ~/ 2;
        if (index >= _suggestions.length) {
          _suggestions.addAll(generateWordPairs().take(10));
        }
        return _buildRow(_suggestions[index]);
      },
    );
  }

  Widget _buildRow(WordPair pair) {
    final alreadySaved = _saved.contains(pair);
    return new ListTile(
      title: new Text(
        pair.asPascalCase,
        style: bigFont,
      ),
      trailing: new Icon(alreadySaved ? Icons.favorite : Icons.favorite_border,
          color: alreadySaved ? Colors.red : null),
      onTap: () {
        setState(() {
          if (alreadySaved) {
            _saved.remove(pair);
          } else {
            _saved.add(pair);
          }
        });
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text('Startup name Generator'),
          actions: <Widget>[
            new FlatButton.icon(
              onPressed: _pushSaved,
              icon: new Icon(Icons.menu),
              label: new Text('已关注'),
               textColor: Colors.white,
            )
          ],
        ),
        body: _buildSugestions());
  }
}


```