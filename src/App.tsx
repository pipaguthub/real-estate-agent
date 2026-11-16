import { useState, useMemo } from "react";
import {
  Award,
  Check,
  Clock,
  Gamepad2,
  Infinity as InfinityIcon,
  Lock,
  Printer,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { SectionHeading } from "@/src/components/SectionHeading";
import { ImageCarousel } from "@/src/components/ImageCarousel";
import { DownsellModal } from "@/src/components/DownsellModal";
import { LegalModal, type LegalDocType } from "@/src/components/LegalModal";
import {
  ACTIVITY_SLIDES,
  BONUS_ITEMS,
  FAQ_ITEMS,
  SOCIAL_PROOF_SLIDES,
} from "@/src/data/landingData";
import { CHECKOUT_LINKS, buildCheckoutUrl } from "@/src/utils/utm";
import heroKitMockupImg from "@/src/assets/images/hero_kit_mockup_1794796957094.jpg";
import comoReceberAcessoImg from "@/src/assets/images/como_receber_acesso_1794796958210.jpg";
import planoBasicoMockupImg from "@/src/assets/images/plano_basico_mockup_1794796957933.jpg";
import planoPremiumMockupImg from "@/src/assets/images/plano_premium_mockup_1794796958537.jpg";

const AVATAR_PROFILES = [
  { initials: "CM", bg: "#2453E0", label: "Professora Camila" },
  { initials: "MC", bg: "#F97316", label: "Mãe Mariana" },
  { initials: "PA", bg: "#2EB85C", label: "Professora Patrícia" },
  { initials: "RJ", bg: "#7C3AED", label: "Pai Rafael" },
];

const BENEFITS = [
  {
    title: "Pronto para imprimir",
    description:
      "PDFs organizados por tema, é só baixar, imprimir e usar.",
    icon: Printer,
    circleBg: "bg-[#E6EEFB]",
    iconColor: "text-[#2453E0]",
  },
  {
    title: "Economize tempo",
    description:
      "Atividades prontas para poupar horas de planejamento.",
    icon: Clock,
    circleBg: "bg-[#FFF0E5]",
    iconColor: "text-[#F97316]",
  },
  {
    title: "Aprendizado divertido",
    description:
      "Material lúdico e colorido que mantém a criança engajada.",
    icon: Gamepad2,
    circleBg: "bg-[#ECFDF3]",
    iconColor: "text-[#2EB85C]",
  },
  {
    title: "Acesso vitalício",
    description:
      "Baixe quantas vezes quiser e receba atualizações futuras.",
    icon: InfinityIcon,
    circleBg: "bg-[#F3E8FF]",
    iconColor: "text-[#7C3AED]",
  },
];

const BASIC_INCLUDED = [
  {
    title: "Mais de 10.000 atividades",
    description: "Do berçário ao 5º ano separadas por faixa etária.",
  },
  {
    title: "Acesso vitalício",
    description: "Material seu para sempre, baixe quantas vezes quiser.",
  },
  {
    title: "Garantia de 7 dias",
    description: "Teste sem riscos com reembolso integral garantido.",
  },
  {
    title: "Acesso imediato",
    description: "Receba os arquivos no e-mail logo após a compra.",
  },
  {
    title: "Alinhado à BNCC",
    description: "Conteúdo desenvolvido seguindo as diretrizes oficiais.",
  },
];

const PREMIUM_INCLUDED = [
  {
    title: "Mais de 15.000 atividades pedagógicas",
    description: "Todo o acervo do Kit Básico + 5.000 páginas extras inéditas.",
  },
  {
    title: "Inglês Infantil Ilustrado",
    description: "Vocabulário lúdico, cores, animais e primeiras expressões.",
  },
  {
    title: "Atividades Adaptadas para Autismo e TDAH",
    description: "Folhas com apoio visual limpo, foco sensorial e inclusão real.",
  },
  {
    title: "Todas as 6 Apostilas Bônus de Presente",
    description: "Coordenação motora, alfabetização, jogos, caligrafia e BNCC.",
  },
  {
    title: "Acesso vitalício + atualizações futuras",
    description: "Receba novos materiais sem pagar nenhuma mensalidade.",
  },
  {
    title: "Acesso imediato e Garantia de 7 dias",
    description: "Baixe agora pelo e-mail ou WhatsApp com risco zero.",
  },
];

export default function App() {
  const [downsellOpen, setDownsellOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);
  const [heroImgError, setHeroImgError] = useState(false);
  const [accessImgError, setAccessImgError] = useState(false);
  const [basicImgError, setBasicImgError] = useState(false);
  const [premiumImgError, setPremiumImgError] = useState(false);

  const premiumCheckoutUrl = useMemo(
    () => buildCheckoutUrl(CHECKOUT_LINKS.premium),
    []
  );

  const scrollToPlans = () => {
    const el = document.getElementById("planos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFCF2] text-[#1B2347]">
      {/* 1. BARRA DO TOPO (STICKY) */}
      <header className="sticky top-0 z-40 w-full bg-[#1840DC] text-white shadow-[0_4px_18px_rgba(24,64,220,0.28)]">
        <div className="max-w-[1152px] mx-auto px-4 py-2 flex flex-col items-center justify-center gap-1.5 text-center">
          <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.08em] text-white/95 leading-none">
            OFERTA POR TEMPO LIMITADO
          </p>
          <a
            href="#planos"
            onClick={(e) => {
              e.preventDefault();
              scrollToPlans();
            }}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#1840DC] shadow-sm hover:bg-[#E6EEFB] active:scale-95 transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBD19]"
          >
            COMPRE AGORA
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. HERO */}
        <section className="hero-dots relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 px-4">
          {/* Decorative Floating Stars & Sparkles */}
          <div
            className="pointer-events-none absolute inset-0 max-w-[1152px] mx-auto"
            aria-hidden="true"
          >
            <Star
              className="animate-float-slow absolute top-8 left-3 sm:left-8 h-7 w-7 sm:h-9 sm:w-9 fill-[#FFBD19] text-[#FFBD19] opacity-85"
              style={{ animationDelay: "0s" }}
            />
            <Sparkles
              className="animate-float-slow absolute top-14 right-3 sm:right-10 h-7 w-7 sm:h-9 sm:w-9 text-[#2453E0] opacity-70"
              style={{ animationDelay: "1.4s" }}
            />
            <Star
              className="animate-float-slow hidden sm:block absolute bottom-24 left-6 h-6 w-6 fill-[#F97316] text-[#F97316] opacity-75"
              style={{ animationDelay: "2.6s" }}
            />
            <Sparkles
              className="animate-float-slow hidden sm:block absolute bottom-28 right-8 h-8 w-8 text-[#2EB85C] opacity-75"
              style={{ animationDelay: "0.8s" }}
            />
          </div>

          <div className="relative z-10 max-w-[1152px] mx-auto flex flex-col items-center text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-[32px] sm:text-[46px] md:text-[52px] leading-[1.08] font-extrabold uppercase text-[#1B2347] text-balance">
                KIT COM +10.000 ATIVIDADES PEDAGÓGICAS
              </h1>
              <p className="mt-3 text-base sm:text-xl font-bold text-[#5B6482]">
                Do berçário ao 5º ano alinhado à BNCC
              </p>
            </div>

            {/* Hero Product Mockup */}
            <div className="mt-7 sm:mt-9 w-full max-w-[780px] mx-auto">
              {heroImgError ? (
                <div className="aspect-[4/3] w-full rounded-[20px] bg-white border-2 border-[#FFBD19] shadow-[0_20px_50px_rgba(27,35,71,0.12)] flex flex-col items-center justify-center p-8">
                  <Sparkles className="h-12 w-12 text-[#2453E0] mb-3" />
                  <p className="font-display text-2xl font-extrabold text-[#1B2347]">
                    Kit +10.000 Atividades Pedagógicas em PDF
                  </p>
                </div>
              ) : (
                <img
                  src={heroKitMockupImg}
                  alt="Mockup completo do Kit com mais de 10.000 Atividades Pedagógicas em PDF em tablet e cadernos impressos"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="w-full h-auto rounded-[20px] shadow-[0_20px_55px_rgba(27,35,71,0.16)] border-4 border-white object-cover"
                />
              )}
            </div>

            {/* Price & CTA Block */}
            <div className="mt-8 w-full max-w-[540px] mx-auto flex flex-col items-center">
              <p className="text-lg sm:text-xl font-extrabold text-[#E0262F] line-through tabular-nums">
                De R$ 39,90
              </p>
              <p className="mt-1 font-display text-[36px] sm:text-[42px] leading-tight font-extrabold text-[#2EB85C] tabular-nums">
                POR APENAS R$ 10,00
              </p>
              <p className="mt-1 text-sm sm:text-base font-bold text-[#4B5578]">
                Pagamento único • sem mensalidade
              </p>

              <button
                type="button"
                onClick={scrollToPlans}
                className="mt-5 w-full rounded-full bg-[#11C526] hover:bg-[#0FB122] px-6 py-4 text-[20px] font-display font-extrabold uppercase tracking-wide text-white animate-pulse-cta transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFBD19]"
              >
                QUERO GARANTIR MEU KIT AGORA
              </button>

              {/* 3 Trust Seals Row */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm font-extrabold text-[#1B2347]">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Zap className="h-4 w-4 text-[#F97316]" aria-hidden="true" />
                  Acesso Imediato
                </span>
                <span className="text-[#CBD5E1]" aria-hidden="true">
                  |
                </span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Lock className="h-4 w-4 text-[#2453E0]" aria-hidden="true" />
                  Pagamento Seguro
                </span>
                <span className="text-[#CBD5E1]" aria-hidden="true">
                  |
                </span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <ShieldCheck
                    className="h-4 w-4 text-[#2EB85C]"
                    aria-hidden="true"
                  />
                  7 Dias de Garantia
                </span>
              </div>

              {/* 5 Stars + Overlapping Avatars + Social Proof Count */}
              <div className="mt-6 flex flex-col items-center gap-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {AVATAR_PROFILES.map((avatar) => (
                      <div
                        key={avatar.initials}
                        title={avatar.label}
                        aria-label={avatar.label}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-extrabold text-white shadow-sm"
                        style={{ backgroundColor: avatar.bg }}
                      >
                        {avatar.initials}
                      </div>
                    ))}
                  </div>
                  <div
                    className="flex items-center gap-0.5"
                    aria-label="Avaliação 5 de 5 estrelas"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-[#FFBD19] text-[#FFBD19]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm sm:text-base font-bold text-[#3E4870]">
                  Mais de{" "}
                  <span className="font-extrabold text-[#1B2347] tabular-nums">
                    14.500
                  </span>{" "}
                  professores e pais já adquiriram e recomendam
                </p>
              </div>

              {/* Highlighted Specialist Phrase */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-[20px] bg-white border-2 border-[#FFBD19] px-5 py-2.5 shadow-sm">
                <Award
                  className="h-5 w-5 shrink-0 text-[#2453E0]"
                  aria-hidden="true"
                />
                <p className="text-sm sm:text-base font-extrabold text-[#1B2347]">
                  Nosso kit foi desenvolvido por professores especialistas
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. EXEMPLOS DE ATIVIDADES */}
        <section className="py-12 sm:py-16 px-4 bg-[#FFFCF2]">
          <div className="max-w-[1152px] mx-auto">
            <SectionHeading
              pill="Veja por dentro"
              title="Exemplos de atividades do nosso kit"
              subtitle="Folhinhas lúdicas, coloridas e organizadas passo a passo para cada idade"
            />
            <div className="mt-8">
              <ImageCarousel
                slides={ACTIVITY_SLIDES}
                variant="activity"
                ariaLabel="Exemplos de páginas de atividades do kit"
              />
            </div>
          </div>
        </section>

        {/* 4. COMO VOU RECEBER O ACESSO */}
        <section className="py-12 sm:py-16 px-4 bg-[#FBF6E3]/65">
          <div className="max-w-[1152px] mx-auto">
            <SectionHeading
              pill="Entrega Digital"
              title="Como vou receber o acesso?"
              subtitle="Tudo 100% digital em PDF: comprou, chegou no seu e-mail e WhatsApp na mesma hora"
            />

            <div className="mt-8 max-w-[820px] mx-auto">
              {accessImgError ? (
                <div className="aspect-video rounded-[20px] bg-white border-2 border-[#E6EEFB] p-8 flex flex-col items-center justify-center text-center">
                  <Printer className="h-12 w-12 text-[#2453E0] mb-3" />
                  <p className="font-display text-xl font-extrabold text-[#1B2347]">
                    Receba no E-mail, acesse no celular ou PC e imprima em casa
                  </p>
                </div>
              ) : (
                <img
                  src={comoReceberAcessoImg}
                  alt="Fluxo explicativo: confirmação no celular, acesso às pastas organizadas em PDF e impressão imediata das atividades"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setAccessImgError(true)}
                  className="w-full h-auto rounded-[20px] shadow-[0_16px_42px_rgba(27,35,71,0.1)] border-4 border-white"
                />
              )}

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-[20px] bg-white border border-[#E6EEFB] p-4 shadow-sm">
                  <p className="font-display text-lg font-extrabold text-[#2453E0]">
                    1. Confirmação Rápida
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#4B5578]">
                    Pagou no Pix ou cartão, a aprovação é imediata.
                  </p>
                </div>
                <div className="rounded-[20px] bg-white border border-[#E6EEFB] p-4 shadow-sm">
                  <p className="font-display text-lg font-extrabold text-[#2453E0]">
                    2. Link Exclusivo
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#4B5578]">
                    Você recebe tudo organizado por pastas no seu e-mail.
                  </p>
                </div>
                <div className="rounded-[20px] bg-white border border-[#E6EEFB] p-4 shadow-sm">
                  <p className="font-display text-lg font-extrabold text-[#2453E0]">
                    3. Baixe e Imprima
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#4B5578]">
                    Imprima apenas o que precisar, quantas vezes quiser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. BENEFÍCIOS */}
        <section className="py-12 sm:py-16 px-4 bg-[#FFFCF2]">
          <div className="max-w-[1152px] mx-auto">
            <SectionHeading
              pill="Vantagens"
              title="Benefícios de nosso material"
            />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[920px] mx-auto">
              {BENEFITS.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="rounded-[20px] bg-white border-2 border-[#FFBD19]/50 p-6 shadow-[0_10px_28px_rgba(27,35,71,0.06)] flex items-start gap-4"
                  >
                    <div
                      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${benefit.circleBg}`}
                    >
                      <Icon
                        className={`h-7 w-7 ${benefit.iconColor}`}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-extrabold text-[#1B2347]">
                        {benefit.title}
                      </h3>
                      <p className="mt-1 text-[15px] sm:text-base font-semibold text-[#4B5578] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. BÔNUS */}
        <section className="py-12 sm:py-16 px-4 bg-white/70">
          <div className="max-w-[1152px] mx-auto">
            <SectionHeading
              pill="Bônus Exclusivos do Premium"
              title="No Kit Premium, você recebe +6 apostilas bônus de presente:"
            />

            <div className="mt-9 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {BONUS_ITEMS.map((bonus) => (
                <div
                  key={bonus.id}
                  className="relative rounded-[20px] bg-[#FBF6E3] border-2 border-dashed border-[#FFBD19] p-3.5 sm:p-5 flex flex-col items-center text-center shadow-[0_8px_22px_rgba(27,35,71,0.05)]"
                >
                  <span className="absolute top-3 left-3 z-10 rounded-full bg-[#F97316] px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                    BÔNUS
                  </span>

                  <div className="mt-4 w-full max-w-[180px] aspect-[9/11] overflow-hidden rounded-[14px] bg-white shadow-sm">
                    <img
                      src={bonus.coverSrc}
                      alt={bonus.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h3 className="mt-3.5 font-display text-base sm:text-lg leading-snug font-extrabold text-[#1B2347]">
                    {bonus.title}
                  </h3>

                  <div className="mt-auto pt-3 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base">
                    <span className="font-bold text-[#E0262F] line-through tabular-nums">
                      De {bonus.oldPrice}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-extrabold text-[#2EB85C]">
                      GRÁTIS
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="inline-block rounded-[20px] bg-[#ECFDF3] border border-[#86EFAC] px-6 py-3 text-base sm:text-xl font-extrabold text-[#1B2347]">
                Total em bônus:{" "}
                <span className="text-[#E0262F] line-through tabular-nums mx-1">
                  R$ 262,60
                </span>{" "}
                <span className="text-[#2EB85C] font-display text-xl sm:text-2xl tabular-nums">
                  R$ 0,00
                </span>{" "}
                para você
              </p>
            </div>
          </div>
        </section>

        {/* 7. PLANO BÁSICO (id="planos") */}
        <section id="planos" className="py-12 sm:py-16 px-4 bg-[#FFFCF2] scroll-mt-16">
          <div className="max-w-[672px] mx-auto">
            <SectionHeading
              pill="KIT BÁSICO"
              title="Escolha o plano ideal para você"
            />

            <div className="mt-8 rounded-[40px] bg-white border-2 border-[#FFBD19] p-6 sm:p-9 shadow-[0_18px_40px_rgba(27,35,71,0.1)]">
              <div className="text-center">
                <h3 className="font-display text-[26px] sm:text-[32px] font-extrabold text-[#1B2347]">
                  Kit Básico +10.000 Atividades
                </h3>
                <p className="mt-1 text-sm sm:text-base font-bold text-[#4B5578]">
                  Acesso digital em PDF do Berçário ao 5º Ano
                </p>
              </div>

              <div className="mt-5 w-full max-w-[440px] mx-auto">
                {basicImgError ? (
                  <div className="aspect-[4/3] rounded-[20px] bg-[#FBF6E3] border border-[#FFBD19] flex items-center justify-center p-6 text-center font-bold">
                    Kit Básico +10.000 Atividades Pedagógicas
                  </div>
                ) : (
                  <img
                    src={planoBasicoMockupImg}
                    alt="Mockup do Kit Básico com mais de 10.000 Atividades Pedagógicas em PDF"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setBasicImgError(true)}
                    className="w-full h-auto rounded-[20px] shadow-md"
                  />
                )}
              </div>

              {/* Included List */}
              <ul className="mt-6 space-y-2.5">
                {BASIC_INCLUDED.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-[20px] bg-[#ECFDF3] border border-[#86EFAC] px-4 py-3 flex items-start gap-3"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2EB85C] text-white">
                      <Check className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-extrabold text-[#1B2347] text-[15px] sm:text-base leading-snug">
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#3E4870]">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}

                {/* 1 Excluded Item */}
                <li className="rounded-[20px] bg-[#FEF2F2] border border-[#FCA5A5] px-4 py-3 flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E0262F] text-white">
                    <X className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                  </span>
                  <p className="font-extrabold text-[#B91C1C] text-[15px] sm:text-base">
                    Não inclui as 6 apostilas bônus Premium
                  </p>
                </li>
              </ul>

              {/* Basic Price & CTA */}
              <div className="mt-7 text-center">
                <p className="text-base sm:text-lg font-extrabold text-[#E0262F] line-through tabular-nums">
                  De R$ 39,90
                </p>
                <p className="mt-1 font-display text-[36px] sm:text-[42px] leading-none font-extrabold text-[#2EB85C] tabular-nums">
                  POR APENAS R$ 10,00
                </p>
                <p className="mt-1.5 text-sm font-bold text-[#4B5578]">
                  Pagamento único • sem mensalidade
                </p>

                <button
                  type="button"
                  onClick={() => setDownsellOpen(true)}
                  className="mt-5 w-full rounded-full bg-[#11C526] hover:bg-[#0FB122] px-6 py-4 text-[20px] font-display font-extrabold uppercase tracking-wide text-white animate-pulse-cta transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFBD19]"
                >
                  QUERO ADQUIRIR AGORA
                </button>
              </div>

              {/* Upsell Attention Box */}
              <div className="mt-5 rounded-[20px] bg-[#E6EEFB] px-4 py-3.5 text-center">
                <p className="text-sm sm:text-base font-extrabold text-[#E0262F]">
                  Atenção! Temos uma oferta mais vantajosa para você. Confira
                  abaixo 👇
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-bold text-[#4B5578]">
                <span className="inline-flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-[#2EB85C]" aria-hidden="true" />
                  Pagamento 100% seguro
                </span>
                <span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-[#F97316]" aria-hidden="true" />
                  Acesso imediato
                </span>
                <span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1">
                  <RefreshCw
                    className="h-3.5 w-3.5 text-[#2453E0]"
                    aria-hidden="true"
                  />
                  Atualizações vitalícias
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 8. PLANO PREMIUM (DESTAQUE) */}
        <section id="plano-premium" className="pb-14 sm:pb-20 pt-4 px-4 bg-[#FFFCF2] scroll-mt-16">
          <div className="max-w-[672px] mx-auto">
            <div
              className="rounded-[40px] border-4 border-[#FFBD19] p-6 sm:p-9"
              style={{
                background:
                  "linear-gradient(145deg, #FFFFFF 0%, #FFF8D9 48%, #EEF3FF 100%)",
                boxShadow:
                  "0 24px 65px rgba(24,64,220,.2), 0 0 0 7px rgba(255,189,25,.12)",
              }}
            >
              {/* Two Badges Side-by-Side */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#F97316] px-3.5 py-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wide text-white shadow-sm">
                  ⭐ MAIS ESCOLHIDO • MELHOR CUSTO-BENEFÍCIO
                </span>
                <span className="inline-flex items-center rounded-full bg-[#2453E0] px-3.5 py-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wide text-white shadow-sm">
                  KIT PREMIUM
                </span>
              </div>

              <div className="mt-5 text-center">
                <h2 className="font-display text-[30px] md:text-[36px] leading-[1.12] font-extrabold text-[#1B2347] text-balance">
                  Kit +15.000 Atividades Pedagógicas
                </h2>
                <p className="mt-3 text-[15px] sm:text-base font-bold text-[#3E4870] leading-relaxed">
                  A experiência completa para professoras e famílias: além de
                  todas as atividades do Básico, você leva módulos de Inglês
                  Infantil, materiais adaptados para Autismo e TDAH e todas as 6
                  apostilas bônus exclusivas!
                </p>
              </div>

              {/* Premium Mockup */}
              <div className="mt-6 w-full max-w-[480px] mx-auto">
                {premiumImgError ? (
                  <div className="aspect-[4/3] rounded-[20px] bg-white border-2 border-[#FFBD19] flex items-center justify-center p-6 text-center font-bold">
                    Kit Premium +15.000 Atividades Pedagógicas + 6 Bônus
                  </div>
                ) : (
                  <img
                    src={planoPremiumMockupImg}
                    alt="Mockup completo do Kit Premium com 15.000 Atividades Pedagógicas, Inglês, TEA/TDAH e 6 apostilas bônus"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setPremiumImgError(true)}
                    className="w-full h-auto rounded-[20px] shadow-[0_14px_34px_rgba(27,35,71,0.14)] border-2 border-white"
                  />
                )}
              </div>

              <p className="mt-6 font-display text-lg sm:text-xl font-extrabold text-[#1B2347] text-center">
                Tudo do Básico + vantagens exclusivas:
              </p>

              <ul className="mt-4 space-y-2.5">
                {PREMIUM_INCLUDED.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-[20px] bg-white/95 border border-[#86EFAC] px-4 py-3 flex items-start gap-3 shadow-sm"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2EB85C] text-white">
                      <Check className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-extrabold text-[#1B2347] text-[15px] sm:text-base leading-snug">
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#4B5578]">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Premium Price & CTA */}
              <div className="mt-7 text-center">
                <p className="text-base sm:text-lg font-extrabold text-[#E0262F] line-through tabular-nums">
                  De R$ 89,90
                </p>
                <p className="mt-1 font-display text-[40px] sm:text-[46px] leading-none font-extrabold text-[#2EB85C] tabular-nums">
                  POR APENAS R$ 27,00
                </p>
                <p className="mt-2 inline-block rounded-full bg-[#FFF0E5] border border-[#F97316]/35 px-4 py-1 text-xs sm:text-sm font-extrabold text-[#EA580C]">
                  Apenas R$ 17 a mais para levar todos os bônus
                </p>

                <a
                  href={premiumCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center w-full rounded-full bg-[#11C526] hover:bg-[#0FB122] px-6 py-4 text-[20px] font-display font-extrabold uppercase tracking-wide text-white animate-pulse-cta transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFBD19]"
                >
                  QUERO O KIT PREMIUM COMPLETO
                </a>
              </div>

              {/* 7-Day Guarantee Shield Block */}
              <div className="mt-6 rounded-[20px] bg-white/95 border border-[#DCE3F0] p-4 sm:p-5 flex items-start gap-3.5">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ECFDF3] text-[#2EB85C]">
                  <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#3E4870] leading-relaxed">
                  <strong className="text-[#1B2347]">
                    Garantia Incondicional de 7 Dias.
                  </strong>{" "}
                  Se por qualquer motivo você não gostar do material, basta
                  enviar um e-mail em até 7 dias e devolvemos 100% do seu
                  dinheiro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. PROVAS SOCIAIS */}
        <section className="py-12 sm:py-16 px-4 bg-[#FBF6E3]/70">
          <div className="max-w-[1152px] mx-auto">
            <SectionHeading
              pill="Depoimentos Reais"
              title="Quem comprou, aprovou e recomenda"
              subtitle="Veja o que professoras e mães estão dizendo sobre o material"
            />
            <div className="mt-8 max-w-[820px] mx-auto">
              <ImageCarousel
                slides={SOCIAL_PROOF_SLIDES}
                variant="testimonial"
                autoplayMs={4500}
                ariaLabel="Depoimentos de clientes que compraram o kit"
              />
            </div>
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="py-12 sm:py-16 px-4 bg-[#E6EEFB]">
          <div className="max-w-[780px] mx-auto">
            <SectionHeading pill="Dúvidas" title="Perguntas frequentes" />

            <Accordion type="single" collapsible className="mt-8 space-y-3.5">
              {FAQ_ITEMS.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* 11. RODAPÉ */}
      <footer className="bg-[#2453E0] text-white py-10 px-4">
        <div className="max-w-[1152px] mx-auto flex flex-col items-center text-center">
          <p className="font-display text-2xl sm:text-[28px] font-extrabold text-white">
            Kit +10.000 Atividades Pedagógicas
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm font-bold text-white/95">
            <span>⚡ Acesso após a confirmação</span>
            <span>🔒 Pagamento protegido</span>
            <span>🛡️ Garantia de 7 dias</span>
            <span>♾️ Acesso vitalício</span>
          </div>

          <p className="mt-4 max-w-xl text-sm font-semibold text-white/85 leading-relaxed">
            Material pedagógico digital em PDF elaborado por professoras
            especialistas para apoiar o desenvolvimento infantil do berçário ao
            5º ano em sala de aula ou em casa.
          </p>

          <nav
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-extrabold"
            aria-label="Links do rodapé"
          >
            <a
              href="#planos"
              className="underline decoration-white/60 underline-offset-4 hover:text-[#FFBD19] transition-colors"
            >
              Ver Kit Básico
            </a>
            <a
              href="#plano-premium"
              className="underline decoration-white/60 underline-offset-4 hover:text-[#FFBD19] transition-colors"
            >
              Ver Kit Premium
            </a>
            <button
              type="button"
              onClick={() => setLegalDoc("terms")}
              className="underline decoration-white/60 underline-offset-4 hover:text-[#FFBD19] transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
            <button
              type="button"
              onClick={() => setLegalDoc("privacy")}
              className="underline decoration-white/60 underline-offset-4 hover:text-[#FFBD19] transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
          </nav>

          <p className="mt-6 pt-5 border-t border-white/20 w-full max-w-xl text-xs font-bold text-white/85">
            Produto 100% digital; nenhum material físico será enviado.
          </p>
        </div>
      </footer>

      {/* POPUP DE DOWNSELL */}
      <DownsellModal
        open={downsellOpen}
        onClose={() => setDownsellOpen(false)}
      />

      {/* MODAL TERMOS / PRIVACIDADE */}
      <LegalModal docType={legalDoc} onClose={() => setLegalDoc(null)} />
    </div>
  );
}
