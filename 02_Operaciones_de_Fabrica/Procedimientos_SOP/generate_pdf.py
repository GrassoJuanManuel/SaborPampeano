import asyncio
from playwright.async_api import async_playwright
import markdown
import os
import sys

# Accept input file as argument, default to Reporte_Gerencia.md
input_file = sys.argv[1] if len(sys.argv) > 1 else 'Reporte_Gerencia.md'
output_file = os.path.splitext(input_file)[0] + '.pdf'

with open(input_file, 'r', encoding='utf-8') as f:
    text = f.read()

if '</style>' in text:
    text = text.split('</style>\n\n', 1)[-1]

html = markdown.markdown(text, extensions=['tables'])

html_full = f"""
<html>
<head>
<meta charset="utf-8">
<style>
body {{ font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }}
h1 {{ color: #2c3e50; border-bottom: 2px solid #34495e; padding-bottom: 10px; font-size: 24px; }}
h2 {{ color: #2980b9; margin-top: 30px; font-size: 18px; border-bottom: 1px solid #ecf0f1; padding-bottom: 5px; }}
h3 {{ color: #34495e; font-size: 16px; margin-top: 20px; }}
ul {{ margin-top: 5px; margin-bottom: 15px; padding-left: 20px; }}
li {{ margin-bottom: 8px; }}
table {{ border-collapse: collapse; width: 100%; margin: 15px 0; font-size: 13px; }}
th {{ background-color: #2980b9; color: white; padding: 8px 10px; text-align: left; }}
td {{ padding: 7px 10px; border: 1px solid #ddd; }}
tr:nth-child(even) {{ background-color: #f9f9f9; }}
blockquote {{ border-left: 4px solid #e67e22; margin: 10px 0; padding: 8px 15px; background: #fef9f0; color: #555; }}
img {{ max-width: 100%; height: auto; max-height: 400px; display: block; margin: 20px auto; border: 1px solid #ddd; padding: 5px; }}
</style>
</head>
<body>{html}</body>
</html>
"""

html_path = os.path.abspath('temp_pdf.html').replace('\\', '/')

with open('temp_pdf.html', 'w', encoding='utf-8') as f:
    f.write(html_full)

async def generate_pdf():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(f"file:///{html_path}")
        await page.wait_for_timeout(2000)
        await page.pdf(path=output_file, format="A4", print_background=True, margin={"top": "2cm", "bottom": "2cm", "left": "2cm", "right": "2cm"})
        await browser.close()

asyncio.run(generate_pdf())

if os.path.exists('temp_pdf.html'):
    os.remove('temp_pdf.html')

print(f"PDF generado: {output_file}")
