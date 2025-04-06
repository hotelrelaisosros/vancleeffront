import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiCaller from '../utils/ApiCaller';

const SearchDropdown = ({ isSearchOpen, toggleSearchDropdown }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ products: [], categories: [] });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isSearchOpen]);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length <= 3) {
      setSearchResults({ products: [], categories: [] });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('search', query);
      const response = await ApiCaller.Post('/api/v1/products/search/search_bar', formData);
      setSearchResults({
        products: response.data.products || [],
        categories: response.data.sub_categories || []
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults({ products: [], categories: [] });
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    return text.replace(new RegExp(`(${query})`, 'gi'), (match) => `<strong style="color:black;">${match}</strong>`);
  };

  const clearSearchOnClose = () => {
    setSearchQuery('');
    setSearchResults({ products: [], categories: [] });
    toggleSearchDropdown();
  };

  const redirectToMoreResults = () => {
    navigate(`/products/1?q=${searchQuery}&trackingCategory=siteSearch`);
  };

  if (!isSearchOpen) return null;

  const renderList = (items, query, type) => (
    items.length > 0 ? (
      items.map((item, index) => (
        <li key={index}>
          <span
            dangerouslySetInnerHTML={{ __html: highlightMatch(type === 'category' ? item.category.name : item.title, query) }}
          ></span>
        </li>
      ))
    ) : (
      type === 'category' ? (
        ["Necklaces and pendants", "Bracelets", "Rings", "Earrings"].map((item, idx) => <li key={idx}>{item}</li>)
      ) : null
    )
  );

  return (
    <div className="dropdown-container">
      <div className="dropdown-search-wrap">
      <span className="dropdown-search-icon"></span>
        <input
          type="text"
          className="dropdown-search-input"
          placeholder="Search for creations, articles, videos..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className="close-dropdown-icon" onClick={clearSearchOnClose}>&times;</button>
      </div>

      <div className="dropdown-sections">
        <div className="dropdown-section">
          <h4>Categories</h4>
          <ul>{renderList(searchResults.categories, searchQuery, 'category')}</ul>
        </div>

        {/* <div className="dropdown-section">
          <h4>Collections</h4>
          <ul>
            {['Alhambra®', 'Perlée®', 'Frivole®', 'Fauna'].map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div> */}

        <div className="dropdown-section">
          <h4>Creations</h4>
          <div className="creations-grid">
            {searchResults.products.length > 0 ? (
              searchResults.products.map((product, index) => (
                <div className="creation-item" key={index}>
                  <img src={product.images.image} alt={product.name} className="creation-image" />
                  <p dangerouslySetInnerHTML={{ __html: highlightMatch(product.title, searchQuery) }}></p>
                  <p>{product.price} €</p>
                </div>
              ))
            ) : (
              [
                { src: "https://www.vancleefarpels.com/content/dam/rcq/vca/16/26/45/6/1626456.png.transform.vca-w350-2x.png", name: "Vintage Alhambra bracelet 5 patterns", price: "4,950 €" },
                { src: "https://www.vancleefarpels.com/content/dam/rcq/vca/Ur/Bz/Uk/zv/PU/y-/xK/ZI/9X/KP/uQ/UrBzUkzvPUy-xKZI9XKPuQ.png", name: "Vintage Alhambra Earrings", price: "4,450 €" },
                { src: "https://www.vancleefarpels.com/content/dam/rcq/vca/5V/V2/ia/p0/IE/eo/yc/bg/qF/TC/4A/5VV2iap0IEeoycbgqFTC4A.png", name: "Lucky Summer Boat Clip", price: "7,750 €" },
                { src: "https://www.vancleefarpels.com/content/dam/rcq/vca/18/93/80/1/1893801.png.transform.vca-w350-2x.png", name: "Frivole pendant mini model", price: "2,120 €" }
              ].map((item, idx) => (
                <div className="creation-item" key={idx}>
                  <img src={item.src} alt={item.name} className="creation-image" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {searchResults.products.length > 0 && searchResults.categories.length > 0 && (
        <div className="more-results-container">
          <button onClick={redirectToMoreResults} className="more-results-button">More Results</button>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;