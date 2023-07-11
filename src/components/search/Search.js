import "./Search.css";
import { motion } from 'framer-motion'

const Search = ({ setSearchActive, searchActive, setSearch, search }) => {

  const handleCancel = () => {
    setSearchActive(false)
    setSearch("")
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const wrapperVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    }
  };

  return (
    <motion.div
      variants={wrapperVariants}
      initial="opacity: 0"
      animate={searchActive ? 'visible' : 'hidden'}
      exit="exit"
      className="search-component">
      {searchActive &&
        <>
          <input
            type="text"
            placeholder="Search transactions"
            className="searchbar"
            onChange={handleSearch}
            value={search}
          />
          <div
            className='cancel-search-btn-expanded'
            onClick={handleCancel}>
            Cancel
          </div>
        </>
      }
    </motion.div>
  )
}

export default Search