import React, { PropsWithChildren, forwardRef } from "react";
import { default as cs } from "classnames";

import "./index.scss";

type BaseIconProps = {
  className?: string;
  style?: React.CSSProperties;
  size?: string | string[];
  spin?: boolean;
};

// 因为 icon 就是对 svg 的封装
// 所以 接受 svg 的属性 透传给内部的svg
export type IconProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>;

/**
 * size 可以传 [10px, 10px] 分别指定宽高，也可以传 10px 来同时指定宽高
 * @param size
 * @returns
 */
export const getSize = (size: IconProps["size"]) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[];
  }

  const width = (size as string) || "1em";
  const height = (size as string) || "1em";

  return [width, height];
};

export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>(
  (props, ref) => {
    // rest 用来接受 svg的原生属性
    /**
     * spin 是否有旋转动画
     *
     * size 默认1em，em这个单位的size 要在 fontsize 中使用，相对于 父元素 字体的大小。所以，能通过 font-size 和 color 来修改 Icon 组件的大小和颜色。
     */
    const { style, className, spin, size = "1em", children, ...rest } = props;

    const [width, height] = getSize(size);

    const cn = cs(
      "icon",
      {
        "icon-spin": spin,
      },
      className
    );

    return (
      // 填充属性 currentColor：继承 color的颜色
      <svg
        ref={ref}
        style={style}
        className={cn}
        width={width}
        height={height}
        fill="currentColor"
        {...rest}
      >
        {children}
      </svg>
    );
  }
);

/**
 * 这里对 参数属性进行封装
 *
 * 具体的 svg 内容 通过 children 传递进来。
 */
