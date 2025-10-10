import React from "react";
import { InlineAd } from "./InlineAd";

interface AdInserterProps {
  children: React.ReactNode;
  className?: string;
}

export const AdInserter: React.FC<AdInserterProps> = ({ 
  children, 
  className = "" 
}) => {
  // 将children转换为数组以便插入广告
  const childrenArray = React.Children.toArray(children);
  
  // 找到合适的位置插入广告（在第一个Card之后）
  const insertIndex = childrenArray.findIndex((child: any) => 
    child?.props?.className?.includes('Card') || 
    child?.type?.displayName === 'Card' ||
    (child?.type?.toString && child.type.toString().includes('Card'))
  );
  
  if (insertIndex === -1) {
    // 如果没找到Card，在中间位置插入
    const middleIndex = Math.floor(childrenArray.length / 2);
    const result = [...childrenArray];
    result.splice(middleIndex, 0, <InlineAd key="inline-ad" />);
    return <div className={className}>{result}</div>;
  }
  
  // 在第一个Card之后插入广告
  const result = [...childrenArray];
  result.splice(insertIndex + 1, 0, <InlineAd key="inline-ad" />);
  
  return <div className={className}>{result}</div>;
};
