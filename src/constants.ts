export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const practiceQuestions: Question[] = [
  {
    id: "1",
    text: "ClaudeのプロンプトでXMLタグを使用する主な利点は何ですか？",
    options: [
      "プロンプトをより専門的に見せるため",
      "Claudeが指示、コンテキスト、入力データを区別しやすくするため",
      "プロンプトのトークン数を減らすため",
      "すべてのAPI呼び出しで必須であるため"
    ],
    correctAnswer: 1,
    explanation: "Claudeは情報を構造化するためにXMLタグを認識し活用するように特別に訓練されており、複雑な指示に従う能力が向上します。"
  },
  {
    id: "2",
    text: "Claudeをリアルタイムのカスタマーサポートに使用するシステムを設計する場合、時間のかかる推論タスクを処理するのに最も適切なアーキテクチャパターンはどれですか？",
    options: [
      "長いタイムアウトを設定した同期API呼び出し",
      "1秒ごとにAPIをポーリングする",
      "Webhookまたはステータスポーリングを使用した非同期処理",
      "オンプレミスでClaudeを実行する"
    ],
    correctAnswer: 2,
    explanation: "非同期パターンは、メインスレッドをブロックせず、より良いユーザーエクスペリエンスを提供するために、長時間のタスクに適しています。"
  },
  {
    id: "3",
    text: "「Chain of Thought（思考の連鎖）」プロンプティングの重要な原則は次のうちどれですか？",
    options: [
      "最終的な回答のみを提供するようClaudeに依頼する",
      "Claudeに推論をステップバイステップで分解するように促す",
      "できるだけ多くのトークンを使用する",
      "同じ指示を何度も繰り返す"
    ],
    correctAnswer: 1,
    explanation: "Chain of Thoughtプロンプティングは、モデルに「独り言」を言わせることで、複雑な推論タスクにおいてより正確な結果を導き出すことがよくあります。"
  },
  {
    id: "4",
    text: "基本的な分類のような高スループットで低遅延なタスクに最適なClaudeモデルはどれですか？",
    options: [
      "Claude 3.5 Sonnet",
      "Claude 3 Opus",
      "Claude 3 Haiku",
      "Claude 2.1"
    ],
    correctAnswer: 2,
    explanation: "HaikuはClaude 3ファミリーの中で最も高速でコスト効率が高く、単純で大量のタスクに最適です。"
  },
  {
    id: "5",
    text: "Claude 3.5 Sonnetの初期リリース時点での最大コンテキストウィンドウはいくつですか？",
    options: [
      "100,000トークン",
      "200,000トークン",
      "500,000トークン",
      "1,000,000トークン"
    ],
    correctAnswer: 1,
    explanation: "Claude 3.5 Sonnetは200kトークンのコンテキストウィンドウでリリースされ、非常に大きなドキュメントの処理が可能です。"
  }
];

export const roadmapSteps = [
  {
    step: 1,
    title: "LLMの基礎とClaudeの理解",
    topics: [
      "LLMの基本アーキテクチャ",
      "Claude 3ファミリー（Haiku, Sonnet, Opus）の特性比較",
      "コンテキストウィンドウとトークン管理の重要性",
      "モデルの選択基準（コスト vs パフォーマンス）"
    ],
    resources: [
      { name: "Anthropic Documentation", url: "https://docs.anthropic.com/" },
      { name: "Claude 3 Model Card", url: "https://www-p.anthropic.com/claude-3-model-card" }
    ]
  },
  {
    step: 2,
    title: "高度なプロンプトエンジニアリング",
    topics: [
      "XMLタグによる構造化プロンプト",
      "Few-shotプロンプティングのベストプラクティス",
      "Chain of Thought（思考の連鎖）の誘導",
      "システムプロンプトとレスポンスの事前入力（Prefilling）"
    ],
    resources: [
      { name: "Anthropic Prompt Engineering Guide", url: "https://docs.anthropic.com/claude/docs/prompt-engineering" },
      { name: "Anthropic Prompt Library", url: "https://docs.anthropic.com/claude/prompt-library" }
    ]
  },
  {
    step: 3,
    title: "システム設計とAPI統合",
    topics: [
      "API統合パターン（同期 vs 非同期）",
      "ストリーミングレスポンスの実装",
      "ツール使用（Function Calling）の設計",
      "エラーハンドリングとリトライ戦略"
    ],
    resources: [
      { name: "Anthropic API Reference", url: "https://docs.anthropic.com/claude/reference/getting-started-with-the-api" },
      { name: "Tool Use (Function Calling) Guide", url: "https://docs.anthropic.com/claude/docs/tool-use" }
    ]
  },
  {
    step: 4,
    title: "セキュリティ、ガバナンス、倫理",
    topics: [
      "プロンプトインジェクション攻撃の防御策",
      "データプライバシーとコンプライアンス",
      "Constitutional AIの理解",
      "出力のフィルタリングとガードレールの構築"
    ],
    resources: [
      { name: "Anthropic Safety and Policy", url: "https://www.anthropic.com/safety" },
      { name: "Responsible AI Guidelines", url: "https://docs.anthropic.com/claude/docs/responsible-deployment" }
    ]
  },
  {
    step: 5,
    title: "最適化とスケーリング",
    topics: [
      "プロンプトキャッシングによるコスト削減",
      "バッチ処理APIの活用",
      "パフォーマンス評価（Evaluation）フレームワーク",
      "スケーラブルなAIアーキテクチャの構築"
    ],
    resources: [
      { name: "Anthropic Cookbook (GitHub)", url: "https://github.com/anthropics/anthropic-cookbook" },
      { name: "Optimization Guide", url: "https://docs.anthropic.com/claude/docs/optimizing-your-prompt" }
    ]
  }
];

export const studyModules = [
  {
    title: "モジュール 1: プロンプトエンジニアリングの基礎",
    topics: [
      "明確で直接的な指示",
      "構造化のためのXMLタグの使用",
      "Few-Shotプロンプティング",
      "Chain of Thought（思考の連鎖）"
    ]
  },
  {
    title: "モジュール 2: システム設計とアーキテクチャ",
    topics: [
      "トークン管理と最適化",
      "コンテキストウィンドウ戦略",
      "API統合パターン",
      "エラーハンドリングとリトライ"
    ]
  },
  {
    title: "モジュール 3: セキュリティとコンプライアンス",
    topics: [
      "AIシステムにおけるデータプライバシー",
      "プロンプトインジェクション対策",
      "出力コンテンツフィルタリング",
      "責任あるAIの原則"
    ]
  }
];
