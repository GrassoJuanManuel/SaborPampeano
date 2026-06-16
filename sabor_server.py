import os
import json
import re
from http.server import SimpleHTTPRequestHandler, HTTPServer

WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
DASHBOARD_HTML = os.path.join(WORKSPACE_DIR, '00_Dashboard_Proyectos', 'Planificación y Proyectos.html')

class SaborPampeanoHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        # Enable CORS so file:/// can talk to this server
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/update-priority':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            proj_key = data.get('projKey')
            new_pri = data.get('newPri')
            
            if not proj_key or new_pri is None:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'{"error": "Missing parameters"}')
                return

            try:
                with open(DASHBOARD_HTML, 'r', encoding='utf-8') as f:
                    content = f.read()

                # 1. Modify priority in Javascript Dictionary
                pattern = f'({proj_key}:\\{{.*?(?:badge:.*?|ref:.*?))priority:\\s*\\d+(,\\s*tabs:)'
                new_content = re.sub(pattern, f'\\g<1>priority:{new_pri}\\g<2>', content)

                # 2. Modify priority in HTML Sidebar
                def replace_html(match):
                    pre = match.group(1)
                    name_and_click = match.group(2)
                    mid = match.group(3)
                    
                    stars = ""
                    if new_pri >= 6:
                        stars = '<i class="fas fa-star" style="color:#ef4444; animation: pulse 2s infinite;"></i>'
                    else:
                        stars = '★' * new_pri + '☆' * max(0, 5 - new_pri)
                        
                    post = match.group(5)
                    return f'{pre}{new_pri}{name_and_click}{mid}{stars}{post}'

                html_pattern = rf'(<div class="pcard" data-priority=")\d+(" data-name="[^"]+" onclick="detail\(\'{proj_key}\', this\)">\s*<div class="p-title">.*?</div>\s*<div class="p-stars">)(.*?)(</div>\s*</div>)'
                new_content = re.sub(html_pattern, replace_html, new_content, flags=re.DOTALL)

                if new_content == content:
                    self.send_response(200)
                    self.end_headers()
                    self.wfile.write(b'{"status": "no changes"}')
                    return

                with open(DASHBOARD_HTML, 'w', encoding='utf-8') as f:
                    f.write(new_content)

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"status": "ok"}')
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
        else:
            self.send_error(404, "Endpoint not found")

if __name__ == '__main__':
    os.chdir(WORKSPACE_DIR)
    port = 8080
    server_address = ('', port)
    httpd = HTTPServer(server_address, SaborPampeanoHandler)
    print(f'Sabor Pampeano Server running on http://localhost:{port}')
    httpd.serve_forever()
