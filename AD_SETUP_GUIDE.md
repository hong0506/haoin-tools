# 广告系统设置指南

## 📋 概述

本网站已集成完整的广告系统，支持自定义广告和 Google AdSense。广告设计遵循用户体验最佳实践，不会干扰网站内容。

## 🎯 广告位置

### 首页 (Homepage)

- **顶部横幅广告**: 位于工具网格之前，中等尺寸
- **底部横幅广告**: 位于工具网格之后，大尺寸

### 工具页面 (Tool Pages)

- **顶部广告**: 位于工具内容之前，中等尺寸
- **内联广告**: 智能插入在工具内容中间，不干扰用户体验
- **底部广告**: 大尺寸横幅广告，位于工具内容之后

## 🔧 配置选项

### 启用/禁用广告

在 `src/config/ads.ts` 中修改配置：

```typescript
export const defaultAdConfig: AdConfig = {
  enabled: true, // 设置为false禁用所有广告
  positions: {
    homepage: {
      top: true, // 首页顶部广告
      bottom: false,
      sidebar: true, // 首页侧边栏广告
    },
    toolPages: {
      top: false,
      bottom: true, // 工具页面底部广告
      sidebar: true, // 工具页面侧边栏广告
    },
  },
  providers: {
    googleAdsense: false, // 启用Google AdSense
    custom: true, // 启用自定义广告
  },
};
```

## 📱 Google AdSense 集成

### 1. 获取 AdSense 账号

1. 访问 [Google AdSense](https://www.google.com/adsense/)
2. 申请并等待审核通过
3. 获取你的发布商 ID (`ca-pub-xxxxxxxxxx`)

### 2. 配置 AdSense

在 `src/components/ads/GoogleAdSense.tsx` 中：

```typescript
// 替换为你的AdSense ID
data-ad-client="ca-pub-xxxxxxxxxx"

// 替换为你的广告位ID
adSlot="xxxxxxxxxx"
```

### 3. 启用 AdSense

在 `src/config/ads.ts` 中：

```typescript
providers: {
  googleAdsense: true,  // 启用Google AdSense
  custom: false        // 禁用自定义广告
}
```

## 🎨 自定义广告

### 修改广告内容

在以下文件中自定义广告内容：

1. **横幅广告**: `src/components/ads/AdBanner.tsx`
2. **侧边栏广告**: `src/components/ads/SidebarAd.tsx`

### 广告样式

在 `src/config/ads.ts` 中自定义样式：

```typescript
export const adStyles = {
  borderRadius: "rounded-xl",
  shadow: "hover:shadow-lg",
  transition: "transition-all duration-300",
  hover: "hover:scale-[1.02]",
  colors: {
    primary: "from-blue-50/80 to-purple-50/80",
    secondary: "dark:from-blue-950/20 dark:to-purple-950/20",
    border: "border-border/50",
  },
};
```

## 📊 提高点击率的建议

### 1. 广告设计

- ✅ 使用吸引人的图标和颜色
- ✅ 清晰的行动号召按钮
- ✅ 相关的广告内容
- ✅ 适当的动画效果

### 2. 位置优化

- ✅ 顶部广告：用户进入页面时首先看到
- ✅ 侧边栏广告：不干扰主要内容，固定位置
- ✅ 底部广告：用户完成工具使用后看到

### 3. 用户体验

- ✅ 明确标注"广告"或"Sponsored"
- ✅ 不影响页面加载速度
- ✅ 响应式设计，适配所有设备
- ✅ 提供"为什么显示此广告"选项

## 🚀 部署注意事项

### 1. 测试环境

- 在测试环境中验证广告显示
- 确保广告不会影响网站功能
- 测试不同屏幕尺寸的显示效果

### 2. 生产环境

- 确保 AdSense 代码正确配置
- 监控广告性能和点击率
- 定期更新广告内容

### 3. 合规性

- 遵守 AdSense 政策
- 确保广告内容符合网站主题
- 添加必要的隐私政策说明

## 📈 监控和分析

### Google AdSense

- 使用 AdSense 仪表板监控收入
- 分析点击率(CTR)和每千次展示费用(CPM)
- 优化广告位置和内容

### 自定义广告

- 可以集成 Google Analytics 跟踪点击
- 监控广告展示和用户交互
- A/B 测试不同的广告设计

## 🔄 更新和维护

### 定期更新

- 更新广告内容保持新鲜感
- 根据季节和趋势调整广告主题
- 优化广告加载性能

### 故障排除

- 检查 AdSense 代码配置
- 验证广告位 ID 正确性
- 确保网站符合 AdSense 政策

## 📞 支持

如有问题，请检查：

1. 配置文件是否正确
2. AdSense 代码是否有效
3. 网络连接是否正常
4. 浏览器控制台是否有错误

---

**注意**: 广告收入取决于多种因素，包括网站流量、用户地理位置、广告相关性等。建议持续优化网站内容和用户体验以提高广告效果。
