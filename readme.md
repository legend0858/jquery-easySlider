jQuery.easySlider-ly
------------------------

一个比较简单的Slider组件，本人自用

原版：http://cssglobe.com/easy-slider-17-numeric-navigation-jquery-slider/

原版的错误很多，比如<a href="http://hi.baidu.com/qiuweihui/item/de71e30aad8adc90a2df4352">这个</a>，基本上来说为2点：

- vertical带来的一些很低级的bug
- 不支持序号与方向按钮同时显示（弱爆了）

网络上有一些修改过的项目，参考项目：

#####Kf修改版：https://github.com/kflorence/jquery-easySlider

> 1. 作者很用心的写了注释，不同逻辑之间加了空行，很贴心。
2. 对于问题2，作者的解决方案是将序号和按钮的逻辑分离，序号由num控制，增加prevnext控制按钮的显示
3. 添加insertAfter参数，可以控制方向按钮的html插入位置
4. 只有">ul>li"可以作为item，排除其它li引起的bug
5. 不再支持容器宽高自适应，且li的宽高追随容器宽高
6. 允许在方向按钮前后添加代码（controlsBefore，controlsAfter）
7. 修复了vertical的弱智bug

#####SN修改版：https://github.com/Solutions-Nitriques/jQuery-easySlider

> 程序改动很大，代码量扩充了一倍，修复了height的问题，但是margin-left的两处问题依然没有修复

#####http://allur.co/freebies/jquery-plugins/easyslider-1-7-6-a-small-update/

> 通过添加allControls参数，实现了序号与方向按钮共存，但很显然是没怎么用心改，实现是通过添加一个elseif分支，代码太过于冗余，未修复问题1

本项目fork自kflorence的版本，加入了Solutions-Nitriques的一些功能，API随后更新

PS1:百度空间那篇文章debug，在第75行处只修复了margin-left的问题，并没有把width改为height，修复不彻底<br />
PS2:关于slider无缝链接的问题，如果不考虑序号，实现比较简单，前后各补一个，考虑序号则比较复杂，如果简单处理，可以将运动的时间写成一个固定的值，这样就不会出现第一个切换第五个的时候，慢慢悠悠转过去的情况了，体验还是可以的
