// Google AdSense 广告位配置
// 你需要在Google AdSense后台创建这些广告位，然后获取对应的ID

export const adSenseConfig = {
  // 你的AdSense发布商ID
  publisherId: "ca-pub-3689377116010221",

  // 广告位配置
  adSlots: {
    // 首页顶部横幅广告位
    homepageTop: "xxxxxxxxxx", // 替换为你的实际广告位ID

    // 首页底部横幅广告位
    homepageBottom: "xxxxxxxxxx", // 替换为你的实际广告位ID

    // 工具页面顶部广告位
    toolPageTop: "xxxxxxxxxx", // 替换为你的实际广告位ID

    // 工具页面底部广告位
    toolPageBottom: "xxxxxxxxxx", // 替换为你的实际广告位ID

    // 工具页面内联广告位
    toolPageInline: "xxxxxxxxxx", // 替换为你的实际广告位ID
  },

  // 广告尺寸配置
  adSizes: {
    homepageTop: {
      width: 728,
      height: 90,
      format: "auto" as const,
    },
    homepageBottom: {
      width: 728,
      height: 90,
      format: "auto" as const,
    },
    toolPageTop: {
      width: 728,
      height: 90,
      format: "auto" as const,
    },
    toolPageBottom: {
      width: 728,
      height: 250,
      format: "auto" as const,
    },
    toolPageInline: {
      width: 336,
      height: 280,
      format: "rectangle" as const,
    },
  },
};

// 使用示例：
// 在Google AdSense后台创建广告位后，将上面的 "xxxxxxxxxx" 替换为实际的广告位ID
// 例如：homepageTop: "1234567890"
