import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
      toast.error("Please set a valid time");
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
            toast.success("⏰ Timer Complete!");
            // Try to play a beep sound
            const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUQ0PVqzn77BYGAdCmNz1xnMlBSuAzvLZiTUIGGa37e2gVhMJT6bg87pqIQQ0hNDy0oI0Bh5uwO/jmVEND1ar5++wWBgHQpjc9cdyJQUrgc7y2Yk1CBhmt+3toFYTCU+m4PO6aiEENITQ8tKCNAYebs");
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
        <div className="flex h-16 items-center gap-4 px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Stopwatch & Timer</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Stopwatch & Countdown Timer</CardTitle>
                <CardDescription>
                  Track time or set countdown timers
                </CardDescription>
              </div>
              <FavoriteButton
                toolId="stopwatch-timer"
                toolName="Stopwatch & Timer"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="stopwatch" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stopwatch">
                  <Clock className="h-4 w-4 mr-2" />
                  Stopwatch
                </TabsTrigger>
                <TabsTrigger value="timer">
                  <Timer className="h-4 w-4 mr-2" />
                  Timer
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
                    Hours : Minutes : Seconds . Milliseconds
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  {!stopwatchRunning ? (
                    <Button onClick={startStopwatch} size="lg" className="w-32">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseStopwatch}
                      size="lg"
                      variant="secondary"
                      className="w-32"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button
                    onClick={resetStopwatch}
                    size="lg"
                    variant="outline"
                    className="w-32"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="timer" className="space-y-6 mt-6">
                {timerRemaining === 0 ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Minutes</Label>
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
                        <Label>Seconds</Label>
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
                        5 min
                      </Button>
                      <Button
                        onClick={() => {
                          setTimerMinutes("10");
                          setTimerSeconds("0");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        10 min
                      </Button>
                      <Button
                        onClick={() => {
                          setTimerMinutes("25");
                          setTimerSeconds("0");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        25 min
                      </Button>
                      <Button
                        onClick={() => {
                          setTimerMinutes("30");
                          setTimerSeconds("0");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        30 min
                      </Button>
                    </div>

                    <Button onClick={startTimer} size="lg" className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Start Timer
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
                        Hours : Minutes : Seconds
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
                          Resume
                        </Button>
                      ) : (
                        <Button
                          onClick={pauseTimer}
                          size="lg"
                          variant="secondary"
                          className="w-32"
                        >
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                      )}
                      <Button
                        onClick={resetTimer}
                        size="lg"
                        variant="outline"
                        className="w-32"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
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
                What is Stopwatch & Timer?
              </strong>{" "}
              A versatile time tracking tool with stopwatch for measuring elapsed time and countdown timer for setting time limits. Perfect for workouts, cooking, studying, and productivity! ⏱️
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Common Use Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Dumbbell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">Fitness</div>
                  <p className="text-sm text-blue-700">
                    Track workout intervals and rest periods
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Coffee className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">Cooking</div>
                  <p className="text-sm text-purple-700">
                    Set timers for recipes and baking
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-green-900">Studying</div>
                  <p className="text-sm text-green-700">
                    Time study sessions and breaks
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200">
                <div className="p-2 bg-white rounded-lg h-fit">
                  <Calendar className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-pink-900">Productivity</div>
                  <p className="text-sm text-pink-700">
                    Track task duration and deadlines
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
              💡 Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Stopwatch:</strong> Perfect for tracking exercise reps
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Timer:</strong> Get notifications when time's up
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Quick Presets:</strong> Use 5, 10, 25, 30 min buttons
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="text-amber-600 font-bold">→</div>
                <p className="text-sm text-amber-900">
                  <strong>Precision:</strong> Stopwatch shows milliseconds
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🔗 Related Tools You Might Like</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => navigate("/tools/pomodoro-timer")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Pomodoro Timer
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Productivity timer
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/date-calculator")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Date Calculator
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Calculate date differences
                </div>
              </button>
              <button
                onClick={() => navigate("/tools/timestamp-converter")}
                className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary">
                  Timestamp Converter
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Convert timestamps
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
