/**
 * Apparel Size Selector Component
 */
export function SizeSelector({
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  selectedSize = null,
  disabledSizes = [],
  onSelect,
}) {
  return (
    <div className="size-selector" role="radiogroup" aria-label="Select apparel size">
      {sizes.map((size) => {
        const isSelected = selectedSize === size;
        const isDisabled = disabledSizes.includes(size);

        return (
          <button
            key={size}
            type="button"
            disabled={isDisabled}
            className={`size-btn ${isSelected ? 'selected' : ''}`}
            aria-checked={isSelected}
            role="radio"
            onClick={() => onSelect?.(size)}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}

export default SizeSelector;

