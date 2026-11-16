import { useEffect } from "react";
import { Check, Lock, Sparkles, X } from "lucide-react";
import { CHECKOUT_LINKS, buildCheckoutUrl } from "@/src/utils/utm";

interface DownsellModalProps {
  open: boolean;
  onClose: () => void;
}

const DOWNSELL_HIGHLIGHTS = [
  "+15.000 atividades do berçário ao 5º ano",
  "Todas as 6 apostilas bônus inclusas",
  "Inglês Infantil + atividades adaptadas Autismo/TDAH",
  "Acesso vitalício com atualizações gratuitas",
  "Garantia incondicional de 7 dias",
];

export function DownsellModal({ open, onClose }: DownsellModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const downsellCheckoutUrl = buildCheckoutUrl(CHECKOUT_LINKS.premiumDownsell);
  const basicCheckoutUrl = buildCheckoutUrl(CHECKOUT_LINKS.basic);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: "rgba(10, 22, 64, 0.78)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="downsell-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[500px] rounded-[32px] sm:rounded-[40px] bg-white p-6 sm:p-8 shadow-[0_28px_70px_rgba(10,22,64,0.45)] border-4 border-[#FFBD19] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar oferta especial"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F5F9] text-[#1B2347] hover:bg-[#E2E8F0] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2453E0]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0E5] border border-[#F97316]/40 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#F97316]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Espere! Oferta liberada</span>
          </span>

          <h3
            id="downsell-modal-title"
            className="mt-3 font-display text-[26px] sm:text-[32px] leading-[1.15] font-extrabold text-[#1B2347] text-balance"
          >
            Leve o Premium completo por apenas R$ 17,90
          </h3>

          <p className="mt-2 text-sm sm:text-base font-bold text-[#4B5578]">
            Uma condição especial disponível somente agora.
          </p>

          <div className="mt-4 rounded-[20px] bg-[#FBF6E3] border border-[#FFBD19] py-3.5 px-4">
            <p className="text-sm sm:text-base font-extrabold text-[#E0262F] line-through tabular-nums">
              Preço normal: R$ 27,00
            </p>
            <p className="font-display text-[38px] sm:text-[44px] leading-none font-extrabold text-[#2EB85C] mt-1 tabular-nums">
              R$ 17,90
            </p>
            <p className="text-xs font-bold text-[#4B5578] mt-1">
              Economize R$ 9,10 levando tudo do Premium!
            </p>
          </div>
        </div>

        <ul className="mt-5 space-y-2.5">
          {DOWNSELL_HIGHLIGHTS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm sm:text-[15px] font-bold text-[#1B2347]"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2EB85C] text-white">
                <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col items-center gap-4">
          <a
            href={downsellCheckoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-[#11C526] hover:bg-[#0FB122] px-6 py-4 text-center font-display text-[18px] sm:text-[20px] font-extrabold uppercase tracking-wide text-white transition-transform active:translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFBD19]"
            style={{ boxShadow: "0 7px 0 #0B9821" }}
          >
            Sim! Quero aproveitar por R$ 17,90
          </a>

          <a
            href={basicCheckoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-sm font-bold text-[#64748B] underline decoration-[#94A3B8] underline-offset-4 hover:text-[#1B2347] transition-colors py-1"
          >
            Não, obrigado. Quero continuar com apenas o Básico por R$ 10,00
          </a>
        </div>

        <p className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-center gap-1.5 text-xs font-bold text-[#64748B] text-center">
          <Lock className="h-3.5 w-3.5 shrink-0 text-[#2EB85C]" aria-hidden="true" />
          <span>Compra segura · Acesso digital após a confirmação</span>
        </p>
      </div>
    </div>
  );
}
