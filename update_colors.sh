#!/bin/bash

# Update primary color from #1594e3 to #4166b2
# Update gradient color from #0c7bc4 to #2d4a8a

# Find all .tsx files and replace colors
find /src/app/components -name "*.tsx" -type f -exec sed -i 's/#1594e3/#4166b2/g' {} \;
find /src/app/components -name "*.tsx" -type f -exec sed -i 's/#0c7bc4/#2d4a8a/g' {} \;

echo "Color update complete!"
