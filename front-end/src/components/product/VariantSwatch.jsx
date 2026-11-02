/**
 * Color and Pattern Variant Swatch Component
 */
export function VariantSwatch({
  variants = [],
  selectedId = null,
  onSelect,
}) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="variant-swatches" role="radiogroup" aria-label="Product color variants">
      {variants.map((v) => {
        const isSelected = selectedId === v.id;
        return (
          <button
            key={v.id}
            type="button"
            className={`variant-swatch ${isSelected ? 'selected' : ''}`}
            style={{ backgroundColor: v.colorHex || '#ccc' }}
            title={v.name || 'Color option'}
            aria-label={v.name || 'Color option'}
            aria-checked={isSelected}
            role="radio"
            onClick={() => onSelect?.(v)}
          />
        );
      })}
    </div>
  );
}

export default VariantSwatch;

