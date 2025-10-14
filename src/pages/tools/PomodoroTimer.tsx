import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Zap,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

type PomodoroPhase = "work" | "break" | "longBreak";

const PomodoroTimer = () => {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<PomodoroPhase>("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const phaseDurations = { work: 25 * 60, break: 5 * 60, longBreak: 15 * 60 };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            handlePhaseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handlePhaseComplete = () => {
    if (phase === "work") {
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);
      if (newCount % 4 === 0) {
        setPhase("longBreak");
        setTimeLeft(phaseDurations.longBreak);
        toast.success(t("tools.pomodoro-timer.longBreakTime"));
      } else {
        setPhase("break");
        setTimeLeft(phaseDurations.break);
        toast.success(t("tools.pomodoro-timer.shortBreakTime"));
      }
    } else {
      setPhase("work");
      setTimeLeft(phaseDurations.work);
      toast.success(t("tools.pomodoro-timer.focusTimeNow"));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const reset = () => {
    setIsRunning(false);
    setPhase("work");
    setTimeLeft(phaseDurations.work);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-2 sm:gap-4 px-2 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold flex-1">{t("tools.pomodoro-timer.title")}</h1>
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("tools.pomodoro-timer.pomodoroTechnique")}</CardTitle>
                <CardDescription>
                  {t("tools.pomodoro-timer.descriptionFull")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="pomodoro-timer"
                toolName={t("tools.pomodoro-timer.title")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className={`p-8 rounded-xl text-center ${
                phase === "work"
                  ? "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20"
                  : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20"
              }`}
            >
              <div className="text-sm font-medium mb-2 uppercase tracking-wide">
                {phase === "work"
                  ? t("tools.pomodoro-timer.focusTime")
                  : phase === "break"
                  ? t("tools.pomodoro-timer.shortBreak")
                  : t("tools.pomodoro-timer.longBreak")}
              </div>
              <div className="text-7xl font-bold mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("tools.pomodoro-timer.pomodorosCompleted", { count: completedPomodoros })}
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              {!isRunning ? (
                <Button
                  onClick={() => setIsRunning(true)}
                  size="lg"
                  className="w-32"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {t("tools.pomodoro-timer.start")}
                </Button>
              ) : (
                <Button
                  onClick={() => setIsRunning(false)}
                  size="lg"
                  variant="secondary"
                  className="w-32"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  {t("tools.pomodoro-timer.pause")}
                </Button>
              )}
              <Button
                onClick={reset}
                size="lg"
                variant="outline"
                className="w-32"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("tools.pomodoro-timer.reset")}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-100">{t("tools.pomodoro-timer.whatIs")}</strong>{" "}
              {t("tools.pomodoro-timer.whatIsContent")}
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("toolPage.sections.commonUseCases")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Coffee className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-300">{t("tools.pomodoro-timer.useCases.deepWork.title")}</div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {t("tools.pomodoro-timer.useCases.deepWork.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-300">
                    {t("tools.pomodoro-timer.useCases.productivity.title")}
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t("tools.pomodoro-timer.useCases.productivity.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Info className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-300">
                    {t("tools.pomodoro-timer.useCases.timeManagement.title")}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    {t("tools.pomodoro-timer.useCases.timeManagement.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/30 border border-pink-200 dark:border-pink-800">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg h-fit">
                  <Coffee className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900 dark:text-pink-300">
                    {t("tools.pomodoro-timer.useCases.preventBurnout.title")}
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-400">
                    {t("tools.pomodoro-timer.useCases.preventBurnout.description")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-amber-950/30 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              💡 {t("toolPage.sections.proTips")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.pomodoro-timer.proTips.focusFully")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.pomodoro-timer.proTips.shortBreaks")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.pomodoro-timer.proTips.longBreaks")
                }} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 dark:text-amber-400 font-bold">→</div>
                <p className="text-sm text-amber-900 dark:text-amber-300" dangerouslySetInnerHTML={{
                  __html: t("tools.pomodoro-timer.proTips.trackProgress")
                }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-muted-foreground" />
              Related Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/stopwatch-timer")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.stopwatch-timer.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.stopwatch-timer.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/date-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.date-calculator.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.date-calculator.description")}
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/random-picker")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.random-picker.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.random-picker.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PomodoroTimer;
