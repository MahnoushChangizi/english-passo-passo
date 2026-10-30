"""Build the installable (PWA) version of English Passo Passo.

Usage: python3 build.py <app.html or docs/index.html>
Writes docs/ (served by GitHub Pages): index.html, manifest, service worker, icons.
"""
import sys, os, time, hashlib

src = sys.argv[1]
here = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(here, "docs")
os.makedirs(out, exist_ok=True)

body = open(src, encoding="utf-8").read()
# Accept a previously built docs/index.html as input: keep only the app between the markers.
if "<!-- APP START -->" in body:
    body = body.split("<!-- APP START -->", 1)[1].split("<!-- APP END -->", 1)[0].strip("\n")
version = time.strftime("%Y%m%d-%H%M") + "-" + hashlib.sha1(body.encode()).hexdigest()[:6]

head = f"""<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#e4512f">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<meta name="app-version" content="{version}">
<style>:root{{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}body{{margin:0;font:14px system-ui,sans-serif}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
</head>
<body>
<!-- APP START -->
"""
tail = """
<!-- APP END -->
<script>
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(reg => {
    reg.update();
    reg.addEventListener("updatefound", () => {
      const w = reg.installing;
      w && w.addEventListener("statechange", () => {
        if (w.state === "installed" && navigator.serviceWorker.controller) location.reload();
      });
    });
  }).catch(() => {});
}
</script>
</body>
</html>
"""
open(os.path.join(out, "index.html"), "w", encoding="utf-8").write(head + body + tail)

open(os.path.join(out, "manifest.webmanifest"), "w", encoding="utf-8").write("""{
  "name": "English Passo Passo",
  "short_name": "English",
  "description": "Impara l'inglese, un passo alla volta.",
  "lang": "it",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#f5f6ee",
  "theme_color": "#e4512f",
  "icons": [
    {"src": "icon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any"},
    {"src": "icon-maskable.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "maskable"}
  ]
}
""")

# Network first: when online the child always gets the newest version; offline the cached copy opens.
open(os.path.join(out, "sw.js"), "w", encoding="utf-8").write(f"""const CACHE = "passo-{version}";
const CORE = ["./", "index.html", "manifest.webmanifest", "icon.svg"];
self.addEventListener("install", e => {{
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
}});
self.addEventListener("activate", e => {{
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("passo-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
}});
self.addEventListener("fetch", e => {{
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, {{cache: "no-cache"}}).then(r => {{
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }}).catch(() => caches.match(e.request, {{ignoreSearch: true}}).then(m => m || caches.match("index.html")))
  );
}});
""")

open(os.path.join(out, ".nojekyll"), "w").write("")

SVG = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="__R__" fill="#e4512f"/><g transform="translate(256 256) scale(__S__) translate(-256 -256)"><text x="256" y="250" text-anchor="middle" font-family="Arial Black,Arial,Helvetica,sans-serif" font-weight="900" font-size="210" fill="#fff">Ab</text><ellipse cx="113" cy="445" rx="46" ry="26" fill="#f4bb22"/><ellipse cx="256" cy="410" rx="46" ry="26" fill="#f4bb22"/><ellipse cx="399" cy="374" rx="46" ry="26" fill="#f4bb22"/></g></svg>
'''
open(os.path.join(out, 'icon.svg'), 'w').write(SVG.replace('__R__','110').replace('__S__','1'))
open(os.path.join(out, 'icon-maskable.svg'), 'w').write(SVG.replace('__R__','0').replace('__S__','0.8'))
print('built', version)
