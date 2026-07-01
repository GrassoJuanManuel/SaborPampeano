import re
import os

ws = r'G:\Mi unidad\Sabor Pampeano Workspace'
dash_path = os.path.join(ws, r'00_Dashboard_Proyectos\Planificación y Proyectos.html')
master_path = os.path.join(ws, r'05_Plan_Maestro_Fabrica\Plan_Maestro_V3_Integral.html')
resumen_path = os.path.join(ws, r'05_Plan_Maestro_Fabrica\Resumen_Ejecutivo_Plan_Maestro.html')
biblia_path = os.path.join(ws, r'03_Herramientas_Sistemas\Herramientas_IA_y_Scripts\contexto_completo.md')

def strip_html(html_str):
    # quitar bloques script/style primero (evita filtrar la contraseña y el CSS al dump)
    html_str = re.sub(r'<script[^>]*>.*?</script>', '', html_str, flags=re.DOTALL)
    html_str = re.sub(r'<style[^>]*>.*?</style>', '', html_str, flags=re.DOTALL)
    # basic formatting conversion
    text = re.sub(r'<li>', '\n- ', html_str)
    text = re.sub(r'<h1>', '\n# ', text)
    text = re.sub(r'<h2>', '\n## ', text)
    text = re.sub(r'<h3>', '\n### ', text)
    text = re.sub(r'<h4>', '\n#### ', text)
    text = re.sub(r'<tr>', '\n', text)
    text = re.sub(r'<td>', ' | ', text)
    text = re.sub(r'<br>', '\n', text)
    # strip all other tags
    text = re.sub(r'<[^>]+>', '', text)
    # clean up multiple spaces and empty lines
    text = re.sub(r'\n\s*\n', '\n\n', text)
    return text.strip()

with open(master_path, 'r', encoding='utf-8') as f:
    master_html = f.read()
    
with open(resumen_path, 'r', encoding='utf-8') as f:
    resumen_html = f.read()

biblia_content = "# BIBLIA - Sabor Pampeano\n\n"
biblia_content += "## 1. RESUMEN EJECUTIVO\n\n" + strip_html(resumen_html) + "\n\n"
biblia_content += "## 2. PLAN MAESTRO INTEGRAL\n\n" + strip_html(master_html) + "\n\n"

# Only write if different to save IO
old_content = ""
if os.path.exists(biblia_path):
    with open(biblia_path, 'r', encoding='utf-8') as f:
        old_content = f.read()

if old_content != biblia_content:
    with open(biblia_path, 'w', encoding='utf-8') as f:
        f.write(biblia_content)
    print("Biblia construida exitosamente.")
else:
    print("La Biblia ya está actualizada.")
