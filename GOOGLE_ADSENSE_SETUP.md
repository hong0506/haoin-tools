# Google AdSense 设置指南

## 📋 概述

本指南将帮助你在网站上正确集成 Google AdSense，实现广告收入。

## ✅ 已完成的步骤

### 1. AdSense 脚本集成

- ✅ 已将 AdSense 脚本添加到 `index.html` 的 `<head>` 标签中
- ✅ 使用你的发布商 ID: `ca-pub-3689377116010221`
- ✅ 配置了广告管理系统

### 2. 代码配置

- ✅ 更新了 `GoogleAdSense.tsx` 组件使用你的发布商 ID
- ✅ 创建了 `adsense-config.ts` 配置文件
- ✅ 启用了 Google AdSense 提供商

## 🔧 需要完成的步骤

### 步骤 1: 创建广告位

1. **登录 Google AdSense 后台**

   - 访问 [AdSense 控制台](https://www.google.com/adsense/)
   - 选择你的网站

2. **创建广告位**
   需要创建以下 5 个广告位：

   #### 首页广告位

   - **广告位名称**: `首页顶部横幅`
   - **广告类型**: `展示广告`
   - **广告尺寸**: `728x90 (Leaderboard)`
   - **广告位 ID**: 复制并替换 `src/config/adsense-config.ts` 中的 `homepageTop`

   - **广告位名称**: `首页底部横幅`
   - **广告类型**: `展示广告`
   - **广告尺寸**: `728x90 (Leaderboard)`
   - **广告位 ID**: 复制并替换 `homepageBottom`

   #### 工具页面广告位

   - **广告位名称**: `工具页面顶部`
   - **广告类型**: `展示广告`
   - **广告尺寸**: `728x90 (Leaderboard)`
   - **广告位 ID**: 复制并替换 `toolPageTop`

   - **广告位名称**: `工具页面底部`
   - **广告类型**: `展示广告`
   - **广告尺寸**: `728x250 (Medium Rectangle)`
   - **广告位 ID**: 复制并替换 `toolPageBottom`

   - **广告位名称**: `工具页面内联`
   - **广告类型**: `展示广告`
   - **广告尺寸**: `336x280 (Large Rectangle)`
   - **广告位 ID**: 复制并替换 `toolPageInline`

### 步骤 2: 更新配置文件

创建广告位后，编辑 `src/config/adsense-config.ts` 文件：

```typescript
export const adSenseConfig = {
  publisherId: "ca-pub-3689377116010221",

  adSlots: {
    homepageTop: "1234567890", // 替换为实际ID
    homepageBottom: "1234567891", // 替换为实际ID
    toolPageTop: "1234567892", // 替换为实际ID
    toolPageBottom: "1234567893", // 替换为实际ID
    toolPageInline: "1234567894", // 替换为实际ID
  },
  // ... 其他配置
};
```

### 步骤 3: 部署和测试

1. **部署网站**

   ```bash
   npm run build
   # 部署到你的服务器
   ```

2. **测试广告显示**
   - 访问你的网站
   - 检查各个页面的广告位置
   - 等待最多 1 小时让广告开始显示

## 📊 广告位置说明

### 首页

- **顶部广告**: 位于工具网格之前
- **底部广告**: 位于工具网格之后，Footer 之前

### 工具页面

- **顶部广告**: 位于工具内容之前
- **内联广告**: 智能插入在工具内容中间
- **底部广告**: 位于工具内容之后

## 🔍 故障排除

### 广告不显示

1. **检查 AdSense 状态**: 确保账户已激活
2. **等待时间**: 新广告位可能需要 1 小时才开始显示
3. **检查控制台**: 查看是否有 JavaScript 错误
4. **验证代码**: 确保广告位 ID 正确

### 常见错误

- **"AdSense code not found"**: 检查 HTML head 中的脚本
- **"Invalid ad unit"**: 检查广告位 ID 是否正确
- **"Ad serving disabled"**: 检查 AdSense 账户状态

## 📈 优化建议

### 提高点击率

1. **广告位置**: 当前布局已经优化，不会干扰用户体验
2. **广告尺寸**: 使用推荐的尺寸以获得更好的匹配
3. **内容相关性**: 确保网站内容与广告主题相关

### 监控和优化

1. **AdSense 报告**: 定期查看点击率和收入报告
2. **A/B 测试**: 尝试不同的广告位置和尺寸
3. **内容优化**: 持续改进网站内容以提高广告相关性

## 📞 支持

如果遇到问题：

1. 检查 [AdSense 帮助中心](https://support.google.com/adsense/)
2. 查看浏览器控制台的错误信息
3. 确认所有配置步骤都已完成

---

**注意**: 广告收入取决于多种因素，包括网站流量、用户地理位置、广告相关性等。建议持续优化网站内容和用户体验。
