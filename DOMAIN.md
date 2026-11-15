# Domain & DNS

The domain is written in exactly one place: `SITE.domain` in [`site.config.ts`](site.config.ts).
Canonical URLs, RSS, the sitemap and the generated `CNAME` all derive from it,
and internal links are relative, so nothing else needs editing.

> **Note:** the custom domain on this `kidwise.github.io` repo also applies to every
> GitHub Pages *project* repo on the account (e.g. `/west-lake-dreams/`). Switching
> the domain here moves all of them together. Paths owned by those repos are listed
> in `SITE.reservedPaths`; the build fails if this site tries to generate one.

## Current setup

| | |
|---|---|
| Domain | `www.aitolove.com` (apex `aitolove.com` redirects to `www`) |
| DNS provider | GoDaddy |
| Hosting | GitHub Pages, deployed by `.github/workflows/deploy.yml` |

Check that DNS is correct at any time (read-only):

```sh
npm run set-domain -- --check
```

## Switching to a new domain (e.g. `www.newdomain.com`)

1. **GoDaddy → My Products → the new domain → DNS → Manage DNS.** Add:

   | Type  | Name | Value |
   |-------|------|-------|
   | A     | @    | 185.199.108.153 |
   | A     | @    | 185.199.109.153 |
   | A     | @    | 185.199.110.153 |
   | A     | @    | 185.199.111.153 |
   | CNAME | www  | kidwise.github.io |

   Remove any GoDaddy "Parked" A record or default `www` record that conflicts.
   Optional IPv6: AAAA `@` → `2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153`.

2. **Verify the domain** (prevents takeover): GitHub → your profile Settings →
   Pages → *Add a domain*, then add the TXT record GitHub shows at GoDaddy.

3. **Change one line** in `site.config.ts`:

   ```ts
   domain: "www.newdomain.com",
   ```

4. **Apply it:**

   ```sh
   npm run set-domain   # checks DNS, then updates the GitHub Pages setting via `gh`
   git commit -am "Move site to www.newdomain.com" && git push
   ```

5. When GitHub has issued the certificate (minutes to an hour), turn on
   **Settings → Pages → Enforce HTTPS**.

6. **Keep old links working (optional):** GitHub serves only one domain per site.
   In GoDaddy, open the *old* domain → **Forwarding** → forward
   `aitolove.com` and `www.aitolove.com` to `https://www.newdomain.com`
   (Permanent 301, "forward with path" if offered). Keep the old domain
   registered for a while.

## Why both CNAME and `set-domain`?

With GitHub Actions deployments, GitHub Pages reads the custom domain from the
repository's Pages settings, not from a `CNAME` file. `npm run set-domain` keeps
that setting in sync with `site.config.ts`. The build still writes `dist/CNAME`,
which is harmless and keeps things working if you ever switch to branch-based
deployment.
