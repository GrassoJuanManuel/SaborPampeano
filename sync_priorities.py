import re

dash_path = r'G:\Mi unidad\Sabor Pampeano Workspace\00_Dashboard_Proyectos\Planificación y Proyectos.html'
master_path = r'G:\Mi unidad\Sabor Pampeano Workspace\05_Plan_Maestro_Fabrica\Plan_Maestro_V3_Integral.html'

with open(dash_path, 'r', encoding='utf-8') as f:
    d = f.read()

# Extract priorities from dashboard
pri_map = {}
for match in re.finditer(r'([a-z]+):\{.*?priority:\s*(\d+)', d):
    key = match.group(1)
    val = int(match.group(2))
    pri_map[key] = val

# Mapping Dashboard keys to Master Plan P-numbers
# Map both P1 and P2 to roboqbo
key_to_p = {
    'roboqbo': ['P1', 'P2'],
    'aire': ['P3'],
    'desague': ['P4'],
    'harinas': ['P5'],
    'rompedora': ['P6'],
    'argental': ['P7'],
    'empanadas': ['P8'],
    'maqnuevas': ['P9'],
    'maquinas': ['P10'],
    'ampliacion': ['P11'],
    'estandarizacion': ['P12']
}

val_to_badge = {
    1: '<span class="badge b-crit">CRÍTICA</span>',
    2: '<span class="badge b-high">ALTA</span>',
    3: '<span class="badge b-med">MEDIA</span>',
    4: '<span class="badge b-low">BAJA</span>',
    5: '<span class="badge b-low">OPCIONAL</span>',
    6: '<span class="badge b-crit">MÁXIMA</span>'
}

with open(master_path, 'r', encoding='utf-8') as f:
    m = f.read()

lines = m.split('\n')
changed = False

# We look for rows in the Master Plan table: <tr><td>...
for i, line in enumerate(lines):
    if '<tr><td>' in line:
        for key, p_nums in key_to_p.items():
            # Check if any of the p_nums for this key is in the line (either plain or bold)
            if any(f'<td>{p}</td>' in line or f'<td><strong>{p}</strong></td>' in line for p in p_nums):
                if key in pri_map:
                    new_badge = val_to_badge.get(pri_map[key], '<span class="badge b-low">BAJA</span>')
                    # Replace the existing badge in this line
                    new_line = re.sub(r'<span class="badge b-[a-z]+">.*?</span>', new_badge, line)
                    if new_line != line:
                        lines[i] = new_line
                        changed = True

if changed:
    with open(master_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print("Master Plan synchronized with Dashboard priorities.")
else:
    print("No changes needed in Master Plan.")
