import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Wand2,
  Copy,
  RotateCcw,
  Lightbulb,
  ArrowLeft,
  Sparkles,
  Zap,
  Info,
  Link,
  Bot,
  Target,
  Users,
  Settings,
  ChevronDown,
  ChevronUp,
  Key,
} from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Label } from "@/components/ui/label";

const PromptGenerator = () => {
  const { t, i18n } = useTranslation();
  const [topic, setTopic] = useState("");
  const [role, setRole] = useState("expert");
  const [tone, setTone] = useState("professional");
  const [output, setOutput] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const navigate = useNavigate();

  // 高级本地模板生成
  const generateAdvancedPrompt = () => {
    if (!topic.trim()) {
      toast.error(t("tools.prompt-generator.topicRequired"));
      return;
    }

    let prompt = "";
    
    // 根据语言生成详细的提示词模板
    if (i18n.language === "zh") {
      const roleDescriptions: Record<string, string> = {
        expert: "在该领域拥有深厚的专业知识和丰富的实践经验",
        teacher: "擅长将复杂概念简化，用通俗易懂的方式讲解",
        consultant: "提供专业建议和解决方案，帮助客户做出明智决策",
        analyst: "善于数据分析和深入研究，提供基于证据的见解",
        developer: "具备技术专长，能够提供实用的技术解决方案",
      };
      
      const toneInstructions: Record<string, string> = {
        professional: "保持专业、客观，使用行业术语，注重准确性和可靠性",
        friendly: "使用亲切、温暖的语言，像朋友一样交流，让对方感到舒适",
        creative: "发挥想象力，提供创新的视角和独特的见解",
        detailed: "提供全面、深入的分析，包含丰富的细节和例子",
        concise: "简明扼要，直击要点，避免冗余信息",
      };

      prompt = `# 角色设定
你是一位${role === "expert" ? "专家" : role === "teacher" ? "老师" : role === "consultant" ? "顾问" : role === "analyst" ? "分析师" : "开发者"}，${roleDescriptions[role]}。

# 任务目标
请针对以下主题提供深入的分析和见解：
**${topic}**

# 回答要求
1. **语气风格**：${toneInstructions[tone]}
2. **内容深度**：提供既有理论支持又有实践价值的内容
3. **结构清晰**：使用标题、列表等方式组织内容，便于阅读理解
4. **实用性**：包含具体的例子、建议或行动步骤`;

      if (additionalContext.trim()) {
        prompt += `\n\n# 背景信息与特殊要求\n${additionalContext}`;
      }
      
      prompt += `\n\n# 期望输出
请按照以上要求，提供全面、专业且实用的回答。如果适用，可以包含：
- 关键概念解释
- 具体案例分析
- 最佳实践建议
- 常见误区提醒
- 进一步学习资源`;

    } else if (i18n.language === "es") {
      const roleDescriptions: Record<string, string> = {
        expert: "con profundo conocimiento profesional y amplia experiencia práctica en el campo",
        teacher: "experto en simplificar conceptos complejos y explicar de manera comprensible",
        consultant: "que proporciona asesoramiento profesional y soluciones para ayudar a tomar decisiones informadas",
        analyst: "hábil en análisis de datos e investigación profunda, proporcionando conocimientos basados en evidencia",
        developer: "con experiencia técnica, capaz de proporcionar soluciones técnicas prácticas",
      };
      
      const toneInstructions: Record<string, string> = {
        professional: "mantener profesionalismo y objetividad, usar terminología de la industria, enfocarse en precisión y confiabilidad",
        friendly: "usar lenguaje cálido y amigable, comunicar como un amigo, hacer sentir cómodo al destinatario",
        creative: "ejercitar la imaginación, proporcionar perspectivas innovadoras e ideas únicas",
        detailed: "proporcionar análisis integral y profundo, incluir detalles ricos y ejemplos",
        concise: "ser breve y directo, ir al grano, evitar información redundante",
      };

      prompt = `# Configuración de Rol
Eres un ${role === "expert" ? "experto" : role === "teacher" ? "profesor" : role === "consultant" ? "consultor" : role === "analyst" ? "analista" : "desarrollador"}, ${roleDescriptions[role]}.

# Objetivo de la Tarea
Por favor proporciona un análisis profundo e ideas sobre el siguiente tema:
**${topic}**

# Requisitos de Respuesta
1. **Estilo de Tono**: ${toneInstructions[tone]}
2. **Profundidad del Contenido**: Proporcionar contenido con soporte teórico y valor práctico
3. **Estructura Clara**: Usar títulos, listas, etc. para organizar el contenido y facilitar la lectura
4. **Practicidad**: Incluir ejemplos específicos, recomendaciones o pasos de acción`;

      if (additionalContext.trim()) {
        prompt += `\n\n# Información de Contexto y Requisitos Especiales\n${additionalContext}`;
      }
      
      prompt += `\n\n# Salida Esperada
Según los requisitos anteriores, proporciona una respuesta completa, profesional y práctica. Si es aplicable, puede incluir:
- Explicación de conceptos clave
- Análisis de casos específicos
- Recomendaciones de mejores prácticas
- Advertencias sobre errores comunes
- Recursos de aprendizaje adicionales`;

    } else {
      const roleDescriptions: Record<string, string> = {
        expert: "with deep professional knowledge and extensive practical experience in the field",
        teacher: "skilled at simplifying complex concepts and explaining in an accessible way",
        consultant: "providing professional advice and solutions to help make informed decisions",
        analyst: "adept at data analysis and in-depth research, providing evidence-based insights",
        developer: "with technical expertise, capable of providing practical technical solutions",
      };
      
      const toneInstructions: Record<string, string> = {
        professional: "maintain professionalism and objectivity, use industry terminology, focus on accuracy and reliability",
        friendly: "use warm, approachable language, communicate like a friend, make the recipient feel comfortable",
        creative: "exercise imagination, provide innovative perspectives and unique insights",
        detailed: "provide comprehensive, in-depth analysis, include rich details and examples",
        concise: "be brief and to the point, get straight to the core, avoid redundant information",
      };

      prompt = `# Role Assignment
You are a ${role === "expert" ? "subject matter expert" : role === "teacher" ? "teacher" : role === "consultant" ? "consultant" : role === "analyst" ? "analyst" : "developer"}, ${roleDescriptions[role]}.

# Task Objective
Please provide in-depth analysis and insights on the following topic:
**${topic}**

# Response Requirements
1. **Tone & Style**: ${toneInstructions[tone]}
2. **Content Depth**: Provide content with both theoretical support and practical value
3. **Clear Structure**: Use headings, lists, etc. to organize content for easy reading
4. **Practicality**: Include specific examples, recommendations, or action steps`;

      if (additionalContext.trim()) {
        prompt += `\n\n# Background Information & Special Requirements\n${additionalContext}`;
      }
      
      prompt += `\n\n# Expected Output
Following the above requirements, please provide a comprehensive, professional, and practical response. If applicable, you may include:
- Key concept explanations
- Specific case analysis
- Best practice recommendations
- Common pitfall warnings
- Further learning resources`;
    }

    return prompt;
  };

  // 使用 AI 生成真正定制化的提示词
  const generateWithAI = async () => {
    if (!apiKey.trim()) {
      toast.error(t("tools.prompt-generator.apiKeyRequired"));
      return;
    }

    if (!topic.trim()) {
      toast.error(t("tools.prompt-generator.topicRequired"));
      return;
    }

    setIsGenerating(true);
    
    try {
      // 构建更智能的系统提示词，让AI真正理解如何为不同任务生成提示词
      const systemPrompt = i18n.language === "zh" 
        ? `你是一个世界级的 AI 提示词工程师和 Prompt 专家。你的任务是为用户的具体需求创建高质量、结构化、可执行的 AI 提示词。

你需要：
1. 深入理解用户的任务主题和目标
2. 根据任务类型（写作、编程、分析、设计等）采用最适合的提示词结构
3. 融入角色设定、明确的目标、详细的要求和期望输出
4. 使用 Markdown 格式，包含清晰的章节划分
5. 确保提示词能引导 AI 生成高质量、实用的回答

生成的提示词应该：
- 结构化且易读（使用标题、列表、分点）
- 包含具体的、可操作的指导
- 针对该特定任务量身定制，而非通用模板
- 包含输出格式要求和质量标准
- 根据任务性质调整详细程度`
        : i18n.language === "es"
        ? `Eres un ingeniero de prompts de IA de clase mundial y experto en Prompt Engineering. Tu tarea es crear prompts de IA de alta calidad, estructurados y ejecutables para las necesidades específicas del usuario.

Necesitas:
1. Comprender profundamente el tema y objetivo de la tarea del usuario
2. Adoptar la estructura de prompt más adecuada según el tipo de tarea (escritura, programación, análisis, diseño, etc.)
3. Incorporar configuración de rol, objetivos claros, requisitos detallados y salida esperada
4. Usar formato Markdown con secciones claramente divididas
5. Asegurar que el prompt pueda guiar a la IA para generar respuestas de alta calidad y prácticas

El prompt generado debe:
- Estar estructurado y ser fácil de leer (usar títulos, listas, puntos)
- Contener orientación específica y accionable
- Estar personalizado para esa tarea específica, no ser una plantilla genérica
- Incluir requisitos de formato de salida y estándares de calidad
- Ajustar el nivel de detalle según la naturaleza de la tarea`
        : `You are a world-class AI prompt engineer and Prompt expert. Your task is to create high-quality, structured, and actionable AI prompts for the user's specific needs.

You need to:
1. Deeply understand the user's task topic and goals
2. Adopt the most suitable prompt structure based on task type (writing, coding, analysis, design, etc.)
3. Incorporate role assignment, clear objectives, detailed requirements, and expected output
4. Use Markdown format with clearly divided sections
5. Ensure the prompt can guide AI to generate high-quality, practical responses

The generated prompt should:
- Be structured and easy to read (use headings, lists, bullet points)
- Contain specific, actionable guidance
- Be tailored for that specific task, not a generic template
- Include output format requirements and quality standards
- Adjust the level of detail based on the task nature`;

      // 构建用户请求，提供所有上下文信息
      const roleTranslations: Record<string, Record<string, string>> = {
        zh: { expert: "专家", teacher: "教师", consultant: "咨询顾问", analyst: "分析师", developer: "开发者" },
        es: { expert: "experto", teacher: "profesor", consultant: "consultor", analyst: "analista", developer: "desarrollador" },
        en: { expert: "expert", teacher: "teacher", consultant: "consultant", analyst: "analyst", developer: "developer" }
      };

      const toneTranslations: Record<string, Record<string, string>> = {
        zh: { professional: "专业", friendly: "友好", creative: "创意", detailed: "详细", concise: "简洁" },
        es: { professional: "profesional", friendly: "amigable", creative: "creativo", detailed: "detallado", concise: "conciso" },
        en: { professional: "professional", friendly: "friendly", creative: "creative", detailed: "detailed", concise: "concise" }
      };

      const lang = i18n.language === "zh" ? "zh" : i18n.language === "es" ? "es" : "en";
      const roleText = roleTranslations[lang][role];
      const toneText = toneTranslations[lang][tone];

      const userMessage = i18n.language === "zh"
        ? `请为以下任务创建一个专业的、定制化的 AI 提示词：

**任务主题：** ${topic}

**角色要求：** ${roleText}
**语气风格：** ${toneText}
${additionalContext ? `**额外要求：** ${additionalContext}` : ''}

请根据这个具体任务的性质和要求，创建一个结构清晰、针对性强的提示词。不要使用通用模板，而是要真正理解这个任务的特点，生成最适合的提示词结构和内容。

提示词应该直接可用，让 AI 能够准确理解任务要求并生成高质量的回答。`
        : i18n.language === "es"
        ? `Por favor crea un prompt de IA profesional y personalizado para la siguiente tarea:

**Tema de la tarea:** ${topic}

**Requisito de rol:** ${roleText}
**Estilo de tono:** ${toneText}
${additionalContext ? `**Requisitos adicionales:** ${additionalContext}` : ''}

Según la naturaleza y requisitos de esta tarea específica, crea un prompt con estructura clara y altamente dirigido. No uses una plantilla genérica, sino comprende realmente las características de esta tarea y genera la estructura y contenido de prompt más adecuados.

El prompt debe ser directamente utilizable, permitiendo que la IA comprenda con precisión los requisitos de la tarea y genere respuestas de alta calidad.`
        : `Please create a professional, customized AI prompt for the following task:

**Task Topic:** ${topic}

**Role Requirement:** ${roleText}
**Tone Style:** ${toneText}
${additionalContext ? `**Additional Requirements:** ${additionalContext}` : ''}

Based on the nature and requirements of this specific task, create a prompt with clear structure and strong targeting. Don't use a generic template, but truly understand the characteristics of this task and generate the most suitable prompt structure and content.

The prompt should be directly usable, allowing AI to accurately understand the task requirements and generate high-quality responses.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // 使用更便宜但质量好的模型
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
          ],
          temperature: 0.8, // 提高创造性
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "API request failed");
      }

      const data = await response.json();
      const generatedPrompt = data.choices[0].message.content;
      
      setOutput(generatedPrompt);
      toast.success(t("tools.prompt-generator.generateSuccess"));
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(errorMessage || t("tools.prompt-generator.apiError"));
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePrompt = () => {
    if (apiKey.trim()) {
      // 如果有API key，使用AI生成
      generateWithAI();
    } else {
      // 否则使用本地模板
      const prompt = generateAdvancedPrompt();
      if (prompt) {
        setOutput(prompt);
        toast.success(t("tools.prompt-generator.generateSuccess"));
      }
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success(t("common.copied"));
  };

  const clearAll = () => {
    setTopic("");
    setRole("expert");
    setTone("professional");
    setAdditionalContext("");
    setOutput("");
    toast.success(t("toolPage.messages.cleared"));
  };

  const loadExample = () => {
    if (i18n.language === "zh") {
      setTopic("人工智能在医疗领域的应用");
      setAdditionalContext("重点关注诊断辅助和个性化治疗");
    } else if (i18n.language === "es") {
      setTopic("Aplicaciones de IA en medicina");
      setAdditionalContext("Enfocarse en diagnóstico asistido y tratamiento personalizado");
    } else {
      setTopic("AI Applications in Healthcare");
      setAdditionalContext("Focus on diagnostic assistance and personalized treatment");
    }
    setRole("expert");
    setTone("professional");
    setOutput("");
    toast.success(t("toolPage.messages.exampleLoaded"));
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <div className="flex items-center gap-2 flex-1">
            <Wand2 className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">
              {t("tools.prompt-generator.title")}
            </h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.prompt-generator.title")}</CardTitle>
                <CardDescription>
                  {t("tools.prompt-generator.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="prompt-generator"
                toolName={t("tools.prompt-generator.title")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolPage.buttons.clear")}
              </Button>
              <Button onClick={loadExample} variant="ghost" size="sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("toolPage.buttons.loadExample")}
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="topic" className="text-sm font-medium mb-2 block">
                  {t("tools.prompt-generator.topicLabel")}
                </Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t("tools.prompt-generator.topicPlaceholder")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role" className="text-sm font-medium mb-2 block">
                    {t("tools.prompt-generator.roleLabel")}
                  </Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expert">{t("tools.prompt-generator.roles.expert")}</SelectItem>
                      <SelectItem value="teacher">{t("tools.prompt-generator.roles.teacher")}</SelectItem>
                      <SelectItem value="consultant">{t("tools.prompt-generator.roles.consultant")}</SelectItem>
                      <SelectItem value="analyst">{t("tools.prompt-generator.roles.analyst")}</SelectItem>
                      <SelectItem value="developer">{t("tools.prompt-generator.roles.developer")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tone" className="text-sm font-medium mb-2 block">
                    {t("tools.prompt-generator.toneLabel")}
                  </Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger id="tone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">{t("tools.prompt-generator.tones.professional")}</SelectItem>
                      <SelectItem value="friendly">{t("tools.prompt-generator.tones.friendly")}</SelectItem>
                      <SelectItem value="creative">{t("tools.prompt-generator.tones.creative")}</SelectItem>
                      <SelectItem value="detailed">{t("tools.prompt-generator.tones.detailed")}</SelectItem>
                      <SelectItem value="concise">{t("tools.prompt-generator.tones.concise")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="context" className="text-sm font-medium mb-2 block">
                  {t("tools.prompt-generator.contextLabel")}
                </Label>
                <Textarea
                  id="context"
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder={t("tools.prompt-generator.contextPlaceholder")}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            {/* API设置折叠区域 */}
            <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50">
              <button
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-gray-900">
                    {t("tools.prompt-generator.aiEnhancement")}
                  </span>
                  {apiKey && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {t("tools.prompt-generator.enabled")}
                    </span>
                  )}
                </div>
                {showApiKeyInput ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {showApiKeyInput && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-gray-600">
                    {t("tools.prompt-generator.aiEnhancementDesc")}
                  </p>
                  <div>
                    <Label htmlFor="apiKey" className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      {t("tools.prompt-generator.apiKeyLabel")}
                    </Label>
                    <Input
                      id="apiKey"
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="font-mono"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      🔒 {t("tools.prompt-generator.apiKeyNote")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Button 
              onClick={generatePrompt} 
              className="w-full" 
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  {t("tools.prompt-generator.generating")}
                </>
              ) : apiKey ? (
                <>
                  <Bot className="h-4 w-4 mr-2" />
                  {t("tools.prompt-generator.generateWithAI")}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t("tools.prompt-generator.generate")}
                </>
              )}
            </Button>

            {output && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">
                    {t("tools.prompt-generator.outputLabel")}
                  </label>
                  <Button onClick={copyOutput} size="sm" variant="ghost">
                    <Copy className="mr-2 h-4 w-4" />
                    {t("toolPage.buttons.copy")}
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[200px] font-mono"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Introduction */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.prompt-generator.whatIs")}
              </strong>{" "}
              {t("tools.prompt-generator.whatIsContent")}
            </p>
          </CardContent>
        </Card>

        {/* Quick Use Cases */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("tools.prompt-generator.useCases.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Bot className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.prompt-generator.useCases.chatbot.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t("tools.prompt-generator.useCases.chatbot.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.prompt-generator.useCases.content.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t("tools.prompt-generator.useCases.content.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Sparkles className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.prompt-generator.useCases.research.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t("tools.prompt-generator.useCases.research.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Users className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.prompt-generator.useCases.training.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t("tools.prompt-generator.useCases.training.description")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Info className="h-5 w-5 text-amber-600" />
              {t("tools.prompt-generator.proTips.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.prompt-generator.proTips.specific"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.prompt-generator.proTips.role"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.prompt-generator.proTips.context"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.prompt-generator.proTips.iterate"),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-muted-foreground" />
              {t('toolPage.sections.relatedTools')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/tools/api-tester")}
                className="p-4 text-left rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all bg-white"
              >
                <div className="font-semibold text-gray-900 mb-2">
                  {t("tools.api-tester.title")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("tools.api-tester.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/json-formatter")}
                className="p-4 text-left rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all bg-white"
              >
                <div className="font-semibold text-gray-900 mb-2">
                  {t("tools.json-formatter.title")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("tools.json-formatter.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/regex-tester")}
                className="p-4 text-left rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all bg-white"
              >
                <div className="font-semibold text-gray-900 mb-2">
                  {t("tools.regex-tester.title")}
                </div>
                <div className="text-sm text-gray-600">
                  {t("tools.regex-tester.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PromptGenerator;
