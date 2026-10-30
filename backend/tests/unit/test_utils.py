from app.utils.helpers import calculate_total_pages, format_currency, slugify


def test_slugify() -> None:
    assert slugify("Men's Summer Cotton T-Shirt") == "mens-summer-cotton-t-shirt"
    assert slugify("Special  Offer & 50% OFF!") == "special-offer-50-off"
    assert slugify("   Casual Denim Jeans   ") == "casual-denim-jeans"


def test_calculate_total_pages() -> None:
    assert calculate_total_pages(100, 20) == 5
    assert calculate_total_pages(101, 20) == 6
    assert calculate_total_pages(0, 20) == 0
    assert calculate_total_pages(15, 0) == 0


def test_format_currency() -> None:
    assert format_currency(29.99, "USD") == "USD 29.99"
    assert format_currency(1250.50, "EUR") == "EUR 1,250.50"

