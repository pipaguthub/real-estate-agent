function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
}

export interface WorksheetConfig {
  id: number;
  gradeTag: string;
  title: string;
  instruction: string;
  accent: string;
  secondary: string;
  kind:
    | "trace"
    | "vowels"
    | "numbers"
    | "shapes"
    | "syllables"
    | "addition"
    | "maze"
    | "coloring"
    | "english"
    | "sensory"
    | "cursive"
    | "reading";
  items: string[];
}

export function generateWorksheetSvgUri(config: WorksheetConfig): string {
  const { gradeTag, title, instruction, accent, secondary, kind, items } = config;

  let bodySvg = "";

  if (kind === "trace") {
    bodySvg = `
      <g transform="translate(55, 220)">
        <rect x="0" y="0" width="490" height="500" rx="20" fill="#FFFDF7" stroke="#E2E8F0" stroke-width="2"/>
        <circle cx="52" cy="70" r="24" fill="${accent}" opacity="0.2"/>
        <text x="52" y="78" text-anchor="middle" font-size="22" font-weight="800" fill="${accent}">1</text>
        <path d="M 95 70 Q 155 25 215 70 T 335 70 T 455 70" fill="none" stroke="${accent}" stroke-width="5" stroke-dasharray="10 10" stroke-linecap="round"/>
        <circle cx="52" cy="175" r="24" fill="${secondary}" opacity="0.2"/>
        <text x="52" y="183" text-anchor="middle" font-size="22" font-weight="800" fill="${secondary}">2</text>
        <path d="M 95 195 L 155 150 L 215 195 L 275 150 L 335 195 L 395 150 L 455 195" fill="none" stroke="${secondary}" stroke-width="5" stroke-dasharray="10 10" stroke-linecap="round"/>
        <circle cx="52" cy="285" r="24" fill="#F97316" opacity="0.2"/>
        <text x="52" y="293" text-anchor="middle" font-size="22" font-weight="800" fill="#F97316">3</text>
        <path d="M 95 285 C 125 235, 165 235, 195 285 C 225 335, 265 335, 295 285 C 325 235, 365 235, 395 285 L 455 285" fill="none" stroke="#F97316" stroke-width="5" stroke-dasharray="10 10" stroke-linecap="round"/>
        <circle cx="52" cy="400" r="24" fill="#11C526" opacity="0.2"/>
        <text x="52" y="408" text-anchor="middle" font-size="22" font-weight="800" fill="#11C526">4</text>
        <rect x="110" y="365" width="75" height="75" rx="14" fill="none" stroke="#11C526" stroke-width="4" stroke-dasharray="8 8"/>
        <circle cx="265" cy="402" r="38" fill="none" stroke="${accent}" stroke-width="4" stroke-dasharray="8 8"/>
        <polygon points="390,364 432,440 348,440" fill="none" stroke="#F97316" stroke-width="4" stroke-dasharray="8 8"/>
      </g>
    `;
  } else if (kind === "vowels" || kind === "syllables") {
    const cards = items.slice(0, 4).map((label, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 55 + col * 255;
      const y = 215 + row * 255;
      const colors = ["#2453E0", "#F97316", "#2EB85C", "#E0262F"];
      const c = colors[idx % colors.length];
      return `
        <g transform="translate(${x}, ${y})">
          <rect width="235" height="230" rx="22" fill="#FFFFFF" stroke="${c}" stroke-width="3"/>
          <rect x="16" y="16" width="203" height="90" rx="16" fill="${c}" opacity="0.12"/>
          <text x="117" y="80" text-anchor="middle" font-size="48" font-weight="800" fill="${c}">${label}</text>
          <line x1="28" y1="155" x2="207" y2="155" stroke="#CBD5E1" stroke-width="3" stroke-dasharray="7 6"/>
          <text x="117" y="148" text-anchor="middle" font-size="28" font-weight="800" fill="#94A3B8" letter-spacing="8">${label}  ${label}</text>
          <line x1="28" y1="202" x2="207" y2="202" stroke="#94A3B8" stroke-width="2"/>
        </g>
      `;
    });
    bodySvg = cards.join("");
  } else if (kind === "numbers" || kind === "addition") {
    const rows = items.slice(0, 4).map((expr, idx) => {
      const y = 225 + idx * 125;
      const dotCount = (idx % 4) + 2;
      const dots = Array.from({ length: dotCount })
        .map(
          (_, dIdx) =>
            `<circle cx="${90 + dIdx * 34}" cy="${y + 52}" r="12" fill="${
              idx % 2 === 0 ? accent : secondary
            }"/>`
        )
        .join("");
      return `
        <g>
          <rect x="55" y="${y}" width="490" height="102" rx="18" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2.5"/>
          ${dots}
          <text x="315" y="${y + 61}" font-size="30" font-weight="800" fill="#1B2347">${expr}</text>
          <rect x="448" y="${y + 21}" width="72" height="60" rx="14" fill="#FFF8D9" stroke="#FFBD19" stroke-width="3" stroke-dasharray="6 4"/>
        </g>
      `;
    });
    bodySvg = rows.join("");
  } else if (kind === "shapes" || kind === "coloring") {
    bodySvg = `
      <g transform="translate(55, 220)">
        <rect x="0" y="0" width="232" height="235" rx="22" fill="#FFFFFF" stroke="${accent}" stroke-width="3"/>
        <circle cx="116" cy="95" r="56" fill="${accent}" opacity="0.18" stroke="${accent}" stroke-width="4" stroke-dasharray="8 6"/>
        <text x="116" y="198" text-anchor="middle" font-size="22" font-weight="800" fill="#1B2347">${items[0] || "Círculo"}</text>

        <rect x="258" y="0" width="232" height="235" rx="22" fill="#FFFFFF" stroke="#2EB85C" stroke-width="3"/>
        <rect x="322" y="42" width="104" height="104" rx="10" fill="#2EB85C" opacity="0.18" stroke="#2EB85C" stroke-width="4" stroke-dasharray="8 6"/>
        <text x="374" y="198" text-anchor="middle" font-size="22" font-weight="800" fill="#1B2347">${items[1] || "Quadrado"}</text>

        <rect x="0" y="255" width="232" height="235" rx="22" fill="#FFFFFF" stroke="#F97316" stroke-width="3"/>
        <polygon points="116,292 174,394 58,394" fill="#F97316" opacity="0.18" stroke="#F97316" stroke-width="4" stroke-dasharray="8 6"/>
        <text x="116" y="452" text-anchor="middle" font-size="22" font-weight="800" fill="#1B2347">${items[2] || "Triângulo"}</text>

        <rect x="258" y="255" width="232" height="235" rx="22" fill="#FFFFFF" stroke="#2453E0" stroke-width="3"/>
        <polygon points="374,290 390,330 434,334 401,362 411,405 374,382 337,405 347,362 314,334 358,330" fill="#FFBD19" opacity="0.32" stroke="#F97316" stroke-width="3.5"/>
        <text x="374" y="452" text-anchor="middle" font-size="22" font-weight="800" fill="#1B2347">${items[3] || "Estrela"}</text>
      </g>
    `;
  } else if (kind === "maze" || kind === "sensory") {
    bodySvg = `
      <g transform="translate(55, 220)">
        <rect x="0" y="0" width="490" height="500" rx="24" fill="#FFFFFF" stroke="${accent}" stroke-width="3"/>
        <circle cx="70" cy="70" r="34" fill="#2EB85C" opacity="0.2" stroke="#2EB85C" stroke-width="3"/>
        <text x="70" y="77" text-anchor="middle" font-size="18" font-weight="800" fill="#2EB85C">INÍCIO</text>
        <path d="M 110 70 H 410 V 175 H 120 V 290 H 400 V 420" fill="none" stroke="#E2E8F0" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 110 70 H 410 V 175 H 120 V 290 H 400 V 385" fill="none" stroke="${accent}" stroke-width="5" stroke-dasharray="10 10" stroke-linecap="round"/>
        <rect x="335" y="395" width="130" height="65" rx="18" fill="#FFBD19" opacity="0.28" stroke="#FFBD19" stroke-width="3"/>
        <text x="400" y="434" text-anchor="middle" font-size="18" font-weight="800" fill="#1B2347">${items[0] || "CHEGADA!"}</text>
        <text x="245" y="472" text-anchor="middle" font-size="16" font-weight="700" fill="#64748B">${items[1] || "Atenção, foco e percepção visual"}</text>
      </g>
    `;
  } else {
    // english, cursive, reading
    const lines = items.slice(0, 4).map((text, idx) => {
      const y = 225 + idx * 124;
      return `
        <g>
          <rect x="55" y="${y}" width="490" height="102" rx="18" fill="#FFFFFF" stroke="${accent}" stroke-width="2.5"/>
          <rect x="75" y="${y + 21}" width="60" height="60" rx="14" fill="${secondary}" opacity="0.16"/>
          <text x="105" y="${y + 60}" text-anchor="middle" font-size="24" font-weight="800" fill="${secondary}">${idx + 1}</text>
          <text x="155" y="${y + 46}" font-size="22" font-weight="800" fill="#1B2347">${text}</text>
          <line x1="155" y1="${y + 78}" x2="515" y2="${y + 78}" stroke="#CBD5E1" stroke-width="2.5" stroke-dasharray="7 5"/>
        </g>
      `;
    });
    bodySvg = lines.join("");
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 780" width="600" height="780">
      <rect width="600" height="780" rx="28" fill="#FFFCF2"/>
      <rect x="18" y="18" width="564" height="744" rx="22" fill="#FFFFFF" stroke="${accent}" stroke-width="4"/>
      <rect x="36" y="36" width="528" height="150" rx="18" fill="#E6EEFB"/>
      <rect x="54" y="52" width="180" height="28" rx="14" fill="${accent}"/>
      <text x="144" y="71" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">${gradeTag}</text>
      <text x="54" y="114" font-family="Nunito, Arial, sans-serif" font-size="14" font-weight="700" fill="#475569">Nome: ___________________________  Data: ___/___</text>
      <text x="300" y="152" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="25" font-weight="800" fill="#1B2347">${title}</text>
      <text x="300" y="177" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="14" font-weight="700" fill="#2453E0">${instruction}</text>
      ${bodySvg}
      <text x="300" y="746" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="12" font-weight="700" fill="#94A3B8">Kit +10.000 Atividades Pedagógicas · Alinhado à BNCC</text>
    </svg>
  `;

  return svgToDataUri(svg);
}

export interface BonusCoverConfig {
  badge: string;
  title: string;
  subtitle: string;
  bg: string;
  accent: string;
  pages: string;
}

export function generateBonusCoverSvgUri(cfg: BonusCoverConfig): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 440" width="360" height="440">
      <rect width="360" height="440" rx="24" fill="${cfg.bg}"/>
      <rect x="16" y="16" width="328" height="408" rx="18" fill="#FFFFFF" stroke="${cfg.accent}" stroke-width="4"/>
      <rect x="16" y="16" width="328" height="118" rx="18" fill="${cfg.accent}"/>
      <rect x="16" y="106" width="328" height="28" fill="${cfg.accent}"/>
      <text x="180" y="64" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">${cfg.badge}</text>
      <text x="180" y="98" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF">APOSTILA BÔNUS</text>
      <circle cx="180" cy="210" r="54" fill="${cfg.bg}" stroke="${cfg.accent}" stroke-width="3" stroke-dasharray="8 6"/>
      <text x="180" y="218" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="26" font-weight="800" fill="${cfg.accent}">PDF</text>
      <text x="180" y="302" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="19" font-weight="800" fill="#1B2347">${cfg.title}</text>
      <text x="180" y="332" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="14" font-weight="700" fill="#475569">${cfg.subtitle}</text>
      <rect x="85" y="362" width="190" height="36" rx="18" fill="#E6EEFB"/>
      <text x="180" y="385" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="13" font-weight="800" fill="#2453E0">${cfg.pages} · Pronto p/ Imprimir</text>
    </svg>
  `;
  return svgToDataUri(svg);
}

export interface TestimonialShotConfig {
  name: string;
  role: string;
  time: string;
  line1: string;
  line2: string;
  line3: string;
  reply: string;
  avatarBg: string;
  initials: string;
}

export function generateTestimonialSvgUri(t: TestimonialShotConfig): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="600" height="420">
      <rect width="600" height="420" rx="28" fill="#EFEAE2"/>
      <rect width="600" height="82" rx="28" fill="#075E54"/>
      <rect y="54" width="600" height="28" fill="#075E54"/>
      <circle cx="58" cy="42" r="24" fill="${t.avatarBg}"/>
      <text x="58" y="49" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="18" font-weight="800" fill="#FFFFFF">${t.initials}</text>
      <text x="98" y="37" font-family="Nunito, Arial, sans-serif" font-size="18" font-weight="800" fill="#FFFFFF">${t.name}</text>
      <text x="98" y="59" font-family="Nunito, Arial, sans-serif" font-size="13" font-weight="600" fill="#D1FAE5">${t.role}</text>

      <rect x="30" y="108" width="490" height="176" rx="18" fill="#FFFFFF"/>
      <text x="52" y="144" font-family="Nunito, Arial, sans-serif" font-size="18" font-weight="700" fill="#1E293B">${t.line1}</text>
      <text x="52" y="176" font-family="Nunito, Arial, sans-serif" font-size="18" font-weight="700" fill="#1E293B">${t.line2}</text>
      <text x="52" y="208" font-family="Nunito, Arial, sans-serif" font-size="18" font-weight="700" fill="#1E293B">${t.line3}</text>
      <text x="52" y="246" font-family="Nunito, Arial, sans-serif" font-size="16" font-weight="800" fill="#F59E0B">★★★★★</text>
      <text x="498" y="264" text-anchor="end" font-family="Nunito, Arial, sans-serif" font-size="13" font-weight="700" fill="#64748B">${t.time}</text>

      <rect x="145" y="308" width="425" height="78" rx="18" fill="#D9FDD3"/>
      <text x="168" y="346" font-family="Nunito, Arial, sans-serif" font-size="17" font-weight="700" fill="#1E293B">${t.reply}</text>
      <text x="548" y="372" text-anchor="end" font-family="Nunito, Arial, sans-serif" font-size="13" font-weight="700" fill="#0284C7">${t.time} ✓✓</text>
    </svg>
  `;
  return svgToDataUri(svg);
}
