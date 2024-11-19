/**
 * createFromIconfont 会传入 scriptUrl ，我们在 document.body 上添加 <script> 标签引入它。
 * 类比：antd 的 createFromIconfontCN
 *
 * 如果加载过的就不用再次加载了，所以用 Set 来记录下。
   然后用的时候使用 <use xlinkHref="#type" > 引用。
 */

import React from "react";
import { Icon, IconProps } from "./";

const loadedSet = new Set<string>(); // 避免重复加载

/**
 *
 * @param scriptUrl 在线图标字体的 URL
 * @returns
 */
export function createFromIconfont(scriptUrl: string) {
  // 将在线图标链接引入
  // 动态加载脚本
  if (
    typeof scriptUrl === "string" &&
    scriptUrl.length &&
    !loadedSet.has(scriptUrl)
  ) {
    const script = document.createElement("script");
    script.setAttribute("src", scriptUrl);
    script.setAttribute("data-namespace", scriptUrl);
    document.body.appendChild(script); // 将脚本追加到 document.body，触发加载

    loadedSet.add(scriptUrl);
  }

  const Iconfont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { type, ...rest } = props;

    return (
      <Icon {...rest} ref={ref}>
        {/* 引用 SVG 符号（symbol），在页面中渲染出对应的图标或形状。这种方式利用了 SVG 的 <symbol> 元素定义的图形复用机制。 */}
        {/* 在 SVG 文件或图标字体库中，图标通常是通过 <symbol> 元素定义的。每个 <symbol> 元素有一个唯一的 id，用来标识图标。 */}
        {/* <use> 元素：用于在页面中复用 <symbol> 定义的图标。xlink:href 属性指定要引用的图标，格式为 #id，其中 id 是目标 <symbol> 的标识符。 */}
        {type ? <use xlinkHref={`#${type}`} /> : null}
      </Icon>
    );
  });

  return Iconfont;
}

/**
 * 使用示例
 *
 * const Iconfont = createFromIconfont("https://at.alicdn.com/t/font_1234567_abcd123.js");

  // 在组件中使用
  <Iconfont type="icon-home" style={{ fontSize: 24, color: 'red' }} />

  // icon-home 就是 svg 定义中的 ID

 */
