import { useEffect } from "react";
import { X } from "lucide-react";

export type LegalDocType = "terms" | "privacy" | null;

interface LegalModalProps {
  docType: LegalDocType;
  onClose: () => void;
}

export function LegalModal({ docType, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!docType) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [docType, onClose]);

  if (!docType) return null;

  const isTerms = docType === "terms";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(10, 22, 64, 0.78)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl border-2 border-[#E6EEFB]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar documento"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F5F9] text-[#1B2347] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <h3
          id="legal-modal-title"
          className="font-display text-2xl font-extrabold text-[#1B2347] pr-10"
        >
          {isTerms ? "Termos de Uso" : "Política de Privacidade"}
        </h3>

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#4B5578] font-semibold">
          {isTerms ? (
            <>
              <p>
                Ao adquirir o Kit +10.000 Atividades Pedagógicas (ou Kit
                Premium), você recebe uma licença pessoal e intransferível para
                uso doméstico e em sala de aula com seus alunos ou filhos.
              </p>
              <p>
                É permitida a impressão ilimitada das folhas em PDF para fins
                educativos. Não é permitida a revenda, distribuição comercial ou
                compartilhamento público dos arquivos digitais originais.
              </p>
              <p>
                O produto é 100% digital e conta com garantia incondicional de 7
                dias corridos a partir da confirmação da compra.
              </p>
            </>
          ) : (
            <>
              <p>
                Seus dados informados no momento da compra (nome, e-mail e
                telefone) são utilizados exclusivamente para o envio imediato do
                seu acesso aos arquivos em PDF e suporte ao cliente.
              </p>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações
                pessoais com terceiros para fins publicitários. Todas as
                transações financeiras ocorrem em ambiente criptografado SSL.
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-[#2453E0] hover:bg-[#1840DC] py-3 px-6 text-sm font-extrabold uppercase text-white transition-colors cursor-pointer"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
