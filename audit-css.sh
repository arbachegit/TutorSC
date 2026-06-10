#!/usr/bin/env bash
# audit-css.sh — gate estatico de cabimento (showcase §6.2/§6.9)
# Integrar: "prebuild": "bash audit-css.sh && bash valida-skill.sh"
set -uo pipefail
CSS="app/globals.css"
FAIL=0
fail(){ echo "FAIL [$1]: $2"; FAIL=$((FAIL+1)); }

# Helper: check if a CSS rule block for a selector contains a property
# Usage: css_block_has ".selector" "property-pattern" file
css_block_has(){
  awk -v sel="$1" -v prop="$2" '
    $0 ~ sel { inside=1; block="" }
    inside { block = block " " $0; if (/\}/) { if (block ~ prop) { found=1 } inside=0 } }
    END { exit found ? 0 : 1 }
  ' "$3"
}

# ═══ 1. GLOBALS.CSS ═══

# F1: .slide-stage NÃO pode ter align-items:center (deve ser stretch)
css_block_has '\.slide-stage' 'align-items:[ ]*center' "$CSS" \
  && fail F1 ".slide-stage tem align-items:center (deve ser stretch)"

# F1b: .slide-stage DEVE ter align-items:stretch
css_block_has '\.slide-stage' 'align-items:[ ]*stretch' "$CSS" \
  || fail F1b ".slide-stage sem align-items:stretch"

# F2: .slide-content NÃO pode ter align-items:center
css_block_has '\.slide-content' 'align-items:[ ]*center' "$CSS" \
  && fail F2 ".slide-content tem align-items:center (deve ser stretch)"

# F3: classe .slide-fit NÃO deve existir (nome obsoleto)
grep -qE '\.slide-fit\b' "$CSS" 2>/dev/null \
  && fail F3 "classe .slide-fit encontrada (usar .slide-content)"

# F4: sem max-width em containers de slide
css_block_has '\.slide-content' 'max-width' "$CSS" \
  && fail F4 "max-width em container de slide (proibido)"

# F8: .slide-content DEVE ter height:100%
css_block_has '\.slide-content' 'height:.*100%' "$CSS" \
  || fail F8 ".slide-content sem height:100%"

# F9: .slide-content DEVE ter align-items:stretch
css_block_has '\.slide-content' 'align-items:[ ]*stretch' "$CSS" \
  || fail F9 ".slide-content sem align-items:stretch"

# F13: .slide-band NAO pode ter justify-content:center ou align-items:center
css_block_has '\.slide-band' 'justify-content:[ ]*center' "$CSS" \
  && fail F13 ".slide-band tem justify-content:center"
css_block_has '\.slide-band' 'align-items:[ ]*center' "$CSS" \
  && fail F13 ".slide-band tem align-items:center"

# F14: .slide-stage NÃO pode ter height:100% (deve ser flex:1; min-height:0)
css_block_has '\.slide-stage' 'height:[ ]*100%' "$CSS" \
  && fail F14 ".slide-stage tem height:100% (deve ser flex:1; min-height:0)"

# F15: clamp() obrigatorio nas faixas (nao max()) — check .slide-band padding
css_block_has '\.slide-band' 'padding.*max[(]' "$CSS" \
  && fail F15 "Usando max() em vez de clamp() no padding das faixas"

# F16: setas <= 44px
grep -qE '\.slide-nav__btn\b[^}]*(width|height):\s*(4[5-9]|[5-9][0-9]|[0-9]{3,})px' "$CSS" 2>/dev/null \
  && fail F16 "slide-nav__btn > 44px"

# F19: classe .slide-fit no SlideFrame (nome obsoleto — deve ser .slide-content)
grep -rlE 'slide-fit' components/ 2>/dev/null | grep -q . \
  && fail F19 "classe .slide-fit encontrada em componentes (usar .slide-content)"

# F22: faixas opacas existem (body::before e body::after com background)
grep -q 'body::before' "$CSS" 2>/dev/null || fail F22 "body::before ausente"
grep -q 'body::after' "$CSS" 2>/dev/null || fail F22 "body::after ausente"
grep -q '#06080d' "$CSS" 2>/dev/null || fail F22 "cor #06080d das faixas ausente"

# F18: .slide-content NÃO pode ter overflow:hidden (mascara scrollHeight → corte)
css_block_has '\.slide-content' 'overflow:[ ]*hidden' "$CSS" \
  && fail F18 ".slide-content tem overflow:hidden (mascara scrollHeight — §6.11)"

# F18b: .slide-stage DEVE ter overflow:hidden (clip no limite do palco)
css_block_has '\.slide-stage' 'overflow:[ ]*hidden' "$CSS" \
  || fail F18 ".slide-stage sem overflow:hidden (§6.11)"

# F20: font-size < 12px em classes de slide (exclui secção .pdf-* — escala A4 print)
F20_HITS=$(awk '/\.pdf-doc|DOCUMENTO PDF/{pdf=1} !pdf && /font-size:[ ]*([0-9]|1[01])(\.[0-9]+)?px/' "$CSS" \
  | grep -vE 'slide-counter|slide-foot__legal|slide-head__kicker' || true)
[ -n "$F20_HITS" ] && fail F20 "font-size < 12px em slide (§6.13): $(echo "$F20_HITS" | head -3 | tr '\n' ' ')"

# F11 (CSS): max-width em pixel em classes de act (.ait-*) — só ch é permitido em texto
F11_HITS=$(awk '/\.pdf-doc|DOCUMENTO PDF/{pdf=1} !pdf && /max-width:[ ]*[0-9]+px[ ]*;/' "$CSS" \
  | grep -vE 'slide-head|slide-foot|reading-panel' || true)
[ -n "$F11_HITS" ] && fail F11 "max-width em px em visual de act (§6.10): $(echo "$F11_HITS" | head -3 | tr '\n' ' ')"

# ═══ 2. TSX (componentes) ═══

# F5: max-w-grid PROIBIDO em wrappers de slide
SHELL_FILES=$(grep -rlE 'Shell|slide-content|slide-stage' app/ components/ 2>/dev/null || true)
for f in $SHELL_FILES; do
  grep -qE 'max-w-grid' "$f" 2>/dev/null \
    && fail F5 "$f: max-w-grid em wrapper de slide"
done

# F7: UPCAP deve ser 1.0
FRAME_FILES=$(grep -rlE 'UPCAP' components/ 2>/dev/null || true)
for f in $FRAME_FILES; do
  grep -qE 'UPCAP\s*=\s*1\.0' "$f" 2>/dev/null \
    || fail F7 "$f: UPCAP != 1.0 (proibido ampliar)"
done

# F10: offsetWidth/offsetHeight PROIBIDO no fit()
FRAME_FILES2=$(grep -rlE 'SlideFrame|function fit|const fit' components/ 2>/dev/null || true)
for f in $FRAME_FILES2; do
  grep -qE 'offset(Width|Height)' "$f" 2>/dev/null \
    && fail F10 "$f: offsetWidth/Height no fit() (usar scrollWidth/Height)"
done

# F6: items-center PROIBIDO em Shell de slide
SHELL_DEF=$(grep -rlE 'function Shell|const Shell' components/ 2>/dev/null || true)
for f in $SHELL_DEF; do
  grep -qE 'items-center' "$f" 2>/dev/null \
    && fail F6 "$f: Shell com items-center (usar items-stretch)"
done

# F11 (TSX): max-w-[Npx] PROIBIDO em visuais (só max-w-[Nch] em texto)
grep -rnE 'max-w-\[[0-9]+px\]' app/ components/ --include='*.tsx' 2>/dev/null | grep -v 'pdf' | grep -q . \
  && fail F11 "max-w-[Npx] em TSX de act (§6.10)"

# F18 (TSX): overflow-hidden PROIBIDO em wrappers de act (mascara scrollHeight)
grep -rnE 'overflow-hidden' app/page.tsx components/ --include='*.tsx' 2>/dev/null | grep -v 'pdf' | grep -q . \
  && fail F18 "overflow-hidden em TSX de act (§6.11)"

# F25: fit() DEVE usar o truque height:auto antes de medir scrollHeight (§6.18)
FIT_FILES=$(grep -rlE 'UPCAP' components/ 2>/dev/null || true)
for f in $FIT_FILES; do
  grep -qE "style\.height *= *['\"]auto['\"]" "$f" 2>/dev/null \
    || fail F25 "$f: fit() sem content.style.height='auto' antes de medir (§6.18)"
done

# F26: min-h-[Npx] PROIBIDO em container visual (usar flex-1 min-h-0)
grep -rnE 'min-h-\[[0-9]+px\]' app/ components/ --include='*.tsx' 2>/dev/null | grep -v 'pdf' | grep -q . \
  && fail F26 "min-h-[Npx] em container visual (usar flex-1 min-h-0 — §6.6)"

# ═══ RESULTADO ═══
if [ $FAIL -eq 0 ]; then
  echo "audit-css: OK (0 falhas)"
  exit 0
else
  echo "audit-css: $FAIL FALHA(S) — build bloqueado"
  exit 1
fi
