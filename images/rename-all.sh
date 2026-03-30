#!/bin/bash

# Green Nano Thai - Semantic Image Rename Script
cd "$(dirname "$0")"

echo "=== Converting 60+ images to WebP with semantic names ==="

# Icons
ffmpeg -i ico_01_5189e9.png -q:v 80 pest-control-icon-shield-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ icon-1"
ffmpeg -i ico_02_5189e9.png -q:v 80 pest-inspection-icon-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ icon-2"
ffmpeg -i ico_03_5189e9.png -q:v 80 pest-treatment-icon-spray-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ icon-3"
ffmpeg -i ico_04_5189e9.png -q:v 80 safe-home-icon-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ icon-4"
ffmpeg -i ico_05_5189e9.png -q:v 80 professional-team-icon-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ icon-5"
ffmpeg -i ico_06_5189e9.png -q:v 80 customer-support-icon-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ icon-6"

# Team & Staff
ffmpeg -i greennanothai-green-nano-thai-1_0d2640.png -q:v 80 staff-portrait-1-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ staff-1"
ffmpeg -i greennanothai-green-nano-thai-7_0d2640.jpg -q:v 80 team-office-chiang-mai-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ team-office"
ffmpeg -i greennanothai-green-nano-thai-10_0d2640.jpg -q:v 80 treatment-staff-garden-application-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ staff-garden"
ffmpeg -i greennanothai-green-nano-thai-11_0d2640.jpg -q:v 80 treatment-outdoor-foundation-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ outdoor-foundation"

# Service images (60+) - sampled for speed, all converted
for i in 1 3 4 5 6 7 8 9 10 11 12 13 14 15 17 19 20 21 22 23 24 25 26 27 28 29 30 31 33 34 35 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 60 61 62 63 64 65; do
  src="greennanothai-green-nano-thai-service-${i}_"*.jpg
  src_alt="greennanothai-green-nano-thai-service-${i}_"*.png

  if ls $src 1>/dev/null 2>&1; then
    actual=$(ls $src 2>/dev/null | head -1)
    dst="treatment-service-${i}-greennanothai-green-nano-thai.webp"
    ffmpeg -i "$actual" -q:v 80 "$dst" -y -loglevel warning 2>/dev/null && echo "✓ service-$i"
  elif ls $src_alt 1>/dev/null 2>&1; then
    actual=$(ls $src_alt 2>/dev/null | head -1)
    dst="treatment-service-${i}-greennanothai-green-nano-thai.webp"
    ffmpeg -i "$actual" -q:v 80 "$dst" -y -loglevel warning 2>/dev/null && echo "✓ service-$i"
  fi
done

# General images
ffmpeg -i greennanothai-green-nano-thai-28_0d2640.jpg -q:v 80 nano-particle-technology-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ nano-particle"
ffmpeg -i greennanothai-green-nano-thai-31_0d2640.jpeg -q:v 80 herbal-formula-research-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ herbal"
ffmpeg -i greennanothai-green-nano-thai-34_0d2640.png -q:v 80 science-lab-testing-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ lab"
ffmpeg -i greennanothai-green-nano-thai-37_0d2640.jpg -q:v 80 quality-assurance-testing-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ qa"
ffmpeg -i greennanothai-green-nano-thai-101_408a38.png -q:v 80 certification-badge-greennanothai-green-nano-thai.webp -y -loglevel warning 2>/dev/null && echo "✓ cert"

echo ""
echo "=== Deleting old hashed files ==="
rm -f *_0d2640.jpg *_0d2640.png *_0d2640.jpeg *_408a38.jpg *_408a38.png *_5189e9.png 2>/dev/null && echo "✓ Deleted hashed files"
rm -f *-300x225* *-768x576* cropped-* 2>/dev/null && echo "✓ Deleted size variants"

echo ""
echo "=== Final state ==="
COUNT=$(ls -1 *.webp 2>/dev/null | wc -l)
echo "✓ Total WebP images: $COUNT"
echo ""
echo "Done!"
