/**
 * Official Richa AI Configuration & Navigation Constants
 *
 * Centralizes destination URLs and secure redirection handlers for Richa AI
 * integrations within HomeConnect (Demo requests, Authentication, Portal links).
 */

// Official Richa AI Portal base URL and dedicated Demo destination
export const RICHA_BASE_URL = "https://richasales.com/";
export const RICHA_DEMO_URL = "https://richasales.com/";

// HomeConnect Internal Authentication URLs
export const HOMECONNECT_LOGIN_URL = "/login";
export const HOMECONNECT_SIGNUP_URL = "/signup";

// Richa AI Name & Number Callback Lead Form
export const RICHA_TRY_FORM_URL = "/try-richa-ai";

// External Authentication Portal URLs (fallback / official portal)
export const RICHA_LOGIN_URL = "https://richasales.com/login?tab=login";
export const RICHA_SIGNUP_URL = "https://richasales.com/login?tab=signup";

/**
 * Common secure navigation handler for opening Richa AI in a new browser tab.
 * Ensures the original HomeConnect tab remains open while securing the window context.
 *
 * @param {string} [url=RICHA_DEMO_URL] Target Richa AI destination URL
 * @param {Event} [e] Optional click event
 */
export function openRichaExternal(url = RICHA_DEMO_URL, e) {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
