#!/usr/bin/env python3
"""Genera los iconos y pantallas de inicio de Mi Wuawua para Android.

Lee icon-source.webp (el icono de la app, 256x256) y escribe los PNG
del lanzador (mipmap-*) y de la pantalla de inicio (drawable-*) dentro
de app/src/main/res/. Se ejecuta en CI antes de compilar el APK, por eso
esos PNG no se guardan en el repo: se regeneran en cada compilación.
"""
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
RES = os.path.join(HERE, 'app', 'src', 'main', 'res')

src = Image.open(os.path.join(HERE, 'icon-source.webp')).convert('RGBA')

dens = {'mdpi': 48, 'hdpi': 72, 'xhdpi': 96, 'xxhdpi': 144, 'xxxhdpi': 192}
fg = {'mdpi': 108, 'hdpi': 162, 'xhdpi': 216, 'xxhdpi': 324, 'xxxhdpi': 432}
for d, s in dens.items():
    base = os.path.join(RES, f'mipmap-{d}')
    os.makedirs(base, exist_ok=True)
    src.resize((s, s), Image.LANCZOS).save(os.path.join(base, 'ic_launcher.png'))
    im = src.resize((s, s), Image.LANCZOS).copy()
    mask = Image.new('L', (s, s), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, s, s), fill=255)
    out = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    out.save(os.path.join(base, 'ic_launcher_round.png'))
    src.resize((fg[d], fg[d]), Image.LANCZOS).save(
        os.path.join(base, 'ic_launcher_foreground.png'))


def splash(path, w, h):
    img = Image.new('RGBA', (w, h), (255, 255, 255, 255))
    side = int(min(w, h) * 0.38)
    ic = src.resize((side, side), Image.LANCZOS)
    img.paste(ic, ((w - side) // 2, (h - side) // 2), ic)
    img.convert('RGB').save(path)


splash(os.path.join(RES, 'drawable', 'splash.png'), 512, 512)
for d, (pw, ph) in {'mdpi': (320, 470), 'hdpi': (480, 640),
                    'xhdpi': (720, 960), 'xxhdpi': (1080, 1440),
                    'xxxhdpi': (1440, 1920)}.items():
    splash(os.path.join(RES, f'drawable-port-{d}', 'splash.png'), pw, ph)
    splash(os.path.join(RES, f'drawable-land-{d}', 'splash.png'), ph, pw)

print('iconos generados')
