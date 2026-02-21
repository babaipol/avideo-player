"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useGamificationStore } from "@/stores/gamification-store";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "In which year was the Indian Political Action Committee (I-PAC) established?",
    options: ["2011", "2013", "2015", "2017"],
    correct: 1,
    explanation: "I-PAC was founded in 2013 and has since become India's premier political consulting firm.",
  },
  {
    id: 2,
    question: "What is the primary methodology I-PAC uses in its campaigns?",
    options: [
      "Traditional door-to-door canvassing only",
      "Data-driven analytics combined with grassroots intelligence",
      "Exclusively social media marketing",
      "Television advertising campaigns",
    ],
    correct: 1,
    explanation: "I-PAC combines cutting-edge data analytics with deep grassroots intelligence for winning campaigns.",
  },
  {
    id: 3,
    question: "Approximately how many states has I-PAC run campaigns in?",
    options: ["5+", "10+", "15+", "20+"],
    correct: 3,
    explanation: "I-PAC has delivered campaign strategies across 20+ states, from Himalayas to southern India.",
  },
  {
    id: 4,
    question: "What is the 'Didir Suraksha Kavach' initiative associated with?",
    options: [
      "Maharashtra welfare scheme",
      "West Bengal public protection program",
      "Tamil Nadu women's safety initiative",
      "Delhi housing project",
    ],
    correct: 1,
    explanation: "Didir Suraksha Kavach is a public protection initiative launched in West Bengal.",
  },
  {
    id: 5,
    question: "How many cohort members has I-PAC trained in political campaign skills?",
    options: ["500K+", "750K+", "1M+", "1.1M+"],
    correct: 3,
    explanation: "I-PAC has trained over 1.1 million cohort members in data-driven campaign skills.",
  },
];

export function PoliticalQuiz() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const { unlockAchievement, setQuizScore } = useGamificationStore();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const score = answers.filter(
    (a, i) => a === questions[i].correct
  ).length;

  useEffect(() => {
    if (!started || finished || selected !== null) return;
    if (timeLeft <= 0) {
      const newAnswers = [...answers, null];
      setAnswers(newAnswers);
      setSelected(-1);
      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setCurrentQ((q) => q + 1);
          setSelected(null);
          setTimeLeft(20);
        } else {
          const finalScore = newAnswers.filter((a, i) => a === questions[i].correct).length;
          setFinished(true);
          setQuizScore(finalScore);
        }
      }, 1000);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, finished, selected, timeLeft, currentQ, answers, setQuizScore]);

  const handleAnswer = (optionIndex: number | null) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setTimeLeft(20);
      } else {
        const finalScore = newAnswers.filter(
          (a, i) => a === questions[i].correct
        ).length;
        const pct = (finalScore / questions.length) * 100;
        setFinished(true);
        setQuizScore(finalScore);
        if (pct >= 80) unlockAchievement("quiz-master");
      }
    }, 1500);
  };

  const restart = () => {
    setStarted(false);
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    setTimeLeft(20);
  };

  const q = questions[currentQ];

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gray-950 overflow-hidden"
      id="quiz"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Political IQ"
            title="Test Your Knowledge"
            description="How well do you know India's political landscape? Take our quick quiz and earn achievements!"
            className="mb-12"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!started && !finished && (
              <motion.div
                key="start"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center"
              >
                <div className="text-6xl mb-6">🧠</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Political Awareness Quiz
                </h3>
                <p className="text-gray-400 mb-6">
                  {questions.length} questions · 20 seconds each · Score 80%+
                  to earn the Quiz Master badge
                </p>
                <div className="flex items-center justify-center gap-6 mb-8">
                  {[
                    { label: "Questions", value: questions.length },
                    { label: "Seconds/Q", value: 20 },
                    { label: "XP Reward", value: 200 },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        {s.value}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStarted(true)}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  Start Quiz 🚀
                </button>
              </motion.div>
            )}

            {started && !finished && (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i < currentQ
                            ? answers[i] === questions[i].correct
                              ? "bg-green-400"
                              : "bg-red-400"
                            : i === currentQ
                              ? "bg-cyan-400 scale-125"
                              : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`text-sm font-bold tabular-nums transition-colors ${
                        timeLeft <= 5 ? "text-red-400" : "text-cyan-400"
                      }`}
                    >
                      {timeLeft}s
                    </div>
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full transition-colors ${
                          timeLeft <= 5 ? "bg-red-400" : "bg-cyan-400"
                        }`}
                        style={{ width: `${(timeLeft / 20) * 100}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider mb-3">
                  Question {currentQ + 1} of {questions.length}
                </p>
                <h3 className="text-white text-xl font-bold mb-6 leading-relaxed">
                  {q.question}
                </h3>

                <div className="space-y-3">
                  {q.options.map((option, i) => {
                    let state: "default" | "correct" | "wrong" | "missed" =
                      "default";
                    if (selected !== null) {
                      if (i === q.correct) state = "correct";
                      else if (i === selected && selected !== q.correct)
                        state = "wrong";
                    }

                    return (
                      <motion.button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={selected !== null}
                        whileHover={selected === null ? { x: 4 } : {}}
                        className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                          state === "correct"
                            ? "bg-green-500/20 border-green-500/50 text-green-300"
                            : state === "wrong"
                              ? "bg-red-500/20 border-red-500/50 text-red-300"
                              : selected === null
                                ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-500/30 hover:text-white"
                                : "bg-white/5 border-white/10 text-gray-500"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-sm leading-relaxed">{option}</span>
                          {state === "correct" && (
                            <span className="ml-auto text-green-400">✓</span>
                          )}
                          {state === "wrong" && (
                            <span className="ml-auto text-red-400">✗</span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {selected !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-gray-300"
                  >
                    <span className="font-semibold text-blue-400">Fact: </span>
                    {q.explanation}
                  </motion.div>
                )}
              </motion.div>
            )}

            {finished && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center"
              >
                <div className="text-6xl mb-4">
                  {score >= 4 ? "🏆" : score >= 3 ? "🌟" : score >= 2 ? "📚" : "🤔"}
                </div>
                <h3 className="text-3xl font-black text-white mb-2">
                  {score} / {questions.length}
                </h3>
                <p className="text-gray-400 mb-2">
                  {((score / questions.length) * 100).toFixed(0)}% correct
                </p>
                <p className="text-cyan-400 font-medium mb-6">
                  {score >= 4
                    ? "Outstanding! You're a political mastermind!"
                    : score >= 3
                      ? "Great job! You know your politics well."
                      : score >= 2
                        ? "Good effort! Keep learning."
                        : "Keep exploring to learn more!"}
                </p>

                <div className="grid grid-cols-5 gap-2 mb-8">
                  {questions.map((q, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-xl text-center ${
                        answers[i] === q.correct
                          ? "bg-green-500/20 border border-green-500/30"
                          : "bg-red-500/20 border border-red-500/30"
                      }`}
                    >
                      <div className="text-lg">
                        {answers[i] === q.correct ? "✓" : "✗"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Q{i + 1}</div>
                    </div>
                  ))}
                </div>

                {score >= 4 && (
                  <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <div className="text-cyan-400 font-semibold text-sm">
                      🎯 Quiz Master achievement unlocked! +200 XP
                    </div>
                  </div>
                )}

                <button
                  onClick={restart}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
