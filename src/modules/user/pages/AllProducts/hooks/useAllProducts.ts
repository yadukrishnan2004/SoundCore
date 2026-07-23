import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../../../../context/AppContext';
import api from '../../../../../api/axios';
import { API_ROUTES } from '../../../../../api/routes';

export function useAllProducts() {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist, isAuthenticated } = useContext(AppContext) as any;
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter states
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories] = useState<string[]>(['wireless', 'earbuds', 'studio', 'luxury', 'neckband', 'gaming']);
  const [addingId, setAddingId] = useState<any>(null);

  // Read filter params from URL
  const searchParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';
  const minPriceParam = searchParams.get('min_price') || '';
  const maxPriceParam = searchParams.get('max_price') || '';
  const sortParam = searchParams.get('sort') || 'default';
  const pageParam = parseInt(searchParams.get('page') || '1');

  // Input states for filters
  const [searchVal, setSearchVal] = useState(searchParam);
  const [minPrice, setMinPrice] = useState(minPriceParam);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSort, setSelectedSort] = useState(sortParam);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    setSearchVal(searchParam);
    setSelectedCategory(categoryParam);
    setMinPrice(minPriceParam);
    setMaxPrice(maxPriceParam);
    setSelectedSort(sortParam);
  }, [searchParams, searchParam, categoryParam, minPriceParam, maxPriceParam, sortParam]);

  // Fetch filtered products
  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: pageParam,
        limit: 12,
        search: searchParam,
        category: categoryParam,
        min_price: minPriceParam ? parseFloat(minPriceParam) : 0,
        max_price: maxPriceParam ? parseFloat(maxPriceParam) : 0,
        sort: sortParam !== 'default' ? sortParam : ''
      };

      const res = await api.get(API_ROUTES.USER_FILTER, { params });
      if (res.data && res.data.status === 200) {
        setProducts(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching filtered products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [searchParam, categoryParam, minPriceParam, maxPriceParam, sortParam, pageParam]);

  const applyFilters = () => {
    const newParams: Record<string, string> = {};
    if (searchVal) newParams.search = searchVal;
    if (selectedCategory) newParams.category = selectedCategory;
    if (minPrice) newParams.min_price = minPrice;
    if (maxPrice) newParams.max_price = maxPrice;
    if (selectedSort !== 'default') newParams.sort = selectedSort;
    newParams.page = '1';
    setSearchParams(newParams);
    setShowMobileFilters(false);
  };

  const clearFilters = () => {
    setSearchVal('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategory('');
    setSelectedSort('default');
    setSearchParams({});
    setShowMobileFilters(false);
  };

  const handleAddToCart = async (productId: any) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    try {
      setAddingId(productId);
      await addToCart(productId, 1);
      alert("Added to cart!");
    } catch (err: any) {
      alert(err.message || "Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };

  const handleAddToWishlist = async (productId: any) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    try {
      await addToWishlist(productId);
      alert("Added to wishlist!");
    } catch (err: any) {
      alert(err.message || "Failed to add to wishlist");
    }
  };

  return {
    products,
    loading,
    categories,
    searchVal,
    setSearchVal,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedCategory,
    setSelectedCategory,
    selectedSort,
    setSelectedSort,
    showMobileFilters,
    setShowMobileFilters,
    wishlist,
    addingId,
    searchParams,
    setSearchParams,
    applyFilters,
    clearFilters,
    handleAddToCart,
    handleAddToWishlist
  };
}
