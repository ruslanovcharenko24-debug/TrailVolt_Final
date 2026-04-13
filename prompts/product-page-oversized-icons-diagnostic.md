# Product Page Oversized SVG Bug — Diagnostic Report

*Generated: 2026-04-13. Branch: `fix/product-page-oversized-icons`.*

---

## 1. Branch checked

- **Current branch:** `fix/product-page-oversized-icons`
- **CSS file in use:** `assets/css/main.css` — the only stylesheet linked in `product.html` (line 41: `<link rel="stylesheet" href="assets/css/main.css" />`). No inline `<style>` blocks exist anywhere in `product.html`. Single CSS file confirmed.

---

## 2. Broken section located

**File:** `product.html`
**Section:** TRUST BAR — static `<section>` immediately below `.product-layout-v2`, lines 363–409.

This section contains **all four reported icons**:
- Truck (shipping) — line 369
- Shield (warranty) — line 379
- Return arrow (returns) — line 389
- Question mark (support) — line 399

This is the ONLY section on the page that contains all four icons simultaneously visible on page load. The Step-4 trust badges (lines 332–344) contain only 3 icons — truck, shield, return — and the question mark **does not appear there**. Step-4 content is hidden (`display: none`) until the user manually navigates to step 4 via JavaScript.

**Class names involved in the trust bar section:** NONE — the entire trust bar uses only inline `style=""` attributes. The only named class present is `container` on the inner div.

**HTML nesting structure:**

```
<section style="background:var(--color-glacier); ... ">            ← no class
  <div class="container">                                           ← .container only
    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-4);">  ← no class
      <div style="display:flex; align-items:center; gap:var(--space-4);">                  ← no class
        <div style="width:44px; height:44px; ... display:flex; align-items:center;
                    justify-content:center; flex-shrink:0;">                               ← no class
          <svg viewBox="0 0 24 24" ...
               style="width:20px; height:20px;" aria-hidden="true">                       ← NO HTML width/height attrs
            ...path data...
          </svg>
        </div>
        <div>
          <div style="...">Free Shipping</div>
          <div style="...">All EU & UK orders</div>
        </div>
      </div>
      ... (×3 more columns, identical structure)
    </div>
  </div>
</section>
```

**Critical observations:**
1. SVGs have `viewBox="0 0 24 24"` but **no `width` or `height` HTML attributes** — only CSS inline `style="width:20px;height:20px;"`.
2. No CSS class on any container inside the trust bar section (except `container`).
3. The entire layout is driven by inline `style=""` attributes with no corresponding CSS class rules in `main.css`.
4. There is **no responsive fallback** for the inline `display:grid; grid-template-columns:repeat(4,1fr)` — no media query in `main.css` can override it because there is no CSS class on that div.

---

## 3. CSS rules affecting the icons

### 3a. Trust bar SVGs (lines 369, 379, 389, 399 — the 4 reported icons)

| Selector | File | Line | What it does | Status |
|----------|------|------|--------------|--------|
| `img, video, svg { display: block; max-width: 100%; }` | `main.css` | 118 | Sets `display: block` on all SVG elements; caps width at 100% of parent | **ACTIVE** |
| SVG inline `style="width:20px;height:20px;"` | `product.html` | 369, 379, 389, 399 | Sets explicit 20×20px dimensions | **ACTIVE (inline — highest specificity)** |
| `.container` rules | `main.css` | 155–162 | `width:100%; max-width:var(--max-width); padding:0 var(--space-6)` | Active on wrapper — no effect on SVG size |

**No other CSS rules exist in `main.css` that target these SVGs.** The trust bar containers have no CSS class — class-based rules for `.trust-badge svg`, `.trust-strip`, `.trust-grid`, etc. do not apply here.

---

### 3b. Step-4 trust badge SVGs (lines 333, 337, 341 — truck, shield, return only; NO question mark)

| Selector | File | Line | What it does | Status |
|----------|------|------|--------------|--------|
| `img, video, svg { display: block; max-width: 100%; }` | `main.css` | 118 | Global block + max-width reset | **ACTIVE** |
| `.trust-badge { display:flex; align-items:center; gap:var(--space-2); font-size:11px; ... }` | `main.css` | 4446 | Product-page intended row layout — icon inline with text | **ACTIVE** |
| `.trust-badges .trust-badge svg { width:14px; height:14px; color:var(--color-grey-300); flex-shrink:0; }` | `main.css` | 4457 | Sizes step-4 badge SVGs to 14px (scoped after previous fix) | **ACTIVE** |
| ~~`.trust-badge svg { width:14px; height:14px; }`~~ | `main.css` | 4457 | **Original unscoped rule — replaced by fix** | Replaced by above |
| ~~`.trust-badge { display:flex; flex-direction:column; align-items:center; gap:var(--space-2); }`~~ | `main.css` | 5312 | **Original unscoped shop rule — overrode flex-direction globally** | Replaced by below |
| `.trust-strip .trust-badge { display:flex; flex-direction:column; align-items:center; gap:var(--space-2); }` | `main.css` | 5312 | Shop page column layout — now scoped to `.trust-strip` only | **ACTIVE on shop.html only** |
| `@media (max-width: 700px) — .trust-badges { flex-direction:column; align-items:center; }` | `main.css` | 4654 | On mobile, the `.trust-badges` container stacks vertically (the wrapper, not individual badges) | **ACTIVE on mobile** |

---

### 3c. Global SVG reset — detailed analysis

```css
/* main.css line 118 */
img, video, svg {
  display: block;
  max-width: 100%;
}
```

- **`display: block`**: Changes SVG from inline-replaced to block-level. Inside a flex container, the SVG becomes a block-level flex item. The cross-axis sizing defaults to `align-self: auto` which inherits `align-items` from the parent. The parent of the trust bar SVGs has `align-items: center` → SVG is centered vertically, not stretched.
- **`max-width: 100%`**: Caps the SVG's width at 100% of its containing block. For the trust bar, containing block is the 44px icon box → max-width resolves to 44px. Since the inline `width: 20px` is already less than 44px, this cap has no effect.

**Neither property in the global reset can make the SVGs larger than their inline `style="width:20px;height:20px;"` specifies.** The only way an inline style can be overridden is by a CSS rule with `!important`. The `!important` rules in `main.css` are:

```css
transform: none !important;          /* line 667 — buttons */
.hidden { display: none !important; } /* line 4831 */
.visible { display: block !important; } /* line 4832 */
```

None of these affect SVG `width` or `height`.

---

## 4. Actual root cause

**There are two distinct problems. Only one was addressed by the previous fix.**

### Problem A — Trust bar (primary bug: includes all 4 icons)

The trust bar section (lines 363–409) was built entirely with inline styles and has no CSS class on any container. This creates a structural problem: **there is no CSS class hook, so no responsive media query in `main.css` can adjust the layout.**

The inline grid `style="display:grid; grid-template-columns:repeat(4,1fr);"` does not collapse or stack on mobile. On narrow viewports (≤480px), each of the four grid columns becomes approximately 60–70px wide. Inside each column, the flex row contains:
- A `width:44px` icon box (`flex-shrink:0` — prevents shrinking)
- A 16px gap
- A text div

Total minimum row width: `44px + 16px + text minimum ≈ 80–100px`, which exceeds the available column width. The `flex-shrink:0` on the icon box means the icon box cannot compress, so on narrow viewports the flex row **overflows its grid column**. The SVG inside the icon box is not directly "huge" in pixel terms — it is 20px as the inline style intends — but the **icon box itself renders at 44px** (prevented from shrinking), which becomes disproportionately large relative to the column width and the collapsed/overflowing surrounding content.

On desktop this section renders acceptably because there is sufficient width for 4 columns. The bug manifests on mobile or narrow viewports where the lack of responsive handling causes the icon boxes to overflow their grid cells and the entire trust bar section to appear visually broken.

Additionally, the SVGs in the trust bar have NO `width`/`height` HTML attributes — only CSS inline size. In certain older browser rendering paths or WebKit quirks, inline SVGs with only CSS-set dimensions (not HTML presentation attributes) and `display: block` can revert to their intrinsic viewBox-computed size (24px for `viewBox="0 0 24 24"`). This is a minor secondary risk, not the primary cause.

### Problem B — Step-4 trust badges (secondary bug: 3 icons only, no question mark)

A CSS rule written for `shop.html`'s trust strip used the unscoped selector `.trust-badge { flex-direction: column }` (line 5312, original). This rule came after the product-page rule (line 4446) in source order and overrode `flex-direction` for all `.trust-badge` elements globally — including those on `product.html`. This caused the step-4 trust badges to render as a vertical column layout (icon above text) instead of the intended horizontal row (icon to the left of text), making the icon appear visually isolated and disproportionate. This was the "broken layout" component of the bug.

This was addressed by the previous fix (scope change to `.trust-strip .trust-badge`).

---

## 5. Why the previous fix failed

The previous fix made two CSS selector scope changes:

```diff
- .trust-badge svg { width: 14px; height: 14px; … }
+ .trust-badges .trust-badge svg { width: 14px; height: 14px; … }

- .trust-badge { display: flex; flex-direction: column; … }
+ .trust-strip .trust-badge { display: flex; flex-direction: column; … }
```

**These changes target only `.trust-badge` elements** — elements that carry the CSS class `trust-badge`.

The four reported icons (truck, shield, return arrow, **question mark**) are in the **trust bar section** at lines 363–409. That section contains NO elements with the class `trust-badge`. The trust bar uses only inline styles and the `.container` class. The `.trust-badge`/`.trust-badges`/`.trust-strip` selectors do not match any element in the trust bar.

Therefore: **the previous fix had zero effect on the trust bar icons.** It correctly fixed Problem B (step-4 column layout) but left Problem A (trust bar responsive layout / inline-only structure) entirely untouched.

The question mark icon is only present in the trust bar (line 399), not in the step-4 badges. If the user observes the question mark icon as part of the broken icon set, that confirms the trust bar is the active rendering location of the reported bug.

---

## 6. Minimal safe fix strategy

**Do not implement — description only.**

The fix needs to address the trust bar's lack of CSS class context and responsive handling.

**Step 1 — Add a class to the trust bar `<section>` in `product.html`:**
Replace the classless `<section style="...">` wrapper with `<section class="product-trust-bar" style="...">`. This creates a CSS hook without removing the inline styles.

**Step 2 — Add a class to the 4-column grid div in `product.html`:**
Replace `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-4);">` with `<div class="product-trust-bar__grid" style="display:grid;...">`. This creates a hook for responsive override.

**Step 3 — Add CSS rules to `main.css`:**
```css
/* product.html trust bar — responsive override */
@media (max-width: 700px) {
  .product-trust-bar__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .product-trust-bar__grid {
    grid-template-columns: 1fr;
  }
}
```

**Step 4 — Add explicit `width`/`height` HTML attributes to the trust bar SVGs** (belt-and-suspenders, eliminates the inline-SVG presentation attribute gap):
```html
<!-- change from: -->
<svg viewBox="0 0 24 24" … style="width:20px;height:20px;">
<!-- to: -->
<svg width="20" height="20" viewBox="0 0 24 24" … style="width:20px;height:20px;">
```

This makes the SVG size explicit at both the HTML presentation layer and the CSS layer simultaneously, eliminating any browser ambiguity.

The `flex-shrink:0` on the 44px icon box is correct and should remain. The icon box size (44px) and SVG size (20px) are appropriate for the design — the only issue is the lack of responsive grid handling and the absence of explicit `width`/`height` HTML attributes.

---

## 7. Files that would likely need changes

| File | Change type |
|------|-------------|
| `product.html` | Add class to trust bar `<section>` and inner grid `<div>`; add `width="20" height="20"` HTML attributes to 4 trust bar SVGs (lines 369, 379, 389, 399) |
| `assets/css/main.css` | Add `.product-trust-bar__grid` responsive media query rules |

No changes needed to `assets/js/product.js` or `assets/js/main.js`.

---

## 8. Risk assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Adding `class="product-trust-bar"` to the `<section>` could conflict with an existing rule in `main.css` | Very low — no `.product-trust-bar` selector currently exists in `main.css` | Grep for the class name before adding |
| The responsive grid collapse (4→2→1 columns) changes layout on mobile | Expected and desired | Only affects mobile breakpoints; desktop unchanged |
| Adding `width="20" height="20"` HTML attrs to SVGs could conflict with inline `style="width:20px;height:20px;"` | No conflict — CSS inline style overrides HTML presentation attrs; both specify the same value | None needed |
| Fixing trust bar responsive layout could visually shift the section on shop-equivalent pages if the class is reused | N/A — the class `product-trust-bar` is product-page-specific | Do not reuse the class on shop.html, which already has `.trust-strip` |
| The step-4 `.trust-badges` mobile rule (line 4654: `flex-direction: column`) could interact with the `.trust-badge` row layout | Already present in CSS — works correctly with the scoped fix because the column is applied to the outer `.trust-badges` container (the list), not individual `.trust-badge` items | No change needed |

---

## Appendix: State of CSS after previous fix

The diff currently on this branch:

```diff
- .trust-badge svg { width: 14px; height: 14px; … }
+ .trust-badges .trust-badge svg { width: 14px; height: 14px; … }

- .trust-badge { display: flex; flex-direction: column; align-items: center; … }
+ .trust-strip .trust-badge { display: flex; flex-direction: column; align-items: center; … }
+ .trust-strip .trust-badge svg { width: 28px; height: 28px; flex-shrink: 0; }
```

**What this fixed:** Step-4 trust badge layout (Problem B) — badges now render in correct row orientation with 14px icons on `product.html`. Shop trust strip now has correctly scoped column layout and 28px icon sizes restored.

**What this did NOT fix:** Trust bar section (Problem A) — the 4-column inline grid with no responsive fallback; the classless SVGs lacking explicit `width`/`height` HTML attributes. The question mark icon lives exclusively in this section and was unaffected by the previous fix.
