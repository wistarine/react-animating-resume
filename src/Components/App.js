import React, { Component } from 'react'
import styled from 'styled-components'
import StyleEditor from './StyleEditor.js'
import ResumeEditor from './ResumeEditor.js'
import Control from './Control.js'
import '../static/css/iconfont.css'
/*import '../static/js/iconfont.js'*/
import webpack from '../static/img/webpack.png'
import weChat from '../static/img/weChat.png'
import QQ from '../static/img/qq.jpg'


const AppDiv = styled.div`
    overflow: auto;
`


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        currentStyle: '',
        currentMarkdown: '', 
        enableHtml: false,
        showControl: true,
    };
    this.timer = '';
   /* this.showControl = true;*/
    this.interval = 0;
    this.condition = 'keepOn';
    this.controlCode = false;
    this.controlCodeText = '显示代码';
    this.optimizeResume = false;
    
    /*this.asideArr = [
        { tag: 'PDF下载', link: './static/刘德铨-应聘前端开发-2017.pdf'},
        { tag: '源码', link: 'https://github.com/LDQ-first/vue-animating-resume-1'},
        { tag: 'GitHub', link: 'https://github.com/LDQ-first'},
    ];*/
      this.fullStyle = [ `/*
* Inspired by http://strml.net/
* 大家好，我是刘德铨 
* 这是我的一份动态简历！
*/

/* 首先给所有元素加上过渡效果 */
* {
  transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
  background:  rgba(31,110,212, 1); 
  color: rgb(222,222,222);
  font-size: 16px;
}
/* 文字离边框太近了,我们来挪一下它 */
.styleEditor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw;  height: 90vh;
  background: #303030;
}

/* 代码高亮
  作为程序员，怎么能忍受代码都是一种颜色呢
*/
.token.comment { color: rgb(222,222,222); }
.token.selector { color: #a6e22e; }
.token.punctuation { color: yellow; }
.token.property { color: #66d9ef; }
.styleEditor pre { color: #999cfe};
.token.function { color: #2f9c0a; }



/* 接下来我给自己准备一个编辑器 */
.resumeEditor {
  position: fixed;
  right: 0; top: 0;
  padding: 1em;  margin: .5em;
  width: 48vw;  height: 90vh; 
  border: 1px solid;
  background: white;  color: #222;
  overflow: auto;
}
#icon { font-size: 20px; }

/* 好了，我开始写简历了 */
        `,
        `
/* 这个简历好像差点什么
 * 对了，这是 Markdown + Html 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */
        `,
        `
/* 再对 HTML 加点样式 */
.resumeEditor h2{
  padding: 0.1em 0.5em;
  border-left: 4px solid #FF7203;
  background: #B79DFE;
  color: #222;
  font-size: 20px;
}
.resumeEditor pre {
  color: #222;
  line-height: 1.4em;
  padding: 0.2em 1em;
}
.resumeEditor  p {
  font-size: 18px;
  line-height: 1.7em;
  padding: 0.2em 1em;
}
.resumeEditor img { width: 170px; }
.resumeEditor .icon {
   width: 1em; height: 1em;
   margin-right: 0.4em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
.resumeEditor a {
  margin: 0 5px;
  color: #108ee9; background: transparent;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  transition: color .3s ease;
}
.resumeEditor ul,.resumeEditor ol{
  list-style: none;
  padding: 0.2em 1em;
}
.resumeEditor ul li,.resumeEditor ol li{
  padding: 0.2em 1em;
}
.resumeEditor ol {
  counter-reset: section;
}
.resumeEditor ol li::before{
  counter-increment: section;            
  content: counters(section, ".") " ";  
  margin-right: .5em;
}
.resumeEditor blockquote {
  margin: 1em; padding: .5em;
  background: #FFBD8D;
}

/*
好了，代码就展示到这里，接下来重点是优化简历了
*/
/* 
  动画速度太慢了， 来个加速按钮吧
*/
#speedUp { display: inline-block; }

/* 
  想停止动画， 来个停止按钮吧
*/
#stop { display: inline-block; }

/* 
  想继续动画， 来个继续按钮吧
*/
#keepOn { display: inline-block; }

/* 
  按钮样式太单调了，我们来装饰一下
*/
.btns {
  background: #03A9F4;
  color: #FFF;
  border: none;  outline: none;
  margin-right: 0.5em;
  float: left;
  font-size: .25rem;  color: #EEE;
  width: 5em;  height: 3em;
  text-align: center;
  cursor: pointer;
  border-radius: .3rem;
  transition: all .3s ease-in-out;
  box-shadow: 0 2px 10px rgba(0,0,0,.5);
  position: relative;
}
.btns::before, .btns::after  {
    content: "";
    position: absolute;
    top: 4px;  bottom: 4px;  left: 4px;  right: 4px;
    border: 2px solid #eee; border-top: 0;  border-bottom: 0;
    transition: all .4s ease-in-out
} 

.btns::before {
   transform: scale(0, 1);
   border: 2px solid #EEE;
   border-left: 0;  border-right: 0;
}

.btns::after { transform: scale(1, 0); }
.btns:hover::before  { transform: scale(1); }
.btns:hover::after  { transform: scale(1); }


/*隐藏代码*/
.styleEditor { transform: translate(-50%, -200%); }
.resumeEditor { position: absolute; left: 50%; top: 3.5em; transform: translateX(-50%); }
.styleEditor { 
   position: fixed; z-index: 100;
   top: 4em; left: 50%;
   width: 90vw; height: 80vh; margin: 0;
   opacity: 0;
}
        `,
        `
/*优化简历*/
.resumeEditor {
  width: 90vw;  min-width: 320px; height: 82vh;
  margin: 0;
}
progress {
    width: 160px; height: 20px;
    border: 1px solid #0064B4;  
    background: #e6e6e6;
    color: #0064B4; 
}
progress::-moz-progress-bar { background: #0064B4; }
progress::-webkit-progress-bar { background: #e6e6e6; }
progress::-webkit-progress-value  { background: #0064B4; }

@media screen and (max-width: 450px) {
  progress { display: block; }
}
.resumeEditor img.webpack { 
  width: 20px; height: 20px;
  margin-right:0.4em;
  display: inline-block;vertical-align: middle
}
.resumeEditor .github { color: #000 }
.resumeEditor .icon { box-sizing: content-box; }
.resumeEditor .icon-border {
   display: block; height: calc(1.5em + 7px); border-bottom: 2px solid #CCC;
}
.resumeEditor .icon-border .icon {
   width: 5em; height: 1.5em; color: #2AA8E9;
   border-bottom: 4px solid #2AA8E9;
}
.resumeEditor p{ padding: 0.2em 0; }
.resumeEditor p:not(:nth-of-type(1)) { margin-top: 0.5em; }
        `
];
      this.fullMarkdown =`
<span class="icon-border">
  <i class="icon iconfont icon-geren"></i>
</span>
刘德铨
---
在校大三学生，正在学习前端, 对前端有强烈的兴趣

<span class="icon-border">
  <i class="iconfont icon-diannao"></i>
</span>
技能
---
<pre><i class="icon iconfont icon-html"></i>HTML5       熟悉  <progress value="60" max="100"></progress>
<i class="icon iconfont icon-socialcss3"></i>CSS3       熟悉  <progress value="60" max="100"></progress>
<i class="icon iconfont icon-sass"></i>SCSS        熟悉  <progress value="60" max="100"></progress>
<i class="icon iconfont icon-js-copy"></i>JavaScript  熟悉  <progress value="50" max="100"></progress>
<i class="icon iconfont icon-jquery"></i>jQuery      熟悉  <progress value="70" max="100"></progress>
<i class="icon iconfont icon-vuejs"></i>Vue         熟悉  <progress value="40" max="100"></progress>
<img src="./static/media/webpack.dcba9539.png" class="icon webpack">Webpack     了解  <progress value="35" max="100"></progress>  
</pre>

<span class="icon-border">
  <i class="icon iconfont icon-mubiao"></i>
</span>
求职意向
---
前端工程师

<span class="icon-border">
  <i class="icon iconfont icon-xiangmu"></i>
</span>
项目
---
1. [Vue版CNode](https://ldq-first.github.io/vue-CNode-1/dist/#/)<a href="https://github.com/LDQ-first/vue-CNode-1" >
  <i class="icon iconfont icon-github"></i>
</a>
2. [Vue版在线简历编辑器](https://ldq-first.github.io/vue-cv-1/dist/#/)<a href="https://github.com/LDQ-first/vue-cv-1" >
  <i class="icon iconfont icon-github"></i>
</a>
3. [Vue版动态简历](https://ldq-first.github.io/vue-animating-resume-1/dist/)<a href="https://github.com/LDQ-first/vue-animating-resume-1" >
  <i class="icon iconfont icon-github"></i>
</a>

<span class="icon-border">
  <i class="icon iconfont icon-lianxi"></i>
</span>
联系方式
---
* <i class="icon iconfont icon-shouji"></i>手机：18826136763
* <i class="icon iconfont icon-youxiang"></i>邮箱：2320975287@qq.com
* <i class="icon iconfont icon-weixin-copy-copy"></i>微信：18826136763

<span class="contact">![weChat](./static/media/weChat.2c1ab8cf.png)</span>
*  <i class="icon iconfont icon-QQ1"></i>qq: 2320975287

<span class="contact">![QQ](./static/media/qq.370b3bc6.jpg)</span>


<span class="icon-border">
  <i class="icon iconfont icon-jiaoyu"></i>
</span>
教育背景
---
- 就读于广东工业大学 计算机科学与技术 本科 
- 英语四级

<span class="icon-border">
  <i class="icon iconfont icon-ziwomiaoshu"></i>
</span>
自我评价和期望
---
> 热衷于学习新技术，做事认真，对前端有浓厚的兴趣。   
> 我希望能够加入一个以技术驱动为导向，技术氛围浓厚，有发展空间的互联网公司 :)  
> 希望借此机会为贵司贡献自身所长

`
  }
  stop() {
    this.state = 'stop';
    clearTimeout(this.timer);
  }
  skip() {

  }
  immediatelyFillCode() {

  }
  immediatelyFillMarkdown() {
    
  }
  componentDidMount() {
    this.makeResume();
  }
  async makeResume() {
      await this.graduallyShowStyle(0)
      await this.showControlCode()
      await this.graduallyShowResume()
      await this.graduallyShowStyle(1)
      await this.showHtml()
      await this.graduallyShowStyle(2)
      await this.immediatelyCode()
      await this.graduallyShowStyle(3)
      /*this.optimizeResume = false;
      this.state.condition = 'over';*/
  }
  graduallyShowStyle(n) {
      return new Promise((resolve, reject) => {
          const showStyle = ()=> {
          const style = this.fullStyle[n];
          if(!style) {
            return;
          }
          const length = this.fullStyle.filter((ele, index) => index <= n).map( item => item.length ).reduce((acc, cur) => acc + cur, 0);
          const prefixLength = length - style.length;
          let currentStyle = this.state.currentStyle;
          if(currentStyle.length < length) {
            let len = currentStyle.length - prefixLength;
            currentStyle += style.substring(len, len + 1) || ' ';
            this.setState({currentStyle: currentStyle});
            this.timer = setTimeout(showStyle, this.interval);
          } else {
            resolve();
          }
        };
         showStyle();
      })
  }
  graduallyShowResume() {
    return Promise.resolve({
        then: (resolve, reject) => {
          const length = this.fullMarkdown.length;
          const showResume = () => {
            let currentMarkdown = this.state.currentMarkdown;
            if(currentMarkdown.length < length) {
              currentMarkdown = this.fullMarkdown.substring(0, currentMarkdown.length + 1);
              this.setState({currentMarkdown: currentMarkdown});
             /* const lastLetter = currentMarkdown[currentMarkdown.length - 1];
              const prevLetter = currentMarkdown[currentMarkdown.length - 2];*/
              this.timer = setTimeout(showResume, this.interval)
            } else {
              resolve();
            }
          }
          showResume()
        }
      })
  }
  showControlCode() {
    return Promise.resolve({
      then: ( resolve, reject ) => {
        this.setState({showControl: true});
        resolve()
      }
    })
  }
  showHtml() {
    return Promise.resolve({
      then: ( resolve, reject ) => {
        this.setState({enableHtml: true});
        resolve()
      }
    })
  }
  immediatelyCode() {

  }
  render() {
    return (
      <AppDiv>
        <StyleEditor ref="StyleEditor" code={this.state.currentStyle} />
        <ResumeEditor ref="ResumeEditor" content={this.state.currentMarkdown} enableHtml={this.state.enableHtml}/>
        {this.state.showControl ? (
          <Control onSkip={this.skip.bind(this)} onStop={this.stop.bind(this)}></Control>
        ) : (null) }
      </AppDiv>
    );
  }
}

export default App;
