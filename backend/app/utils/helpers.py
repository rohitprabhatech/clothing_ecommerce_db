import math
import re
import unicodedata
from typing import Any


def slugify(value: str) -> str:
    """Convert a string into a URL-friendly slug."""
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^\w\s-]", "", value).strip().lower()
    return re.sub(r"[-\s]+", "-", value)


def calculate_total_pages(total_items: int, page_size: int) -> int:
    """Calculate total pages given total item count and page size."""
    if page_size <= 0:
        return 0
    return math.ceil(total_items / page_size)


def format_currency(amount: float, currency: str = "USD") -> str:
    """Format float amount into currency string."""
    return f"{currency} {amount:,.2f}"

