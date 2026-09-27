import os
import urllib.request
from fontTools.ttLib import TTFont
from fontTools.varLib.mutator import instantiateVariableFont

def main():
    print("=== Instantiating static TTF fonts for Satori OG ===")
    
    fonts_dir = os.path.abspath("assets/fonts")
    os.makedirs(fonts_dir, exist_ok=True)
    
    # 1. Download OFL license
    ofl_path = os.path.join(fonts_dir, "OFL.txt")
    if not os.path.exists(ofl_path):
        print("Downloading OFL.txt...")
        urllib.request.urlretrieve(
            "https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/OFL.txt",
            ofl_path
        )
        print(f"Saved {ofl_path}")

    # 2. Download variable font
    temp_var_font = os.path.join(fonts_dir, "temp_archivo_var.ttf")
    print("Downloading Archivo[wdth,wght].ttf...")
    urllib.request.urlretrieve(
        "https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/Archivo%5Bwdth%2Cwght%5D.ttf",
        temp_var_font
    )
    print(f"Downloaded variable font ({os.path.getsize(temp_var_font)} bytes)")

    targets = [
        ("archivo-expanded-800.ttf", {"wght": 800, "wdth": 125}),
        ("archivo-600.ttf", {"wght": 600, "wdth": 100}),
        ("archivo-400.ttf", {"wght": 400, "wdth": 100}),
    ]

    for filename, coordinates in targets:
        out_path = os.path.join(fonts_dir, filename)
        print(f"Instantiating {filename} with {coordinates}...")
        
        # Load fresh variable font copy
        var_font = TTFont(temp_var_font)
        static_font = instantiateVariableFont(var_font, coordinates)
        static_font.save(out_path)
        print(f"  -> Saved {out_path} ({os.path.getsize(out_path)} bytes)")

    # Clean up temp variable font
    if os.path.exists(temp_var_font):
        os.remove(temp_var_font)
        print("Cleaned up temporary variable font file.")

    print("=== Font instantiation complete ===")

if __name__ == "__main__":
    main()
