import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2, 
  Menu, 
  X,
  BrainCircuit,
  Award,
  ArrowRight,
  Send,
  Loader2,
  Map,
  ExternalLink
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from './lib/utils';
import { practiceQuestions, studyModules, roadmapSteps } from './constants';
import { getTutorResponse } from './services/geminiService';

type Tab = 'home' | 'study' | 'roadmap' | 'exam' | 'tutor';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home onStart={() => setActiveTab('study')} />;
      case 'study': return <StudyGuide />;
      case 'roadmap': return <Roadmap />;
      case 'exam': return <PracticeExam />;
      case 'tutor': return <AITutor />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-[#E6E1DC]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FDFCFB]/80 backdrop-blur-md border-b border-[#E6E1DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <BrainCircuit className="w-8 h-8 text-[#D97706]" />
              <span className="text-xl font-semibold tracking-tight italic serif">Claude Architect</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <NavButton active={activeTab === 'study'} onClick={() => setActiveTab('study')} icon={<BookOpen className="w-4 h-4" />} label="学習ガイド" />
              <NavButton active={activeTab === 'roadmap'} onClick={() => setActiveTab('roadmap')} icon={<Map className="w-4 h-4" />} label="ロードマップ" />
              <NavButton active={activeTab === 'exam'} onClick={() => setActiveTab('exam')} icon={<GraduationCap className="w-4 h-4" />} label="模擬試験" />
              <NavButton active={activeTab === 'tutor'} onClick={() => setActiveTab('tutor')} icon={<MessageSquare className="w-4 h-4" />} label="AIチューター" />
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FDFCFB] border-b border-[#E6E1DC] overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                <MobileNavButton active={activeTab === 'study'} onClick={() => { setActiveTab('study'); setIsMenuOpen(false); }} label="学習ガイド" />
                <MobileNavButton active={activeTab === 'roadmap'} onClick={() => { setActiveTab('roadmap'); setIsMenuOpen(false); }} label="ロードマップ" />
                <MobileNavButton active={activeTab === 'exam'} onClick={() => { setActiveTab('exam'); setIsMenuOpen(false); }} label="模擬試験" />
                <MobileNavButton active={activeTab === 'tutor'} onClick={() => { setActiveTab('tutor'); setIsMenuOpen(false); }} label="AIチューター" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-[#E6E1DC] py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-[#8E8E8E] uppercase tracking-widest font-mono">
            © 2026 Claude Certified Architect Prep • Built with Gemini
          </p>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#D97706]",
        active ? "text-[#D97706]" : "text-[#525252]"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function MobileNavButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 rounded-lg text-base font-medium",
        active ? "bg-[#F5F3F1] text-[#D97706]" : "text-[#525252]"
      )}
    >
      {label}
    </button>
  );
}

function Home({ onStart }: { onStart: () => void }) {
  return (
    <div className="space-y-24">
      <section className="text-center space-y-8 py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F3F1] border border-[#E6E1DC] text-xs font-semibold uppercase tracking-widest text-[#D97706]"
        >
          <Award className="w-4 h-4" />
          認定試験対策プラットフォーム
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] serif italic">
          Master the Art of <br />
          <span className="text-[#D97706]">Claude Architecture</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-[#525252] leading-relaxed">
          Claude Certified Architect試験に合格するための、包括的な学習ガイド、インタラクティブな模擬試験、そして24時間利用可能なAIチューターを提供します。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={onStart}
            className="group px-8 py-4 bg-[#1A1A1A] text-white rounded-full font-semibold flex items-center gap-2 hover:bg-[#D97706] transition-all"
          >
            学習を始める
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 border border-[#E6E1DC] rounded-full font-semibold hover:bg-[#F5F3F1] transition-colors">
            カリキュラムを見る
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<BookOpen className="w-8 h-8" />}
          title="体系的なカリキュラム"
          description="プロンプトエンジニアリングから複雑なシステム設計まで、ステップバイステップのガイドに従って学習できます。"
        />
        <FeatureCard 
          icon={<GraduationCap className="w-8 h-8" />}
          title="模擬試験"
          description="本番に近い試験問題で知識をテストし、すべての回答に対して詳細な解説を確認できます。"
        />
        <FeatureCard 
          icon={<MessageSquare className="w-8 h-8" />}
          title="AIチューター"
          description="Geminiを搭載したチューターから、質問への即座の回答やパーソナライズされた学習アドバイスを受けられます。"
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-white border border-[#E6E1DC] rounded-3xl space-y-4 hover:shadow-xl hover:shadow-[#D97706]/5 transition-all">
      <div className="text-[#D97706]">{icon}</div>
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <p className="text-[#525252] leading-relaxed">{description}</p>
    </div>
  );
}

function Roadmap() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold tracking-tight serif italic text-center">Learning Roadmap</h2>
        <p className="text-[#525252] text-center">Claude Certified Architect 合格に向けた5ステップの学習ロードマップ</p>
      </div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#E6E1DC] before:to-transparent">
        {roadmapSteps.map((step, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E6E1DC] bg-[#FDFCFB] text-[#D97706] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
              {step.step}
            </div>
            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 bg-white border border-[#E6E1DC] rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{step.title}</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8E8E8E]">主要トピック</p>
                  <ul className="space-y-1">
                    {step.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="text-sm text-[#525252] flex items-start gap-2">
                        <span className="text-[#D97706] mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8E8E8E]">推奨リソース</p>
                  <div className="flex flex-wrap gap-2">
                    {step.resources.map((res, rIdx) => (
                      <a 
                        key={rIdx} 
                        href={res.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#D97706] hover:underline"
                      >
                        {res.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudyGuide() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold tracking-tight serif italic">学習カリキュラム</h2>
        <p className="text-[#525252]">認定試験に向けて、これらのモジュールをマスターしましょう。</p>
      </div>

      <div className="space-y-6">
        {studyModules.map((module, idx) => (
          <div key={idx} className="p-8 bg-white border border-[#E6E1DC] rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">{module.title}</h3>
              <span className="text-sm font-mono text-[#D97706]">0{idx + 1}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {module.topics.map((topic, tIdx) => (
                <div key={tIdx} className="flex items-center gap-3 p-4 bg-[#FDFCFB] border border-[#E6E1DC] rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#D97706]" />
                  <span className="font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticeExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === practiceQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < practiceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
        <div className="inline-block p-6 rounded-full bg-[#F5F3F1] text-[#D97706]">
          <Award className="w-16 h-16" />
        </div>
        <h2 className="text-4xl font-bold serif italic">試験完了！</h2>
        <p className="text-2xl">あなたのスコア: <span className="font-bold text-[#D97706]">{score} / {practiceQuestions.length}</span></p>
        <button 
          onClick={() => {
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setShowResult(false);
            setScore(0);
          }}
          className="px-8 py-4 bg-[#1A1A1A] text-white rounded-full font-semibold hover:bg-[#D97706] transition-colors"
        >
          試験をやり直す
        </button>
      </div>
    );
  }

  const question = practiceQuestions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between text-sm font-mono text-[#8E8E8E]">
        <span>問題 {currentQuestion + 1} / {practiceQuestions.length}</span>
        <span>スコア: {score}</span>
      </div>

      <div className="p-8 bg-white border border-[#E6E1DC] rounded-3xl space-y-8">
        <h3 className="text-2xl font-bold leading-tight">{question.text}</h3>
        
        <div className="space-y-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selectedAnswer !== null}
              className={cn(
                "w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between group",
                selectedAnswer === null 
                  ? "border-[#E6E1DC] hover:border-[#D97706] hover:bg-[#FDFCFB]" 
                  : idx === question.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : idx === selectedAnswer
                      ? "border-red-500 bg-red-50"
                      : "border-[#E6E1DC] opacity-50"
              )}
            >
              <span className="font-medium">{option}</span>
              {selectedAnswer !== null && idx === question.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-[#F5F3F1] rounded-2xl space-y-2"
          >
            <p className="font-bold text-sm uppercase tracking-widest text-[#D97706]">解説</p>
            <p className="text-[#525252] leading-relaxed">{question.explanation}</p>
            <button 
              onClick={nextQuestion}
              className="mt-4 w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              {currentQuestion === practiceQuestions.length - 1 ? "試験を終了する" : "次の問題へ"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function AITutor() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text }));
      const response = await getTutorResponse(userMsg, history);
      setMessages(prev => [...prev, { role: 'ai', text: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to the AI tutor. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-white border border-[#E6E1DC] rounded-3xl overflow-hidden shadow-2xl shadow-[#D97706]/5">
      <div className="p-6 border-b border-[#E6E1DC] flex items-center gap-3 bg-[#FDFCFB]">
        <div className="w-10 h-10 rounded-full bg-[#D97706] flex items-center justify-center text-white">
          <BrainCircuit className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold">Claude Architect AIチューター</h3>
          <p className="text-xs text-[#8E8E8E] uppercase tracking-widest">Powered by Gemini 3 Flash</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FDFCFB]/50">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <MessageSquare className="w-12 h-12" />
            <p className="max-w-xs">Claude Certified Architect試験、プロンプトエンジニアリング、システム設計について何でも聞いてください。</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "flex",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "max-w-[80%] p-4 rounded-2xl",
              msg.role === 'user' 
                ? "bg-[#1A1A1A] text-white rounded-tr-none" 
                : "bg-white border border-[#E6E1DC] text-[#1A1A1A] rounded-tl-none shadow-sm"
            )}>
              <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#E6E1DC] p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#D97706]" />
              <span className="text-sm font-medium italic">チューターが考えています...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-[#E6E1DC] bg-white">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="質問を入力..."
            className="flex-1 px-6 py-4 bg-[#F5F3F1] border-none rounded-2xl focus:ring-2 focus:ring-[#D97706] transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-4 bg-[#1A1A1A] text-white rounded-2xl hover:bg-[#D97706] transition-colors disabled:opacity-50"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
