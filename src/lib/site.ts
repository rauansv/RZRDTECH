/**
 * Fonte única de verdade para o conteúdo do site.
 * As seções são orientadas a dados para manter a composição da página declarativa.
 * Os valores de `icon` são nomes de ícones do Lucide, resolvidos nos componentes
 * (mantém a fronteira server → client serializável).
 */

import content from "../../content/site.json";

/**
 * O conteúdo editável vive em content/site.json e é gerenciado pelo
 * painel /admin (rodando localmente). Este módulo re-exporta os dados
 * com as mesmas formas que os componentes já consomem.
 */

export const site = content.site;

export const nav = [
  { label: "Sobre", href: "#about" },
  { label: "Serviços", href: "#services" },
  { label: "Processo", href: "#process" },
  { label: "Projetos", href: "#work" },
  { label: "Tecnologia", href: "#tech" },
] as const;

export type Service = {
  title: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    title: "Software Sob Medida",
    description:
      "Sistemas feitos sob medida, projetados em torno da sua operação — não forçados em um template.",
    icon: "Code2",
  },
  {
    title: "Plataformas Web",
    description:
      "Produtos web de alta performance com o acabamento de um aplicativo nativo.",
    icon: "Globe",
  },
  {
    title: "Aplicativos Mobile",
    description:
      "Experiências iOS e Android rápidas, fluidas e bem pensadas.",
    icon: "Smartphone",
  },
  {
    title: "Inteligência Artificial",
    description:
      "LLMs, automação e agentes inteligentes integrados diretamente aos seus fluxos de trabalho.",
    icon: "Sparkles",
  },
  {
    title: "Automação de Processos",
    description:
      "Elimine trabalho manual com pipelines confiáveis e sistemas orientados a eventos.",
    icon: "Workflow",
  },
  {
    title: "APIs & Integrações",
    description:
      "APIs robustas e documentadas que conectam o seu stack a todo o resto.",
    icon: "Webhook",
  },
  {
    title: "Dashboards & Analytics",
    description:
      "Transforme dados em decisões com interfaces claras e em tempo real.",
    icon: "LineChart",
  },
  {
    title: "Soluções em Nuvem",
    description:
      "Infraestrutura escalável e segura, projetada para disponibilidade e crescimento.",
    icon: "Cloud",
  },
  {
    title: "Design UX / UI",
    description:
      "Design de produto que transforma complexidade em experiências premium e sem esforço.",
    icon: "PenTool",
  },
];

export type ProcessStep = {
  no: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    no: "01",
    title: "Descoberta",
    description:
      "Mapeamos o problema, os usuários e os objetivos de negócio antes de escrever uma única linha de código.",
  },
  {
    no: "02",
    title: "Planejamento",
    description:
      "Arquitetura, escopo e roadmap definidos com marcos e estimativas claras.",
  },
  {
    no: "03",
    title: "Design",
    description:
      "Interface e experiência criadas em um padrão premium e preciso ao pixel.",
  },
  {
    no: "04",
    title: "Desenvolvimento",
    description:
      "Código limpo, tipado e testado, entregue continuamente com total transparência.",
  },
  {
    no: "05",
    title: "Testes",
    description:
      "QA automatizado e manual para garantir correção, segurança e velocidade.",
  },
  {
    no: "06",
    title: "Deploy",
    description:
      "Lançamentos sem downtime em infraestrutura de nuvem escalável e monitorada.",
  },
  {
    no: "07",
    title: "Suporte",
    description:
      "Evolução, monitoramento e otimização contínuos à medida que o seu produto cresce.",
  },
];

export type Tech = { name: string; icon: string };

export const technologies: Tech[] = [
  { name: "React", icon: "Atom" },
  { name: "Next.js", icon: "Triangle" },
  { name: "Node.js", icon: "Hexagon" },
  { name: "TypeScript", icon: "FileCode2" },
  { name: "PostgreSQL", icon: "Database" },
  { name: "Docker", icon: "Container" },
  { name: "Supabase", icon: "Zap" },
  { name: "OpenAI", icon: "Sparkles" },
  { name: "Cloudflare", icon: "CloudLightning" },
  { name: "AWS", icon: "Server" },
  { name: "GitHub", icon: "Github" },
  { name: "Framer Motion", icon: "Wand2" },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  accent: string; // stops de gradiente para a capa abstrata
};

export const projects: Project[] = content.projects;

export type Differential = {
  title: string;
  description: string;
  icon: string;
};

export const differentials: Differential[] = [
  {
    title: "Arquitetura Limpa",
    description:
      "Sistemas feitos para serem compreendidos, estendidos e mantidos por anos.",
    icon: "Boxes",
  },
  {
    title: "Alta Performance",
    description:
      "Milissegundos importam. Somos obcecados por velocidade em todas as camadas.",
    icon: "Gauge",
  },
  {
    title: "Segurança",
    description:
      "Defesa em profundidade, criptografia por padrão, auditada e em conformidade.",
    icon: "ShieldCheck",
  },
  {
    title: "Escalabilidade",
    description: "Infraestrutura que cresce do primeiro usuário a milhões.",
    icon: "TrendingUp",
  },
  {
    title: "UX Premium",
    description:
      "Interfaces que parecem naturais, bem pensadas e encantadoras.",
    icon: "Fingerprint",
  },
  {
    title: "Integração com IA",
    description:
      "Inteligência integrada nativamente aos produtos, não adicionada depois.",
    icon: "BrainCircuit",
  },
];

export const values = [
  {
    title: "Engenharia em primeiro lugar",
    description:
      "Somos engenheiros antes de tudo. Excelência e correção não são negociáveis.",
  },
  {
    title: "Parceria",
    description:
      "Trabalhamos como uma extensão do seu time — alinhados a resultados, não a horas.",
  },
  {
    title: "Longevidade",
    description:
      "Construímos software feito para durar, evoluir e escalar no longo prazo.",
  },
] as const;

export const stats = [
  { value: "100%", label: "Sob medida" },
  { value: "<1s", label: "Carregamento" },
  { value: "24/7", label: "Monitoramento" },
  { value: "∞", label: "Escalabilidade" },
] as const;

/* -------------------------------------------------------------
   Hero cinematográfico (template: Daily Hero 33 / Arkkhe)
   A cena de fundo (public/hero/scene.webp) foi extraída do Figma
   e limpa — toda a UI é reconstruída em código por cima dela.
------------------------------------------------------------- */

export const heroFractal = {
  // "MATÉRIA DIGITAL" — o "A" de DIGITAL vira um triângulo azul no hero.
  line1: content.hero.line1,
  line2Pre: content.hero.line2Pre,
  line2Post: content.hero.line2Post,
  subtitle: content.hero.subtitle,
  image: content.hero.image,
  cta: { label: content.hero.ctaLabel, href: "#contact" },
  bar: {
    label: "Nossos Pilares",
    items: content.hero.pillars,
  },
};
