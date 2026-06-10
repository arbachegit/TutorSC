#!/usr/bin/env node
// audit-fit.mjs — gate VISUAL headless (bloqueia deploy se falhar) — showcase §6.7
// Mede fillArea, cut e scale para CADA slide × 6 viewports num browser real.
// Gate: fillArea > 0.75 (desktop) / > 0.70 (mobile)
//       cut ≤ 2px
//       scale ≥ 0.70 (desktop) / ≥ 0.50 (mobile)
//
// Requisitos:
//   - playwright-core instalado (`npm i -D playwright-core`)
//   - Google Chrome ou Chromium disponível
//   - Build de produção servido (ex.: `npm run build && PORT=3216 node .next/standalone/server.js`)
//
// Uso:
//   node scripts/audit-fit.mjs [base-url]
//   # default: http://localhost:3216/tutor

import { chromium } from "playwright-core";

const BASE = process.argv[2] || "http://localhost:3216/tutor";

const VIEWPORTS = [
  { width: 1440, height: 800, mobile: false },
  { width: 1280, height: 620, mobile: false },
  { width: 1280, height: 560, mobile: false },
  { width: 390, height: 844, mobile: true },
  { width: 390, height: 740, mobile: true },
  { width: 390, height: 667, mobile: true },
];

async function measure(page, totalSlides) {
  const results = [];

  for (let slide = 0; slide < totalSlides; slide++) {
    if (slide > 0) {
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(700);
    }

    const data = await page.evaluate((idx) => {
      const section = document.querySelector(`[data-index="${idx}"]`);
      if (!section) return null;
      const stage = section.querySelector(".slide-stage");
      const content = section.querySelector(".slide-content");
      if (!stage || !content) return null;

      const cs = getComputedStyle(stage);
      const padT = parseFloat(cs.paddingTop) || 0;
      const padB = parseFloat(cs.paddingBottom) || 0;
      const padL = parseFloat(cs.paddingLeft) || 0;
      const padR = parseFloat(cs.paddingRight) || 0;
      const sRect = stage.getBoundingClientRect();
      const cRect = content.getBoundingClientRect();

      const safeTop = sRect.top + padT;
      const safeBottom = sRect.bottom - padB;
      const safeLeft = sRect.left + padL;
      const safeRight = sRect.right - padR;
      const availH = safeBottom - safeTop;
      const availW = safeRight - safeLeft;

      const cutTop = Math.max(0, safeTop - cRect.top);
      const cutBottom = Math.max(0, cRect.bottom - safeBottom);
      const cutLeft = Math.max(0, safeLeft - cRect.left);
      const cutRight = Math.max(0, cRect.right - safeRight);
      const cut = Math.max(cutTop, cutBottom, cutLeft, cutRight);

      const contentArea = cRect.width * cRect.height;
      const availArea = availW * availH;
      const fillArea = availArea > 0 ? contentArea / availArea : 0;

      const transform = getComputedStyle(content).transform;
      let scale = 1;
      if (transform && transform !== "none") {
        const m = transform.match(/matrix\(([^,]+)/);
        if (m) scale = parseFloat(m[1]);
      }

      return {
        slide: idx + 1,
        cut: Math.round(cut * 100) / 100,
        fillArea: Math.round(fillArea * 1000) / 1000,
        scale: Math.round(scale * 1000) / 1000,
        cutTop: Math.round(cutTop * 100) / 100,
        cutBottom: Math.round(cutBottom * 100) / 100,
        availW: Math.round(availW),
        availH: Math.round(availH),
        contentW: Math.round(cRect.width),
        contentH: Math.round(cRect.height),
      };
    }, slide);

    results.push(data);
  }

  return results;
}

async function run() {
  const { existsSync } = await import("node:fs");
  const chromePath = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ].find((p) => existsSync(p));

  const launchOpts = {
    headless: true,
    ...(chromePath ? { executablePath: chromePath } : {}),
  };

  const browser = await chromium.launch(launchOpts);
  let failures = 0;
  const allResults = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);

    const totalSlides = await page.evaluate(() => {
      return document.querySelectorAll(".slide").length;
    });

    const results = await measure(page, totalSlides);
    await context.close();

    const label = `${vp.width}x${vp.height}`;
    const fillThreshold = vp.mobile ? 0.7 : 0.75;
    const scaleFloor = vp.mobile ? 0.5 : 0.7;

    for (const r of results) {
      if (!r) continue;
      const cutFail = r.cut > 2;
      const fillFail = r.fillArea <= fillThreshold;
      const scaleFail = r.scale < scaleFloor;
      const isFail = cutFail || fillFail || scaleFail;
      if (isFail) failures++;
      allResults.push({
        viewport: label,
        mobile: vp.mobile,
        ...r,
        status: isFail ? "FAIL" : r.fillArea < 0.8 ? "WARN" : "OK",
      });
    }
  }

  console.log("\n=== AUDIT-FIT REPORT ===\n");
  console.log(
    "viewport       | slide | cut(px) | fillArea | scale | availW | availH | cntW   | cntH   | status"
  );
  console.log(
    "---------------|-------|---------|----------|-------|--------|--------|--------|--------|-------"
  );
  for (const r of allResults) {
    const line = [
      r.viewport.padEnd(14),
      String(r.slide).padStart(5),
      String(r.cut).padStart(7),
      r.fillArea.toFixed(3).padStart(8),
      r.scale.toFixed(3).padStart(5),
      String(r.availW).padStart(6),
      String(r.availH).padStart(6),
      String(r.contentW).padStart(6),
      String(r.contentH).padStart(6),
      ` ${r.status}`,
    ].join(" | ");
    console.log(line);
  }

  console.log(
    `\n${failures === 0 ? "PASS" : "FAIL"}: ${failures} failure(s) across ${allResults.length} measurements.`
  );
  console.log("Gates: fillArea > 0.75 (desktop) / > 0.70 (mobile), cut ≤ 2px, scale ≥ 0.70 (desktop) / ≥ 0.50 (mobile)\n");

  await browser.close();
  process.exit(failures > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
