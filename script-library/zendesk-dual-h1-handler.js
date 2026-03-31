/*!
 * =============================================================================
 * THEDOCGUY — ZENDESK DUAL H1 HANDLER
 * =============================================================================
 * Author:   Ryan Lake (TheDocGuy)
 * Version:  1.0
 * Created:  2026-03-31
 *
 * PURPOSE
 * -------
 * Zendesk Guide can render two <h1> elements on an article page: one from
 * the page template and one from the article body itself. This script detects
 * the duplicate and hides the first h1, leaving the article's own h1 as the
 * visible heading.
 *
 * BEHAVIOR
 * --------
 *   1 h1 found  → do nothing (standard page, no action needed)
 *   2 h1s found → hide the first, ensure the second remains visible
 *   3+ h1s      → do nothing (unexpected state; no side effects)
 *
 * PERFORMANCE APPROACH
 * --------------------
 * Uses a two-pass strategy to prevent a flash of the unwanted h1:
 *
 *   Pass 1 — Immediate (runs during <head> parse):
 *     Adds a scoping class to <html> and injects a temporary <style> that
 *     suppresses the first h1 via display:none before the browser paints.
 *
 *   Pass 2 — On DOMContentLoaded:
 *     Counts all h1s and decides the final state:
 *       - 2 h1s: keeps the first h1 hidden, marks it aria-hidden="true",
 *                then removes the temporary class and style.
 *       - Any other count: removes the temporary class and style, restoring
 *                full default visibility with no lasting side effects.
 *
 * This approach keeps the logic off the critical render path and works
 * consistently across desktop, tablet, and mobile viewports.
 *
 * PLACEMENT OPTIONS (in order of preference)
 * -------------------------------------------
 *   1. Inline in <head> of your Zendesk theme template (e.g. head.hbs).
 *      Wrap in <script> tags. Best for zero-flash suppression.
 *
 *   2. Added to your theme's script.js (loads before </body>).
 *      Suppression still works; there may be a brief render of both h1s
 *      on very slow connections, but is imperceptible in practice.
 *
 * =============================================================================
 */

(function () {
  'use strict';

  var SCOPE_CLASS = 'tdg-h1-check';
  var STYLE_ID    = 'tdg-h1-suppressor';

  // ---------------------------------------------------------------------------
  // PASS 1: Suppress the first h1 immediately, before paint.
  // ---------------------------------------------------------------------------

  // Add a scoping class to <html> so the CSS rule is safely namespaced
  // and won't bleed into other pages or components.
  document.documentElement.classList.add(SCOPE_CLASS);

  // Inject a temporary <style> that hides the first h1 in the document.
  // Uses a CSS selector rather than direct DOM manipulation so this runs
  // synchronously without needing a fully-parsed DOM.
  var earlyStyle       = document.createElement('style');
  earlyStyle.id        = STYLE_ID;
  earlyStyle.textContent =
    '.' + SCOPE_CLASS + ' h1:first-of-type {' +
    '  display: none !important;' +
    '}';
  document.head.appendChild(earlyStyle);

  // ---------------------------------------------------------------------------
  // PASS 2: Verify h1 count on DOMContentLoaded and set the final state.
  // ---------------------------------------------------------------------------

  function resolveH1s() {
    var headings   = document.querySelectorAll('h1');
    var firstH1    = headings[0];
    var styleTag   = document.getElementById(STYLE_ID);

    if (headings.length === 2) {
      // Expected duplicate case: hide the first h1 permanently.
      firstH1.style.display = 'none';
      firstH1.setAttribute('aria-hidden', 'true');

      // The second h1 (headings[1]) needs no change — it is already
      // visible and unaffected by the suppressor style above.
    }

    // Clean up the temporary class and style tag regardless of outcome.
    // If there was only 1 h1, this restores it to full default visibility.
    document.documentElement.classList.remove(SCOPE_CLASS);
    if (styleTag && styleTag.parentNode) {
      styleTag.parentNode.removeChild(styleTag);
    }
  }

  if (document.readyState === 'loading') {
    // Script is in <head> — wait for the DOM to be ready.
    document.addEventListener('DOMContentLoaded', resolveH1s);
  } else {
    // DOM already parsed (script placed at end of <body>).
    resolveH1s();
  }

}());
