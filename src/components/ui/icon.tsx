import {
  Atom,
  Boxes,
  BrainCircuit,
  Check,
  Cloud,
  CloudLightning,
  Code2,
  Container,
  Database,
  FileCode2,
  Fingerprint,
  Gauge,
  Globe,
  Hexagon,
  LineChart,
  Mail,
  PenTool,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Triangle,
  Wand2,
  Webhook,
  Workflow,
  Zap,
  type LucideProps,
} from "lucide-react";
import { Github, Instagram, Linkedin } from "@/components/ui/brand-icons";

/** Curated icon registry — data references icons by name, resolved here. */
const registry = {
  Atom,
  Boxes,
  BrainCircuit,
  Check,
  Cloud,
  CloudLightning,
  Code2,
  Container,
  Database,
  FileCode2,
  Fingerprint,
  Gauge,
  Github,
  Globe,
  Hexagon,
  Instagram,
  LineChart,
  Linkedin,
  Mail,
  PenTool,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Triangle,
  Wand2,
  Webhook,
  Workflow,
  Zap,
} as const;

export type IconName = keyof typeof registry;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = registry[name];
  if (!Cmp) return null;
  return <Cmp aria-hidden {...props} />;
}
