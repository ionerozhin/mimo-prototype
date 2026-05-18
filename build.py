import os

base = os.path.dirname(os.path.abspath(__file__))

with open('/tmp/master-min.js') as f:
    compiled = f.read()

# Strip any stray export default (shouldn't exist in new pages, but safety net)
compiled = compiled.replace('export default function BankReconciliation(', 'function BankReconciliation(', 1)
compiled = compiled.replace('export default function ', 'function ', 1)

with open(os.path.join(base, 'node_modules/react/umd/react.production.min.js')) as f:
    react_js = f.read()
with open(os.path.join(base, 'node_modules/react-dom/umd/react-dom.production.min.js')) as f:
    reactdom_js = f.read()

# Escape literal </script> inside JS sources so the HTML parser doesn't break
react_js = react_js.replace('</script>', '<\\/script>')
reactdom_js = reactdom_js.replace('</script>', '<\\/script>')
compiled = compiled.replace('</script>', '<\\/script>')

# Load favicon if present
favicon_tag = ''
favicon_path = os.path.join(base, 'favicon.svg')
if os.path.exists(favicon_path):
    with open(favicon_path) as f:
        import base64 as b64
        svg_data = f.read()
        encoded = b64.b64encode(svg_data.encode()).decode()
        favicon_tag = '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,{}">'.format(encoded)

# Load avatar SVG if present
avatar_script = ''
avatar_path = os.path.join(base, 'Avatar.svg')
if os.path.exists(avatar_path):
    with open(avatar_path) as f:
        avatar_svg = f.read().replace('`', '\\`').replace('${', '\\${')
        avatar_script = 'const AVATAR_SVG = `{}`;'.format(avatar_svg)

parts = []
parts.append("""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Mimo Prototype</title>
""" + favicon_tag + """
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
  button, input, select, textarea { font-family: inherit; }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
  @keyframes textShimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes modalBackdropIn { from{opacity:0} to{opacity:1} }
  @keyframes modalPanelIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
</style>
</head>
<body>
<div id="root"></div>
<script>
""")
parts.append(react_js)
parts.append("""
</script>
<script>
""")
parts.append(reactdom_js)
parts.append("""
</script>
<script>
const { useState, useEffect, useRef, useCallback, useMemo, useReducer, Fragment } = React;
window.onerror = function(msg, src, line, col, err) {
  var box = document.getElementById('error-box');
  if (!box) { box = document.createElement('div'); box.id = 'error-box'; box.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#fee;color:#900;font:12px/1.4 monospace;padding:8px 12px;z-index:99999;max-height:30vh;overflow:auto;border-top:2px solid #c00;'; document.body.appendChild(box); }
  box.innerHTML += '<div><b>Error:</b> ' + msg + ' <b>Line:</b> ' + line + ', <b>Col:</b> ' + col + '</div>';
};
""")
if avatar_script:
    parts.append(avatar_script + '\n')
parts.append(compiled)
# Note: App shell calls ReactDOM.createRoot itself — no extra render call needed
parts.append("""
</script>
</body>
</html>""")

html = "".join(parts)
with open(os.path.join(base, 'index.html'), 'w') as f:
    f.write(html)
print("Done. {} lines. {}KB".format(len(html.splitlines()), len(html) // 1024))
