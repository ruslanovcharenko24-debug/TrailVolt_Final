# Product Page Add-to-Cart Oversized Icon — Diagnostic Report

*Generated: 2026-04-13. Branch: `fix/product-page-oversized-icons`.*

---

## 1. Branch checked

- **Current branch:** `fix/product-page-oversized-icons`
- **CSS file in use:** `assets/css/main.css` — the only stylesheet linked in `product.html` (line 41). Single stylesheet confirmed; no inline `<style>` blocks.

---

## 2. Broken section located

**File:** `product.html`
**Section:** STEP 4 — Review & Add to Cart → Add-to-Cart button (`.btn-add-cart`)
**Lines:** 321–328 (section wrapper), 322–328 (button), **323** (the SVG icon)

This is the shopping bag SVG inside the "Add to Cart" button. The button is visible only when the user navigates to step 4 (step 4 is `display: none` by default; becomes `display: block` when JavaScript adds `.active` to its `.config-step-v2` wrapper).

**Exact class/nesting structure:**

```
<div class="config-step-v2" [.active when step 4 is shown]>        ← .config-step-v2: display:none → block
  <h2>Review Your Build</h2>
  <div id="build-review">...</div>                                  ← JS-rendered text rows, no SVG

  <div class="add-to-cart-section">                                 ← flex, column
    <button class="btn-add-cart" id="add-to-cart-btn">             ← display:flex; align-items:center;
                                                                         justify-content:center; width:100%
      <svg viewBox="0 0 24 24" ...                                  ← THE OVERSIZED ICON
           style="width:18px;height:18px;"                          ← ONLY size constraint (inline CSS)
           aria-hidden="true">                                       ← no width/height HTML attributes
        <path d="M6 2L3 6v14a2 2 0 002 2h14 ..."/>                 ← shopping bag / storefront path
      </svg>
      <span>Add to Cart</span>
      <span class="btn-add-cart__price">·&nbsp;€159</span>
    </button>

    <div class="trust-badges">                                       ← trust badge row (properly sized
      <div class="trust-badge">...</div>                                by .trust-badges .trust-badge svg)
      ...
    </div>
  </div>

  <div class="config-step-nav">                                     ← "Edit Modules" back button
    <button class="btn btn--ghost-dark" data-prev-step="3">
      <svg ... style="width:14px;height:14px;...">                  ← arrow, inline-sized
```

**Classes involved:**
- `.config-step-v2` — step container (hidden by default)
- `.add-to-cart-section` — flex column wrapper
- `.btn-add-cart` — the add-to-cart button (display: flex)
- The SVG itself has **no class** — only inline `style="width:18px;height:18px;"`

---

## 3. CSS rules affecting the icon/block

### 3a. Rules that apply to the `.btn-add-cart` SVG (line 323)

| Selector | File | Approx. line | What it does | Status |
|---|---|---|---|---|
| `img, video, svg { display: block; max-width: 100%; }` | `main.css` | 118 | Sets `display: block` on all SVGs; caps width at 100% of containing block | **ACTIVE** — changes SVG from inline-replaced to block-level |
| SVG inline `style="width:18px;height:18px;"` | `product.html` | 323 | The only explicit dimension constraint | **Intended** but **VULNERABLE** — see §4 |
| `.btn-add-cart { display:flex; align-items:center; justify-content:center; width:100%; ... }` | `main.css` | 4407 | Button is full-width flex container centered | **ACTIVE** — context for SVG |
| `.add-to-cart-section { display:flex; flex-direction:column; gap:var(--space-4); }` | `main.css` | 4401 | Column flex wrapper | **ACTIVE** |

**No `.btn-add-cart svg` rule exists anywhere in `main.css`.** There is no CSS class-based rule that provides a fallback size for this SVG.

### 3b. Rules that do NOT apply (confirmed absent)

| Selector checked | Result |
|---|---|
| `.btn svg` | Does not exist in `main.css` |
| `button svg` | Does not exist in `main.css` |
| `.trust-badge svg` | Existed before the fix but was scoped to `.trust-badges .trust-badge svg` — never targeted `.btn-add-cart` in either form |
| Any selector containing `add-to-cart`, `btn-add-cart`, `cart-icon`, `shopping` | None exist |
| `!important` rules affecting SVG width/height | None — only `transform: none !important` (line 667) and display utilities (lines 4849–4850) |

### 3c. Global SVG reset — interaction analysis

```css
/* main.css line 118 */
img, video, svg {
  display: block;
  max-width: 100%;
}
```

- **`display: block`**: Changes the SVG from an inline-replaced element to a block-level box. Inside `.btn-add-cart` (flex row), the SVG becomes a block-level flex item. This is the critical change that makes the SVG's sizing behavior depend on explicit constraints.
- **`max-width: 100%`**: Caps the SVG at 100% of the containing flex container (the button). The button is `width: 100%` of the config panel — typically 350–600px on desktop. `max-width: 100%` does NOT expand the SVG; it only caps it. BUT: when the SVG has no explicit width (see §4), `max-width: 100%` means the SVG CAN expand up to the full button width.

### 3d. Content Security Policy interaction — critical

```html
<!-- product.html line 5 -->
<meta http-equiv="Content-Security-Policy"
  content="...style-src 'self' https://fonts.googleapis.com;..."/>
```

The `style-src` directive includes `'self'` and Google Fonts but **does NOT include `'unsafe-inline'`**. Per the CSP Level 2 specification, `style-src` without `'unsafe-inline'` blocks **inline `style=""` attributes** on HTML elements, not only `<style>` blocks.

This means the SVG's `style="width:18px;height:18px;"` attribute is **blocked by the page's own CSP** when the browser enforces it.

When the inline style is blocked:
- `width: 18px` is not applied
- `height: 18px` is not applied
- The SVG is a block-level element (`display: block` from the global reset) with no explicit CSS dimensions
- `max-width: 100%` allows it to expand up to the button's width
- A block-level inline SVG with no explicit width defaults to filling the available container width
- For `viewBox="0 0 24 24"` (1:1 aspect ratio), a 400px-wide button would produce an ~400×400px SVG — **taking over a large portion of the page**

---

## 4. Actual root cause

**The `btn-add-cart` shopping bag SVG (product.html line 323) has no `width`/`height` HTML presentation attributes and no CSS class-based sizing rule. Its only size constraint is the inline CSS `style="width:18px;height:18px;"`, which is blocked by the page's own Content Security Policy meta tag.**

The page's meta CSP (`style-src 'self'` without `'unsafe-inline'`) blocks inline `style=""` attributes when enforced. With the inline style blocked, the SVG:
1. Has `display: block` from the global reset — making it behave like a block box
2. Has `max-width: 100%` from the global reset — allowing it to expand to the full container width
3. Has NO explicit `width` or `height` from any other source
4. Has `viewBox="0 0 24 24"` (1:1 ratio) — the SVG will render square at whatever width it is given

Result: the SVG expands to fill the full width of the button (which is `width: 100%` of the config panel), producing a large square icon — potentially 400–600px on desktop viewports. This is what the user sees as "taking over a large portion of the page."

**Secondary vulnerability (browser rendering):** Even without CSP enforcement, inline-only SVG sizing is fragile. An SVG with `display: block`, no HTML `width`/`height` attributes, and no CSS class rule is dependent on exactly one rendering layer (the inline style). This is structurally weaker than the fixed trust bar SVGs which now have: HTML attributes + inline CSS + CSS class rule (three independent constraints).

---

## 5. Is this related to the previous trust-icon bug?

**Yes — same family of root causes, different component.**

| Trust bar SVGs (previous bug, now fixed) | btn-add-cart SVG (current bug) |
|---|---|
| No `width`/`height` HTML attrs | No `width`/`height` HTML attrs ← same |
| No CSS class rule for SVG sizing | No CSS class rule for SVG sizing ← same |
| Only inline CSS style for size | Only inline CSS style for size ← same |
| Fixed: added HTML attrs + CSS class rule | NOT fixed yet |
| Parent container had no class hook | Parent button `.btn-add-cart` does exist but has no `svg` sub-rule |

The structural root cause is identical: the SVG has no sizing anchor at the HTML presentation attribute layer, and no CSS class rule provides a fallback. Both bugs are in the same risk category described in section §3c of the previous diagnostic: *"SVGs with only CSS-set dimensions (not HTML presentation attributes) and `display: block` can revert to their intrinsic/default size in certain browser rendering paths."*

The difference: the trust bar bug was exposed by the lack of responsive layout handling. The add-to-cart bug is exposed by the CSP blocking the inline style.

---

## 6. Minimal safe fix strategy

**Do not implement — description only.**

**Step 1 — Add HTML presentation attributes to the `btn-add-cart` SVG in `product.html` (line 323):**

```html
<!-- Before -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
     stroke-linecap="round" stroke-linejoin="round"
     style="width:18px;height:18px;" aria-hidden="true">

<!-- After -->
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
     style="width:18px;height:18px;" aria-hidden="true">
```

HTML `width`/`height` presentation attributes are NOT inline CSS — they are not affected by `style-src` CSP. They provide sizing even when the CSP blocks the inline `style=""`.

**Step 2 — Add a CSS class rule for `.btn-add-cart svg` in `main.css`:**

Insert near the existing `.btn-add-cart` block (around line 4424):

```css
.btn-add-cart svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
```

This provides a CSS-layer anchor that is immune to the inline-style CSP block, and ensures the icon is explicitly constrained even if the inline style or HTML attribute layer is somehow absent.

After the fix, the SVG will have three independent size constraints:
1. HTML presentation attribute `width="18" height="18"` — immune to CSP
2. CSS class rule `.btn-add-cart svg { width: 18px; height: 18px; }` — loaded from stylesheet, allowed by `style-src 'self'`
3. Inline style `style="width:18px;height:18px;"` — highest specificity when not blocked

---

## 7. Files that would likely need changes

| File | Change type |
|---|---|
| `product.html` | Add `width="18" height="18"` HTML attributes to the SVG at line 323 (inside `.btn-add-cart`) |
| `assets/css/main.css` | Add `.btn-add-cart svg { width: 18px; height: 18px; flex-shrink: 0; }` rule near line 4424 |

No changes needed to `assets/js/product.js`, `assets/js/main.js`, or `assets/js/cart.js`.

---

## 8. Risk assessment

| Risk | Likelihood | Mitigation |
|---|---|---|
| Adding `width="18" height="18"` HTML attrs conflicts with inline `style="width:18px;height:18px;"` | No conflict — CSS inline style overrides HTML presentation attributes; both specify the same value | None needed |
| Adding `.btn-add-cart svg` CSS rule overrides something downstream | Very low — no other rule targets `.btn-add-cart svg`; the rule only sets width, height, flex-shrink to the same values as the inline style | Verify no override in the full cascade |
| The fix changes the visual size of the icon | No — all three layers specify the same 18×18px value | Not applicable |
| Fixing this exposes OTHER inline-sized SVGs that are also CSP-blocked | Possible — there are other SVGs in product.html that rely on inline `style=""` for sizing (step-nav arrow SVGs at lines 245, 266, 273, 296, 303, 349). These are small arrows (14–16px) and may also be affected by the CSP, but are less visually prominent than the full-width shopping bag | Out of scope for this fix; evaluate separately |
| The `.btn-add-cart svg` class rule could also affect the step-nav or trust-badge areas | No — `.btn-add-cart svg` is precisely scoped to SVGs directly inside `.btn-add-cart`; step-nav buttons use `.btn.btn--ghost-dark`, and trust badges use `.trust-badge` — neither matches `.btn-add-cart` | No action needed |
| The fix is applied to the wrong SVG | Low — there is only ONE SVG inside `.btn-add-cart`, at line 323 | Confirm by line number |

---

## Appendix: State after previous fixes (for context)

The current branch diff changed:
1. `.trust-badge svg` → `.trust-badges .trust-badge svg` (scoped to product page step-4 badges)
2. Added `.product-trust-bar__grid` class + responsive rules (fixed trust bar layout)
3. Added `width="20" height="20"` to 4 trust bar SVGs (fixed trust bar SVG sizing)
4. `.trust-badge` → `.trust-strip .trust-badge` (scoped to shop.html trust strip)

**None of these changes address the `.btn-add-cart` SVG.** The add-to-cart icon was not touched by the previous fix. The root cause is a pre-existing sizing gap — same pattern as the trust bar (HTML attributes missing, no CSS class rule, inline-only), with the added dimension that the page's own CSP meta tag blocks the inline style.
