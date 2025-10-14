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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Timer,
  Info,
  Zap,
  Calendar,
  Dumbbell,
  Coffee,
  BookOpen,

} from "lucide-react";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";

const StopwatchTimer = () => {
  const { t } = useTranslation();
  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const stopwatchInterval = useRef<NodeJS.Timeout | null>(null);

  // Timer state
  const [timerMinutes, setTimerMinutes] = useState("5");
  const [timerSeconds, setTimerSeconds] = useState("0");
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

  // Stopwatch functions
  const startStopwatch = () => {
    setStopwatchRunning(true);
    stopwatchInterval.current = setInterval(() => {
      setStopwatchTime((prev) => prev + 10);
    }, 10);
  };

  const pauseStopwatch = () => {
    setStopwatchRunning(false);
    if (stopwatchInterval.current) {
      clearInterval(stopwatchInterval.current);
    }
  };

  const resetStopwatch = () => {
    setStopwatchRunning(false);
    setStopwatchTime(0);
    if (stopwatchInterval.current) {
      clearInterval(stopwatchInterval.current);
    }
  };

  // Timer functions
  const startTimer = () => {
    const totalSeconds =
      parseInt(timerMinutes || "0") * 60 + parseInt(timerSeconds || "0");
    if (totalSeconds <= 0) {
      toast.error(t("tools.stopwatch-timer.pleaseSetValidTime"));
      return;
    }
    setTimerRemaining(totalSeconds);
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerRemaining(0);
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
  };

  // Stopwatch effect
  useEffect(() => {
    return () => {
      if (stopwatchInterval.current) {
        clearInterval(stopwatchInterval.current);
      }
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (timerRunning && timerRemaining > 0) {
      timerInterval.current = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            if (timerInterval.current) {
              clearInterval(timerInterval.current);
            }
            // Play sound or show notification
            toast.success(t("tools.stopwatch-timer.timerComplete"));
            // Try to play a beep sound
            const audio = new Audio(
              "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUQ0PVqzn77BYGAdCmNz1xnMlBSuAzvLZiTUIGGa37e2gVhMJT6bg87pqIQQ0hNDy0oI0Bh5uwO/jmVEND1ar5++wWBgHQpjc9cdyJQUrgc7y2Yk1CBhmt+3toFYTCU+m4PO6aiEENITQ8tKCNAYebs"
            );
            audio.play().catch(() => {});
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [timerRunning, timerRemaining]);

  // Format time helpers
  const formatStopwatch = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: milliseconds.toString().padStart(2, "0"),
    };
  };

  const formatTimer = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: mins.toString().padStart(2, "0"),
      seconds: secs.toString().padStart(2, "0"),
    };
  };

  const stopwatchDisplay = formatStopwatch(stopwatchTime);
  const timerDisplay = formatTimer(timerRemaining);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          <h1 className="text-xl font-semibold flex-1">
            {t("tools.stopwatch-timer.title")}
          </h1>
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
                <CardTitle>
                  {t("tools.stopwatch-timer.stopwatchAndCountdownTimer")}
                </CardTitle>
                <CardDescription>
                  {t("tools.stopwatch-timer.description")}
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="stopwatch-timer"
                toolName={t("tools.stopwatch-timer.title")}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="stopwatch" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stopwatch">
                  <Clock className="h-4 w-4 mr-2" />
                  {t("tools.stopwatch-timer.stopwatch")}
                </TabsTrigger>
                <TabsTrigger value="timer">
                  <Timer className="h-4 w-4 mr-2" />
                  {t("tools.stopwatch-timer.timer")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stopwatch" className="space-y-6 mt-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-8 rounded-xl text-center">
                  <div className="font-mono text-6xl font-bold mb-2">
                    {stopwatchDisplay.hours}:{stopwatchDisplay.minutes}:
                    {stopwatchDisplay.seconds}
                    <span className="text-4xl text-muted-foreground">
                      .{stopwatchDisplay.milliseconds}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("tools.stopwatch-timer.hoursMinutesSecondsMilliseconds")}
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  {!stopwatchRunning ? (
                    <Button onClick={startStopwatch} size="lg" className="w-32">
                      <Play className="h-4 w-4 mr-2" />
                      {t("tools.stopwatch-timer.start")}
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseStopwatch}
                      size="lg"
                      variant="secondary"
                      className="w-32"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      {t("tools.stopwatch-timer.pause")}
                    </Button>
                  )}
                  <Button
                    onClick={resetStopwatch}
                    size="lg"
                    variant="outline"
                    className="w-32"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t("tools.stopwatch-timer.reset")}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="timer" className="space-y-6 mt-6">
                {timerRemaining === 0 ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>{t("tools.stopwatch-timer.minutes")}</Label>
                        <Input
                          type="number"
                          min="0"
                          max="99"
                          value={timerMinutes}
                          onChange={(e) => setTimerMinutes(e.target.value)}
                          className="mt-2 text-lg text-center"
                        />
                      </div>
                      <div>
                        <Label>{t("tools.stopwatch-timer.seconds")}</Label>
                        <Input
                          type="number"
                          min="0"
                          max="59"
                          value={timerSeconds}
                          onChange={(e) => setTimerSeconds(e.target.value)}
                          className="mt-2 text-lg text-center"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setTimerMinutes("5");
                          setTimerSeconds("0");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        5 {t("tools.stopwatch-timer.min")}
                      </Button>
                      <Button
                        onClick={() => {
                          setTimerMinutes("10");
                          setTimerSeconds("0");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        10 {t("tools.stopwatch-timer.min")}
                      </Button>
                      <Button
                        onClick={() => {
                          setTimerMinutes("25");
                          setTimerSeconds("0");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        25 {t("tools.stopwatch-timer.min")}
                      </Button>
                      <Button
                        onClick={() => {
                          setTimerMinutes("30");
                          setTimerSeconds("0");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        30 {t("tools.stopwatch-timer.min")}
                      </Button>
                    </div>

                    <Button onClick={startTimer} size="lg" className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      {t("tools.stopwatch-timer.startTimer")}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-8 rounded-xl text-center">
                      <div className="font-mono text-6xl font-bold mb-2">
                        {timerDisplay.hours}:{timerDisplay.minutes}:
                        {timerDisplay.seconds}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("tools.stopwatch-timer.hoursMinutesSeconds")}
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                      {!timerRunning ? (
                        <Button
                          onClick={() => setTimerRunning(true)}
                          size="lg"
                          className="w-32"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {t("tools.stopwatch-timer.resume")}
                        </Button>
                      ) : (
                        <Button
                          onClick={pauseTimer}
                          size="lg"
                          variant="secondary"
                          className="w-32"
                        >
                          <Pause className="h-4 w-4 mr-2" />
                          {t("tools.stopwatch-timer.pause")}
                        </Button>
                      )}
                      <Button
                        onClick={resetTimer}
                        size="lg"
                        variant="outline"
                        className="w-32"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        {t("tools.stopwatch-timer.reset")}
                      </Button>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                {t("tools.stopwatch-timer.whatIs")}
              </strong>{" "}
              {t("tools.stopwatch-timer.whatIsContent")}
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
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Dumbbell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">
                    {t("tools.stopwatch-timer.useCases.fitness.title")}
                  </div>
                  <p className="text-sm text-blue-700">
                    {t("tools.stopwatch-timer.useCases.fitness.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Coffee className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">
                    {t("tools.stopwatch-timer.useCases.cooking.title")}
                  </div>
                  <p className="text-sm text-purple-700">
                    {t("tools.stopwatch-timer.useCases.cooking.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {t("tools.stopwatch-timer.useCases.studying.title")}
                  </div>
                  <p className="text-sm text-green-700">
                    {t("tools.stopwatch-timer.useCases.studying.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Calendar className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">
                    {t("tools.stopwatch-timer.useCases.productivity.title")}
                  </div>
                  <p className="text-sm text-pink-700">
                    {t(
                      "tools.stopwatch-timer.useCases.productivity.description"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Info className="h-5 w-5 text-amber-600" />
              💡 {t("toolPage.sections.proTips")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.stopwatch-timer.proTips.stopwatch"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.stopwatch-timer.proTips.timer"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.stopwatch-timer.proTips.quickPresets"),
                  }}
                />
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p
                  className="text-sm text-amber-900"
                  dangerouslySetInnerHTML={{
                    __html: t("tools.stopwatch-timer.proTips.precision"),
                  }}
                />
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
                onClick={() => navigate("/tools/pomodoro-timer")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.pomodoro-timer.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.pomodoro-timer.description")}
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
                onClick={() => navigate("/tools/timestamp-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  {t("tools.timestamp-converter.title")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("tools.timestamp-converter.description")}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StopwatchTimer;
