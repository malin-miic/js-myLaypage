layui.define('jquery',function (exports) {
    var $ = layui.jquery;
    var MOD_NAME = 'myLaypage',
        LAY_PANEL = 'lay-panel',
        LAY_PREV = 'lay-item-prev',
        LAY_NUM = 'lay-item-num',
        LAY_NMAC = 'lay-item-active',
        LAY_HIDE = 'lay-item-hide',
        LAY_NXT = 'lay-item-next';
    var laypage = {
        render:function (options) {
            var page = new Paging(options);
            return page;
        }
    }
    function  Paging(options) {
            this.options = {};
            this.options = $.extend({},this.options,options);
            this.options.btnNum < 5 && (this.options.btnNum = 5);
            this.render().onClick().disable();
    }
    Paging.prototype = {
        constructor:Paging,
        vendor:function(arr,start,end){
            for(var i = start;i<=end;i++){
                if(i === this.options.cuPage){
                    arr.push(['<li class="',LAY_NUM,' ',LAY_NMAC,'">',i,'</li>'].join(''));
                }else{
                    arr.push(['<li class="',LAY_NUM,'">',i,'</li>'].join(''));
                }
            }
        },
        render:function () {
            var options = this.options;
            var elem = this.elem = $(options.ele);
            if(!elem || options.pageNum < 1)return;
            var arr = [];var that = this;
            arr.push('<ul class="' + LAY_PANEL +'"><li class="' + LAY_PREV + '">上一页</li>');
            if(options.pageNum <= options.btnNum){
                this.vendor(arr,1,options.pageNum);
            }else if(options.cuPage <= Math.floor(options.btnNum / 2)){
                this.vendor(arr,1,options.btnNum - 2);
                arr.push(['<li class="',LAY_HIDE,'">...</li><li class="',LAY_NUM,'">',options.pageNum,'</li>'].join(''));
            }else if(options.pageNum - options.cuPage <= Math.floor(options.btnNum / 2)){
                arr.push(['<li class="',LAY_NUM,'">',1,'</li><li class="',LAY_HIDE,'">...</li>'].join(''));
                this.vendor(arr,options.pageNum -  options.btnNum + 3,options.pageNum)
            }else{
                var left =  options.btnNum -4;
                var leftNum =  options.cuPage - Math.floor(left /2) + (left % 2 ===0?1:0);
                var rightNum = options.cuPage + Math.floor(left /2);
                arr.push(['<li class="',LAY_NUM,'">',1,'</li><li class="',LAY_HIDE,'">...</LI>'].join(''));
                this.vendor(arr,leftNum,rightNum);
                arr.push(['<li class="',LAY_HIDE,'">...</li><li class="',LAY_NUM,'">',options.pageNum,'</li>'].join(''));
            }
            // 加入下一页
            arr.push(['<li class="',LAY_NXT,'">下一页</li></ul>'].join(''));
            if(options.showGo){
                //需要在这里显示跳转界面
                arr.push(['<ul class="',LAY_PANEL,'" go><li>跳转到</li><li><input type="text" placeholder="',options.cuPage,'" />&nbsp页</li>'].join(''))
                arr.push('<li><a id="jumpBtn">确定</a></li>')
            }
            elem.html(arr.join(''));

            $('#jumpBtn').click(function () {
                var page=  elem.find('input').val();
                that.jump(page);
            });
            return this;
        },
        onClick:function () {
             var options = this.options;
             var that  =this;
            this.elem.find('ul:first-child').find('li').off('click').on('click',function (e) {
                if(options.changing){
                    return;
                }
                var t = $(e.target);
                if(t.hasClass(LAY_NUM)){
                    options.cuPage =  t.text()|0;
                }else if(t.hasClass(LAY_PREV)){
                    //点击了上页
                    --options.cuPage;
                }else if(t.hasClass(LAY_NXT)){
                    ++options.cuPage;
                }else if(t.hasClass(LAY_HIDE)) {
                    return;
                }
              // that.render().onClick().hook().disable();
                that.jump(options.cuPage);
            }

            )
            return this;
        },
        hook:function () {
             var options = this.options;
            if(options.clickIndex){
                options.changing = true;
                setTimeout(function () {
                    options.clickIndex(options.cuPage)
                    options.changing=false;
                },30)

            }
            return this;
        },
        disable:function () {
            var options = this.options;
            if(options.cuPage===1){
                $('.' + LAY_PREV).addClass(LAY_HIDE).siblings().removeClass(LAY_HIDE);
               // $('.'+LAY_NXT).removeClass(LAY_DIS);
            }else if(options.cuPage === options.pageNum){
                $('.' + LAY_NXT).addClass(LAY_HIDE).siblings().removeClass(LAY_HIDE);
            }
            return this;
        },
        jump:function (index) {
            index = index | 0;
            var options = this.options;
            if((index <1 || index > options.pageNum)&& options.jumpError){
                options.jumpError(index);
            }else{
                options.cuPage = index;
                this.render().onClick().hook().disable();
            }
        }
    }
    exports(MOD_NAME,laypage);
})
