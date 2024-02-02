import React, { useEffect, useMemo, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Header from './components/Header'
import Modal from './components/Modal'
import ProductDisplay from './components/ProductDisplay'
import ProductFilter from './components/ProductFilter'
import UserContext from './contexts/UserContext'

function App() {
  const [userProfile, setUserProfile] = useState(null)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({ country: '' })

  const products = useMemo(
    () => [
      {
        id: 1,
        name: 'Hoodie',
        price: 10,
        imageUrl: 'hoodie.png',
        country: 'Indonesia',
      },
      {
        id: 2,
        name: 'T-Shirt',
        price: 15,
        imageUrl: 'tee.png',
        country: 'Singapore',
      },
    ],
    [],
  )

  const availableCountries = useMemo(
    () => products.map(product => product.country),
    [products],
  )

  const filteredProducts = useMemo(() => {
    if (filters.country) {
      return products.filter(
        ({ country }) =>
          country.toLowerCase() === filters.country.toLowerCase(),
      )
    }
    return products
  }, [filters.country])

  const addToCart = product => {
    setCartItems(prevItems => {
      let updatedItems = []
      const itemExists = prevItems.find(item => item.id === product.id)
      if (itemExists) {
        updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }]
      }
      sessionStorage.setItem('cart', JSON.stringify(updatedItems))
      return updatedItems
    })
    setShowModal(true)
  }

  const clearCart = () => {
    setCartItems([])
  }

  const closeModal = () => setShowModal(false)

  useEffect(() => {
    if (
      userProfile?.country &&
      !!availableCountries.filter(
        country =>
          country.toLowerCase() === userProfile?.country?.toLowerCase(),
      ).length
    ) {
      setFilters({ ...filters, country: userProfile.country })
    }
  }, [userProfile, availableCountries])

  return (
    <UserContext.Provider
      value={{ profile: userProfile, setProfile: setUserProfile }}
    >
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProductFilter
                    selectedCountry={filters.country}
                    onChangeCountry={country =>
                      setFilters({ ...filters, country })
                    }
                    availableCountries={availableCountries}
                  />
                  <ProductDisplay
                    addToCart={addToCart}
                    products={filteredProducts}
                  />
                  {showModal && <Modal closeModal={closeModal} />}
                </>
              }
            />
            <Route path="/cart" element={<Cart cartItems={cartItems} />} />
            <Route
              path="/checkout"
              element={<Checkout clearCart={clearCart} />}
            />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  )
}

export default App
