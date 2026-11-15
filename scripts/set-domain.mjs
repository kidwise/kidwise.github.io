#!/usr/bin/env node
/**
 * Sync the GitHub Pages custom domain with site.config.ts and check DNS.
 *
 *   npm run set-domain            # check DNS, then update GitHub Pages
 *   npm run set-domain -- --check # only check DNS, change nothing
 *
 * Requires the GitHub CLI (`gh`) logged in as the repo owner.
 * Node >= 22.18 (loads the .ts config natively).
 */
import { execFileSync } from "node:child_process";
import dns from "node:dns/promises";
import { SITE } from "../site.config.ts";

const GITHUB_A = ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"];
const owner = SITE.repo.split("/")[0];
const pagesHost = `${owner}.github.io`;
const domain = SITE.domain;
const apex = domain.replace(/^www\./, "");
const checkOnly = process.argv.includes("--check");

async function checkDns() {
  let ok = true;
  const line = (good, msg) => { console.log(`${good ? "✓" : "✗"} ${msg}`); if (!good) ok = false; };

  try {
    const a = await dns.resolve4(apex);
    line(GITHUB_A.every((ip) => a.includes(ip)), `${apex} A → ${a.join(", ")}`);
  } catch (e) { line(false, `${apex} A → ${e.code}`); }

  if (domain !== apex) {
    try {
      const c = await dns.resolveCname(domain);
      line(c.some((h) => h.replace(/\.$/, "") === pagesHost), `${domain} CNAME → ${c.join(", ")}`);
    } catch (e) { line(false, `${domain} CNAME → ${e.code}`); }
  }

  if (!ok) {
    console.log(`\nExpected DNS records (set these at GoDaddy, see DOMAIN.md):`);
    console.log(`  Type A      Name @     Value ${GITHUB_A.join(" / ")}`);
    if (domain !== apex) console.log(`  Type CNAME  Name www   Value ${pagesHost}`);
  }
  return ok;
}

const dnsOk = await checkDns();
if (checkOnly) process.exit(dnsOk ? 0 : 1);

if (!dnsOk) console.log("\nDNS is not fully pointed yet; setting the domain anyway (GitHub will retry the certificate).");

console.log(`\nSetting GitHub Pages custom domain for ${SITE.repo} → ${domain}`);
execFileSync("gh", ["api", "-X", "PUT", `repos/${SITE.repo}/pages`, "-f", `cname=${domain}`], { stdio: "inherit" });
console.log("Done. Once the certificate is issued, enable “Enforce HTTPS” in Settings → Pages.");
