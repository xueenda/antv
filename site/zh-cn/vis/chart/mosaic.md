<!--
title: 马赛克图
tags:
  - compare
  - proportion
-->

# 马赛克图

<img src="https://os.alipayobjects.com/rmsportal/eXoQbOxSvByiNWd.jpg">

## 马赛克图简介

马赛克图(Mosaic Plot 又名 Marimekko Chart)。标准的、非均匀的马赛克图在现实生活中使用较少，多用于统计学领域，常用于SAS的某些模块。均匀的马赛克图在生活中常有应用，比较经典的例子是地铁站与站之间的票价图。

注意：标准的马赛克图关注的数据维度非常多，一般的用户很难直观的理解。一般情况下，我们推荐您只使用均匀的马赛克图。对于非均匀的马赛克图，多数情况下可以拆解成多个不同的图表。

## 马赛克图的构成

### 非均匀坐标轴马赛克图

<img class="article-img-3" style="float:right;" src="https://os.alipayobjects.com/rmsportal/RKlgDYrPsNzxKHt.png" />

坐标轴非均匀的马赛克图也是统计学领域标准的马赛克图，一个非均匀的马赛克图包含以下构成元素：

* 非均匀的分类坐标轴。
* 面积、颜色均有含义的矩形块。
* 图例。

<div style="clear:both;"></div>

### 均匀坐标轴马赛克图

<img class="article-img-3" style="float:right;" src="https://os.alipayobjects.com/rmsportal/VwBbTVppnBdxlhk.png" />

坐标轴均匀的马赛克图也是统计学领域标准的马赛克图，一个均匀的马赛克图包含以下构成元素：

* 均匀的分类坐标轴。
* 颜色均有含义的矩形块。
* 图例。

<div style="clear:both;"></div>

## 马赛克图的应用场景

### 适合的场景

#### 统计分析，非均匀马赛克图

下图是泰坦尼克号死者关于性别和舱位等级的分布情况。

Class（仓位等级）|Sex（性别）|Die（死亡人数）|Survived（存活人数）
---|---|---|---
1st|Female|4|140
1st|Male|118|57
2nd|Female|13|80
2nd|Male|154|14
3rd|Female|89|76
3rd|Male|387|75

<img class="article-img-3" src="https://t.alipayobjects.com/images/rmsweb/T1B.0iXcxfXXXXXXXX.png" />

#### 统计分析，均匀马赛克图

下图是一组人群的BMI数据，关于身高和体重的分布。

Height(身高 cm)|Weight(体重 kg)|BodyFatSiriBEqu(BMI 指数)
---|---|---
172.085|69.96662|12.3
183.515|78.58488|6.1
168.275|69.85322|25.3
...|...|...

<div id="c1"></div>
<div class="code hide">

$.getJSON('./data/BMI.json',function (data) {
    var Stat = G2.Stat;
    var Frame = G2.Frame; 

    var frame = new Frame(data);
    frame = Frame.filter(frame,function (obj) {
      if (obj.Height < 160) {
        return false;
      }
      if (obj['Weight(kg)'] > 140) {
        return false;
      }
      return true;
    });
    var chart = new G2.Chart({
      id: 'c1',
      forceFit: true,
      height: 400
    });
    frame.addCol('肥胖指数', function(obj){
      var BodyFatSiriBEqu = obj.BodyFatSiriBEqu;
      if ( BodyFatSiriBEqu >= 40 ) {
        return "严重肥胖";
      }else if ( BodyFatSiriBEqu >= 30 ) {
        return "轻度肥胖";
      }else if ( BodyFatSiriBEqu >= 25 ) {
        return "肥胖";
      }else if ( BodyFatSiriBEqu >= 19 ) {
        return "健康";
      }else if ( BodyFatSiriBEqu >= 0 ) {
        return "偏瘦";
      };
    });
    chart.col('BodyFatSiriBEqu',{alias: "肥胖指数"});
    chart.source(frame);
    chart.polygon().position(Stat.bin.rect('Weight(kg)*Height',0.05)).color('肥胖指数',['#61A5E8','#EECB5F','#7ECF51','#E4925D','#E16757']);
    chart.render();
}); 

</div>

## 马赛克图与其他图表的对比

### 马赛克图和[热力图](heatmap.html)

* 从图形属性上：
  * 热力图表示第三维度的颜色是**线性**变化的。
  * 马赛克图表示第三维度的颜色是**分类**的。
  * 标准热力图要经过平滑算法，没有明显的边界。
  * 马赛克图拥有清晰的边界。


* 从数据上看：
  * 均匀的马赛克图和热力图在连续数据上的含义非常相似。


* 从分析需求上看：
  * 热力图侧重于分布，可预测未知区域数据。
  * 马赛克图拥有更清晰的边界，更侧重于对比。

## 马赛克图的扩展阅读
* [A Brief History of
the Mosaic Display](http://www.datavis.ca/papers/moshist.pdf)
* [Are Mosaic Plots Worthwhile](https://www.perceptualedge.com/articles/visual_business_intelligence/are_mosaic_plots_worthwhile.pdf)
* [Marimekko Charts](http://peltiertech.com/marimekko-charts/)
* [Marimekko Charts FusionChart](http://www.fusioncharts.com/charts/marimekko-charts/)
* [Marimekko Charts The Data Visualisation Catalogue](http://www.datavizcatalogue.com/methods/marimekko_chart.html#.VlJ9E98rJTY)
* [Marimekko Charts in Microsoft Excel](http://www.clearlyandsimply.com/clearly_and_simply/2014/05/marimekko-charts-in-microsoft-excel.html)
                                                                                                
