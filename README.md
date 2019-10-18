# js-myLaypage
## Customize Laypage modules which could be used in your project depending on Layui.
### Usage
  1. import the 'layui.js'
  2. import 'myLaypage.css' to you project which is placed in 'css/myLaypage.css'
  3. import the 'myLaypage.js' to your own js directory
  4. use 
  ```
        layui.config({
             base: 'your js directory path/'
        }).use('myLaypage',function(){
             // here comes you config
             layui.myLaypage.render({
                ele:'#id', //The  element's id( or class '.class')  which will display the page view;
                pageNum:20,// The total count of page 
                btnNum:7,// the count of index buttons. if you got 100 data items and btnNum is 6 then pageNum will be 17
                cuPage:1,// the original index  when the page view first appear.In most case,it equals 1
                showGo:true, // whether or not display the jump views.default is false
                clickIndex:function(index){},// the callback which is triggerd when you click the index
                jumpError:function(index){} // the callback which is triggerd when illegal index is set
             );
        })
```
