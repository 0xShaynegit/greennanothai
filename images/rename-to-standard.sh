#!/bin/bash

# Mapping: existing filename -> standard name
# Using selective service images + general images

declare -A mapping=(
    ["greennanothai-green-nano-thai-28_0d2640.jpg"]="family-safe-pest-control-living-room-greennanothai-green-nano-thai.webp"
    ["greennanothai-green-nano-thai-service-28_408a38.jpg"]="termite-treatment-wood-house-garden-greennanothai-green-nano-thai.webp"
    ["greennanothai-green-nano-thai-service-1_0d2640.jpg"]="chiang-mai-pest-control-team-greennanothai-green-nano-thai.webp"
    ["greennanothai-green-nano-thai-service-20_408a38.jpg"]="herbal-nano-pest-technology-efficiency-greennanothai-green-nano-thai.webp"
    ["greennanothai-green-nano-thai-service-12_0d2640.jpg"]="free-pest-inspection-chiang-mai-service-greennanothai-green-nano-thai.webp"
)

# Convert and rename each file
for src in "${!mapping[@]}"; do
    dst="${mapping[$src]}"
    if [ -f "$src" ]; then
        echo "Converting and renaming: $src -> $dst"
        convert "$src" -quality 85 "$dst"
        echo "  ✓ Done"
    else
        echo "  ✗ File not found: $src"
    fi
done

echo ""
echo "Verification:"
ls -lh family-safe-pest-control* termite-treatment* chiang-mai-pest* herbal-nano-pest* free-pest-inspection* 2>/dev/null || echo "Some files missing"
