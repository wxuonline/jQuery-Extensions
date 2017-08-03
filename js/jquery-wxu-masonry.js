;(function() {
    var Containers = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            row: "auto",  // 瀑布流列数，"auot" || 正整数

        },
        this.options = $.extend({}, this.defaults, opt)
    };
    Containers.prototype = {
        masonry: function() {
            var $this = this;
            var $item = $this.$element.children('.masonry-item');
            //  默认列表项宽度相同

            var iniRow = 0;
            if ($this.options.row == "auto") {
                var rowAlter = true;
                var sumWidth = 0;
                $item.each(function(index, el) {
                    sumWidth += $(this).outerWidth(true);
                    iniRow ++;
                    if (sumWidth >= $this.$element.width()) {
                        sumWidth -= $(this).outerWidth(true);
                        iniRow --;
                        return false;
                    }
                });
            } else {
                var rowAlter = false;
                iniRow = $this.options.row;
                if (!/^[0-9]*[1-9][0-9]*$/.test(iniRow)) alert("请输入正整数列！");
            };
            var rowHeight = new Array();
            var poiX = poiY = 0;  //新建项目坐标
            $item.each(function(index, el) {
                if (index < iniRow) {
                    $(this).css({position: "absolute",left: poiX,top: 0});
                    poiX += $(this).outerWidth(true);
                    // poiY = $(this).outerHeight(true);
                    // rowHeight[index] = poiY;
                    rowHeight[index] = index;
                } else {
                    var minTop = Math.min.apply(this,rowHeight); //获取高度数组中最小值
                    var minIndex = $.inArray(minTop, rowHeight); //获取最小值在数组中索引值
                    var proLeft = minIndex*productListWidth;
                    $(this).css({left:proLeft,top:minTop});
                    rowHeight[minIndex] = minTop + $(this).outerHeight(true); //为数组最小值添加高度
                    // console.log(minTop,minIndex);
                }
            });


        }
    }
    $.fn.masonry = function(options) {
        //创建Containers类的实例
        var containers = new Containers(this, options);
        return containers.masonry();  //调用其方法
    }
})();
