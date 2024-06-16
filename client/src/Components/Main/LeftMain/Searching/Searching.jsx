import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './Searching.scss'

const Searching = () => {
    return (
        <>
            <input className='mt-2' type="search" name="" id="" placeholder='Search...' />
            {/* <button>
                <FontAwesomeIcon icon={faEnvelope} />
            </button> */}
        </>
    )
}

export default Searching;