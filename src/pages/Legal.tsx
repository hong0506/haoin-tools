import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Shield, Code, Scale } from "lucide-react";

const Legal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Legal & Copyright</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="space-y-6">
          {/* Copyright Notice */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>版权声明 Copyright Notice</CardTitle>
              </div>
              <CardDescription>
                关于本站内容的知识产权说明
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  本网站（HaoIn Tools）所提供的所有工具和服务均为独立开发，
                  我们尊重并保护知识产权，所有内容的使用均遵循相关法律法规。
                </p>
                
                <h3 className="font-semibold mt-4 mb-2">原创内容声明</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>本站所有页面设计、UI布局、交互逻辑均为原创</li>
                  <li>代码实现基于 React、TypeScript 等开源技术栈</li>
                  <li>使用 shadcn/ui 开源组件库构建用户界面</li>
                  <li>工具功能基于公开算法和技术标准实现</li>
                </ul>

                <h3 className="font-semibold mt-4 mb-2">技术实现</h3>
                <p>
                  本站工具的核心算法和功能实现均基于以下公开技术和标准：
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Base64 编码/解码：遵循 RFC 4648 标准</li>
                  <li>JSON 格式化：基于 JSON 规范实现</li>
                  <li>Hash 生成：使用 Web Crypto API</li>
                  <li>其他工具：均基于公开技术标准和算法</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>技术栈说明 Technology Stack</CardTitle>
              </div>
              <CardDescription>
                本站使用的开源技术和框架
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>本网站基于以下开源技术构建：</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>前端框架：</strong>React 18 + TypeScript</li>
                  <li><strong>路由管理：</strong>React Router v6</li>
                  <li><strong>UI 组件：</strong>shadcn/ui (Radix UI + Tailwind CSS)</li>
                  <li><strong>样式方案：</strong>Tailwind CSS</li>
                  <li><strong>构建工具：</strong>Vite</li>
                  <li><strong>状态管理：</strong>React Context API</li>
                </ul>

                <p className="mt-4">
                  所有使用的开源库均遵循其各自的开源协议（MIT、Apache 2.0等）。
                  我们对这些优秀的开源项目表示衷心感谢。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Fair Use & Disclaimer */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                <CardTitle>使用说明与免责声明</CardTitle>
              </div>
              <CardDescription>
                关于本站工具的使用条款
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h3 className="font-semibold mb-2">使用许可</h3>
                <p>
                  本站提供的所有工具均免费供个人和商业使用。我们不会收集、
                  存储或传输您在工具中输入的任何数据，所有处理均在您的浏览器本地完成。
                </p>

                <h3 className="font-semibold mt-4 mb-2">免责声明</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>本站工具按"现状"提供，不对结果的准确性做任何保证</li>
                  <li>用户应自行承担使用本站工具所产生的风险</li>
                  <li>涉及财务计算的工具仅供参考，不构成投资建议</li>
                  <li>本站不对因使用或无法使用工具而造成的任何损失负责</li>
                </ul>

                <h3 className="font-semibold mt-4 mb-2">隐私保护</h3>
                <p>
                  我们重视您的隐私。本站所有工具均在浏览器本地运行，
                  不会将您的数据发送到任何服务器（货币转换等需要实时数据的工具除外）。
                </p>

                <h3 className="font-semibold mt-4 mb-2">联系我们</h3>
                <p>
                  如果您对本站的版权、技术实现或其他方面有任何疑问，
                  欢迎通过"关于我们"页面联系我们。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third-party Content */}
          <Card>
            <CardHeader>
              <CardTitle>第三方内容声明</CardTitle>
              <CardDescription>
                关于使用的第三方资源
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  本站部分功能可能使用第三方API或数据：
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>货币汇率：</strong>使用第三方汇率API获取实时数据</li>
                  <li><strong>图标：</strong>使用 Lucide Icons 开源图标库</li>
                  <li><strong>字体：</strong>使用系统默认字体或 Google Fonts</li>
                </ul>

                <p className="mt-4">
                  我们致力于确保所有第三方内容的合法使用，如发现任何侵权内容，
                  请立即联系我们，我们将在24小时内处理。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>本页面最后更新：2025年10月</p>
            <p className="mt-2">
              HaoIn Tools © 2025 杭州皓萤科技有限公司 版权所有
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
